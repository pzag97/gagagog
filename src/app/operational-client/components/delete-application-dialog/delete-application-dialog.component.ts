import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@app/core/services/validators.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-delete-application-dialog',
    templateUrl: './delete-application-dialog.component.html',
    styleUrls: ['./delete-application-dialog.component.scss']
})
export class DeleteApplicationDialogComponent implements OnInit {
    name = '';
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<DeleteApplicationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { name: string } = {name: null}
    ) {
    }

    ngOnInit() {
        this.name = this.data.name;
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required, ValidatorsService.valueShouldBeEqualTo(this.name)])
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            this.form.get('name').markAsTouched();
            return;
        }
        this.dialogRef.close(true);
    }
}
