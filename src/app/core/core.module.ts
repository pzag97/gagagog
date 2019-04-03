import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [NotFoundComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: []
})
export class CoreModule {
}
