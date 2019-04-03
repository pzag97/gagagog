import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ViewApplicationComponent } from './containers/application/view-application/view-application.component';
import { ApplicationsGuard } from '@app/operational-client/guards/applications.guard';
import { CreateApplicationComponent } from '@app/operational-client/containers/application/create-application/create-application.component';
// tslint:disable-next-line
import { EditConfigurationComponent } from '@app/operational-client/containers/configuration/edit-configuration/edit-configuration.component';
import { ConfigurationGuard } from '@app/operational-client/guards/configuration.guard';
import { EditUsersComponent } from '@app/operational-client/containers/users/edit-users/edit-users.component';

const operationalClientRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [ApplicationsGuard],
        children: [
            {
                path: 'new',
                component: CreateApplicationComponent
            },
            {
                path: '',
                component: ViewApplicationComponent,
                pathMatch: 'full'
            },
            {
                path: ':app',
                component: ViewApplicationComponent,
            },
            {
                path: ':app/edit-users',
                component: EditUsersComponent
            },
            {
                path: ':app/:version/:build/configuration',
                component: EditConfigurationComponent,
                canActivate: [ConfigurationGuard]
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(operationalClientRoutes)],
    exports: [RouterModule]
})
export class OperationalClientRoutingModule {
}
