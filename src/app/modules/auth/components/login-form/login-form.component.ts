import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { validateForm } from '@shared/helpers/validate-form-group.helper';

import { State } from '@store/index';
import { loginAction } from '@store/user/user.action';
import { loginErrorSelector } from '@store/user/user.selector';

@Component({
  selector: 'crm-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public form!: FormGroup;
  public passwordVisible: boolean = false
  public loginError$ = this._store.select(loginErrorSelector)

  constructor(
    private readonly _store: Store<State>,
    private readonly _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    if (validateForm(this.form)) {
      const { email, password } = this.form.value
      this._store.dispatch(loginAction({ email, password }))
    }
  }
}
