import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
    static valueShouldBeEqualTo(value: any, errorText = 'Values are not equal'): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!control.value) {
                return null;
            }
            return value !== control.value ? {notEqual: {value: errorText}} : null;
        };
    }
}
