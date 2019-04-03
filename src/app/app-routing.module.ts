import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuard } from './auth/services/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/applications'
    },
    {
        path: 'applications',
        loadChildren: './operational-client/operational-client.module#OperationalClientModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
