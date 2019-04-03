import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationalClientRoutingModule } from './operational-client.routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateApplicationComponent } from './containers/application/create-application/create-application.component';
import { ViewApplicationComponent } from './containers/application/view-application/view-application.component';
import { EditConfigurationComponent } from './containers/configuration/edit-configuration/edit-configuration.component';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/operational-client/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationsEffects } from '@app/operational-client/store/effects/applications.effects';
import { ApplicationsGuard } from '@app/operational-client/guards/applications.guard';
import { DeleteApplicationDialogComponent } from './components/delete-application-dialog/delete-application-dialog.component';
import { ConfigurationEffects } from '@app/operational-client/store/effects/configuration.effects';
import { ConfigurationGuard } from '@app/operational-client/guards/configuration.guard';
import { EditUsersComponent } from './containers/users/edit-users/edit-users.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LayoutComponent,
        CreateApplicationComponent,
        ViewApplicationComponent,
        EditConfigurationComponent,
        DeleteApplicationDialogComponent,
        EditUsersComponent
    ],
    providers: [
        ApplicationsGuard,
        ConfigurationGuard
    ],
    imports: [
        CommonModule,
        OperationalClientRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forFeature('operationalClient', reducers),
        EffectsModule.forFeature([ApplicationsEffects, ConfigurationEffects])
    ],
    entryComponents: [DeleteApplicationDialogComponent]
})
export class OperationalClientModule {
}
