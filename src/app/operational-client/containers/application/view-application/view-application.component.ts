import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppInterface, AppBuildInterface, AppVersionInterface } from '@app/operational-client/models/application.model';
import {
    getAllApplications,
    getApplicationsEntities,
    getApplicationsState,
    getSelectedConfiguration,
} from '@app/operational-client/store/reducers';
import { ApplicationActions, LayoutActions, ConfigurationActions } from '../../../store/actions';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteApplicationDialogComponent } from '../../../components/delete-application-dialog/delete-application-dialog.component';
import * as fromApp from '@app/store/app.reducer';
import * as fromApps from '../../../store/reducers/applications.reducer';
import { ConfigurationRequestParams } from '@app/operational-client/models/configuration.model';
import { ConfigurationService } from '@app/operational-client/services/configuration.service';
import { FileService } from '@app/core/services/file.service';

@Component({
    selector: 'app-view-application',
    templateUrl: './view-application.component.html',
    styleUrls: ['./view-application.component.scss']
})
export class ViewApplicationComponent implements OnInit, OnDestroy {
    @Output() buttonClick = new EventEmitter<any>();
    @Output() upload = new EventEmitter<any>();
    applications$: Observable<AppInterface[]>;
    form = new FormGroup({
        app: new FormControl(),
        version: new FormControl(),
        build: new FormControl()
    });
    private destroy$ = new Subject<boolean>();

    constructor(
        private store: Store<fromApp.State>,
        private router: Router,
        private route: ActivatedRoute,
        private dialogService: MatDialog,
        private configurationService: ConfigurationService,
        private fileService: FileService
    ) {
    }

    get selectedApplication(): AppInterface {
        return this.form.get('app').value;
    }

    get selectedVersion(): AppVersionInterface {
        return this.form.get('version').value;
    }

    get selectedBuild(): AppBuildInterface {
        return this.form.get('build').value;
    }

    ngOnInit() {
        this.subscribeToStore();
        this.selectAppByRouteSnapshot();
        this.listenForFormChanges();
    }

    subscribeToStore() {
        this.applications$ = this.store.pipe(select(getAllApplications));
        this.store.pipe(
            select(getApplicationsState),
            takeUntil(this.destroy$),
        ).subscribe((state: fromApps.State) => {
            this.form.patchValue({
                app: state.entities[state.selectedApplicationName] || null,
                version: state.selectedVersion,
                build: state.selectedBuild
            }, {emitEvent: false, onlySelf: true});
            this.setTitle(!!this.selectedApplication ? 'Application Selected' : 'Select Application');
        });
    }

    listenForFormChanges() {
        this.form.get('app').valueChanges.subscribe(app => {
            this.store.dispatch(new ApplicationActions.SelectApp({app}));
        });
        this.form.get('version').valueChanges.subscribe(version => {
            this.store.dispatch(new ApplicationActions.SelectVersion({version}));
        });
        this.form.get('build').valueChanges.subscribe(build => {
            this.store.dispatch(new ApplicationActions.SelectBuild({build}));
        });
    }

    selectAppByRouteSnapshot() {
        const app = (this.route.snapshot.params as { app: string }).app;
        if (app) {
            this.store.pipe(
                select(getApplicationsEntities),
                take(1)
            ).subscribe(applications => {
                if (applications[app]) {
                    this.store.dispatch(new ApplicationActions.SelectApp({app: applications[app]}));
                } else {
                    this.router.navigate(['/applications']);
                }
            });
        }
    }

    setTitle(title: string) {
        this.store.dispatch(new LayoutActions.SetTitle({title}));
    }

    createApp() {
        this.router.navigate(['/applications/new']);
    }

    deleteApp() {
        this.dialogService
            .open(DeleteApplicationDialogComponent, {width: '500px', height: '300px', data: {name: this.selectedApplication.AppName}})
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe(deleteConfirmed => {
                if (deleteConfirmed === true) {
                    this.store.dispatch(new ApplicationActions.DeleteAppRequest({app: this.selectedApplication}));
                }
            });
    }

    downloadConfiguration() {
        const [app, version, build] = [this.selectedApplication.AppName, this.selectedVersion.Version, this.selectedBuild.Build];
        this.store.dispatch(new ConfigurationActions.LoadConfigRequest({params: {app, version, build}}));
        this.store.pipe(
            select(getSelectedConfiguration),
            filter(config => !!config),
            take(1)
        ).subscribe(async (config) => {
            await this.configurationService.downloadConfiguration(config, `${app}_${version}_${build}.configuration`);
            await this.navigateToConfiguration({app, version, build});
        });
    }

    navigateToConfiguration(params: ConfigurationRequestParams): Promise<boolean> {
        return this.router.navigate(['/applications', params.app, params.version, params.build, 'configuration']);
    }

    editUsers() {
        this.router.navigate(['/applications', this.selectedApplication.AppName, 'edit-users']);
    }

    onFileChange(event) {
        const [app, version, build] = [this.selectedApplication.AppName, this.selectedVersion.Version, this.selectedBuild.Build];
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = event.target.files[0];
            this.fileService.readFile(file).then(receivedFile => {
                try {
                    const configuration = JSON.parse(receivedFile.value);
                    this.configurationService.uploadConfiguration({app, version, build}, configuration)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.navigateToConfiguration({app, version, build});
                        });
                } catch (e) {
                    console.error(e);
                }
            });
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
