import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './containers/login/login.component';
import { AuthRoutingModule } from './auth.routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        MaterialModule
    ]
})
export class AuthModule {
}
