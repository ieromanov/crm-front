import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@store/index';
import { Store } from '@ngrx/store';
import { loginAction } from '@store/user/user.action';

@Component({
  selector: 'crm-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public validateForm!: FormGroup;
  public passwordVisible: boolean = false

  constructor(
    private readonly _store: Store<State>,
    private readonly _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.validateForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    if (this.validateForm.valid) {
      const { email, password } = this.validateForm.value
      this._store.dispatch(loginAction({ email, password }))
    }
  }
}
