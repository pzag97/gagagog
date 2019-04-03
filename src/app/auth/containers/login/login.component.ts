import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Credentials } from '@app/users/models/user';
import * as fromApp from '../../../store/app.reducer';
import * as fromAuth from '../../store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    error$ = this.store.select(fromApp.getAuthError);

    constructor(private fb: FormBuilder, private store: Store<fromApp.State>) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            Object.keys(this.form.controls)
                .forEach(field => {
                    const control = this.form.get(field);
                    control.markAsTouched({onlySelf: true});
                });
            return;
        }

        this.store.dispatch(new fromAuth.LoginRequest(this.form.value as Credentials));
    }
}
