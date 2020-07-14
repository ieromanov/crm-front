import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '@core/services/user.service';

import { validateForm } from '@shared/helpers/validate-form-group.helper';

@Component({
  selector: 'crm-update-password-form',
  templateUrl: 'update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss'],
})
export class UpdatePasswordFormComponent implements OnDestroy {
  public form!: FormGroup;
  public passwordVisible: boolean = false;
  private _activeRouterSub: Subscription;
  private _userToken: string;

  public get passwordNotMatchError() {
    return this.form.hasError('passwordNotMatch');
  }

  constructor(
    private readonly _activateRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UserService
  ) {
    this._activeRouterSub = this._activateRoute.params.subscribe((params) => {
      this._userToken = params.token;
    });

    this.form = this._formBuilder.group(
      {
        newPassword: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
      }
    );
  }

  ngOnDestroy(): void {
    this._activeRouterSub.unsubscribe()
  }

  public updatePassword() {
    if (validateForm(this.form) && this._comparePasswords(this.form)) {
      this._userService.updatePassword({
        token: this._userToken,
        newPassword: this.form.value.newPassword,
      }).subscribe((data) => {
        this._router.navigate(['/auth/login'])
      });
    }
  }

  private _comparePasswords(formGroup: FormGroup) {
    const { value: password } = formGroup.get('newPassword');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword;
  }
}
