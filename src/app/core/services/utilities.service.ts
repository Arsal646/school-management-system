import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private snackBar: MatSnackBar) {}

  showErrorToast(msg: string,duration?:number) {
    this.snackBar.open(`${msg}`, 'Error', {
      duration: duration ? duration:600,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['text-danger'],
    });
  }
  showSuccessToast(msg: string) {
    this.snackBar.open(`${msg}`, 'Success', {
      duration: 600,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success'],
    });
  }

  showWarningToast(msg: string) {
    this.snackBar.open(`${msg}`, 'Warning', {
      duration: 600,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['warning'],
    });
  }
  checkValidations(form: FormGroup) {
    for (const controlName in form.controls) {
      if (Object.prototype.hasOwnProperty.call(form.controls, controlName)) {
        const control = form.get(controlName);
        if (control?.invalid) {
          const requiredField = `${this.transformControlName(
            controlName
          )} is required.`;
          this.showErrorToast(requiredField);
          break;
        }
      }
    }
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  transformControlName(controlName: string): string {
    return controlName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
