import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { getApplicationError } from '@app/operational-client/store/reducers';
import { ApplicationActions, LayoutActions } from '../../../store/actions';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '@app/store/app.reducer';

@Component({
    selector: 'app-create-application',
    templateUrl: './create-application.component.html',
    styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

    form = new FormGroup({
        name: new FormControl(null, [Validators.required])
    });
    error$ = this.store.pipe(select(getApplicationError));

    constructor(private store: Store<fromApp.State>, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.store.dispatch(new LayoutActions.SetTitle({title: 'Create Application'}));
    }

    cancel() {
        this.router.navigate(['/applications']);
    }

    onSubmit() {
        if (!this.form.valid) {
            this.form.get('name').markAsTouched();
            return;
        }
        this.store.dispatch(new ApplicationActions.CreateAppRequest(this.form.value));
    }
}
