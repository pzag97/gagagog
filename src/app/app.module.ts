import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { UsersEffects } from '@app/users/store/users.effects';
import { UsersModule } from '@app/users/users.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers),
        HttpClientModule,
        EffectsModule.forRoot([AuthEffects, UsersEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        CoreModule,
        AuthModule,
        UsersModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
