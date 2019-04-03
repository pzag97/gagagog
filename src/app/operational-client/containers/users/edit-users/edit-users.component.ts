import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromApp from '@app/store/app.reducer';
import { getAllUsers, getSelectedUser, getUsersError } from '@app/store/app.reducer';
import * as UsersActions from '@app/users/store/users.actions';
import { LayoutActions } from '../../../store/actions';
import { Permissions, User, UserInterface, UserRoles } from '@app/users/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-edit-users',
    templateUrl: './edit-users.component.html',
    styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit, OnDestroy {
    users: User[] = [];
    selectedUser: User;
    form: FormGroup;
    app: string;
    destroy$: Subject<boolean> = new Subject<boolean>();
    error$: Observable<string> = this.store.pipe(select(getUsersError));

    constructor(private store: Store<fromApp.State>, private route: ActivatedRoute) {
    }

    get isUserSelected(): boolean {
        return !!this.form.get('username').value;
    }

    ngOnInit() {
        this.app = this.route.snapshot.params.app;
        this.store.dispatch(new UsersActions.LoadUsersRequest());
        this.store.dispatch(new LayoutActions.SetTitle({title: 'Edit Users'}));
        this.store.pipe(select(getAllUsers)).subscribe(users => {
            this.users = users;
            if (this.form) {
                this.form.reset();
            }
        });
        this.store.pipe(select(getSelectedUser)).subscribe(user => this.selectedUser = user);
        this.initForm();
        this.listenToUsernameChanges();
    }

    initForm() {
        this.form = new FormGroup({
            username: new FormControl(),
            newUsername: new FormControl(null, [Validators.required]),
            permissions: new FormGroup({
                canUpdate: new FormControl(),
                canDelete: new FormControl(),
                canAddNewUsers: new FormControl()
            })
        });
    }

    listenToUsernameChanges() {
        this.form.get('username').valueChanges.subscribe(value => {
            const newUsernameControl = this.form.get('newUsername');
            const permissions = this.form.get('permissions') as FormGroup;
            if (!value) {
                newUsernameControl.setValidators([Validators.required]);
                permissions.enable();
            } else {
                newUsernameControl.setValidators([]);
                const user = this.users.find(u => u.username === value);
                permissions.patchValue(user.getPermissionsForApp(this.app));
                permissions.disable();
            }
        });
    }

    addUser() {
        if (!this.form.valid) {
            this.form.get('newUsername').markAsTouched();
            return;
        }
        const username = this.form.get('newUsername').value;
        const permissions = {[this.app]: this.form.get('permissions').value} as Permissions;
        const newUser: UserInterface = {
            username,
            password: 'test',
            permissions,
            firstName: username,
            lastName: username,
            role: UserRoles.User
        };
        this.store.dispatch(new UsersActions.AddUserRequest({user: newUser}));
    }

    deleteUser() {
        const user = this.users.find(u => u.username === this.form.get('username').value);
        this.store.dispatch(new UsersActions.DeleteUserRequest({user}));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
