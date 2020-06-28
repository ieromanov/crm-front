import { FormGroup } from '@angular/forms';

export function validateForm(form: FormGroup) {
  for (const field in form.controls) {
    form.controls[field].markAsDirty();
    form.controls[field].updateValueAndValidity();
  }
  return form.valid
}