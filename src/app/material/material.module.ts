import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule, MatRadioModule,
    MatSelectModule,
    MatTreeModule
} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatGridListModule,
        MatTreeModule,
        MatCheckboxModule,
        MatRadioModule
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatGridListModule,
        MatTreeModule,
        MatCheckboxModule,
        MatRadioModule
    ]
})
export class MaterialModule {
}
