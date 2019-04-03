import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { getSelectedConfiguration } from '@app/operational-client/store/reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import * as fromApp from '@app/store/app.reducer';
import { LayoutActions } from '../../../store/actions';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigurationService } from '@app/operational-client/services/configuration.service';

class Question {
    label: string;
    key: string;
    type: string;
    questions: Question[];
    value: string | boolean | number;
    formGroupPath: string[] = [];

    constructor(options: {
        label: string;
        key?: string;
        type?: string;
        questions?: Question[],
        value?: string | boolean | number
    }) {
        this.label = options.label || '';
        this.key = options.key || null;
        this.type = options.type || null;
        this.questions = options.questions || [];
        this.value = options.value;
    }
}

@Component({
    selector: 'app-edit-configuration',
    templateUrl: './edit-configuration.component.html',
    styleUrls: ['./edit-configuration.component.scss']
})
export class EditConfigurationComponent implements OnInit, OnDestroy {
    questions: Question[];
    form: FormGroup;
    treeControl = new NestedTreeControl<Question>(node => node.questions);
    dataSource = new MatTreeNestedDataSource<Question>();
    params: Params;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    hasChild = (_: number, node: Question) => !!node.questions && node.questions.length > 0;

    constructor(private store: Store<fromApp.State>, private route: ActivatedRoute, private configurationService: ConfigurationService) {
    }

    ngOnInit() {
        this.setTitle();
        this.subscribeToRouteParams();
        this.store.pipe(
            select(getSelectedConfiguration),
            takeUntil(this.destroy$)
        ).subscribe(configuration => {
            this.questions = this.buildQuestions(configuration);
            this.form = this.toFormGroup(this.questions);
            this.dataSource.data = this.treeControl.dataNodes = this.questions;
            this.treeControl.expandAll();
        });
    }

    subscribeToRouteParams() {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => this.params = params);
    }

    setTitle() {
        this.store.dispatch(new LayoutActions.SetTitle({title: 'Edit Application Configuration'}));
    }

    saveConfiguration() {
        const [app, version, build] = [this.params.app, this.params.version, this.params.build];
        this.configurationService.downloadConfiguration(this.form.value, `${app}_${version}_${build}.configuration`);
    }

    uploadConfiguration() {
        const [app, version, build] = [this.params.app, this.params.version, this.params.build];
        this.configurationService.uploadConfiguration({app, version, build: parseInt(build, 10)}, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    buildQuestions(configuration: object) {
        if (!this.isObject(configuration)) {
            return;
        }
        const questions = [];
        Object.keys(configuration).forEach(key => {
            const obj = configuration[key];
            let type: string;
            let childQuestions: Question[] = [];
            let value: string | number | boolean;
            if (this.isObject(obj)) {
                childQuestions = this.buildQuestions(obj);
            } else {
                value = obj;
                type = this.getQuestionType(value);
            }
            questions.push(new Question({label: key, value, type, key, questions: childQuestions}));
        });
        return questions;
    }

    getQuestionType(value: string | number | boolean): string {
        switch (typeof value) {
            case 'number':
                return 'number';
            case 'boolean':
                return 'checkbox';
            case 'string':
            default:
                return 'text';
        }
    }

    toFormGroup(questions: Question[], path: string[] = []) {
        const group = {};
        questions.forEach(question => {
            question.formGroupPath = path;
            if (question.questions && question.questions.length > 0) {
                group[question.key] = this.toFormGroup(question.questions, [...path, question.key]);
            } else {
                group[question.key] = new FormControl(question.value);
            }
        });
        return new FormGroup(group);
    }

    isObject(obj: any) {
        const type = typeof obj;
        return type === 'object' && !!obj;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
