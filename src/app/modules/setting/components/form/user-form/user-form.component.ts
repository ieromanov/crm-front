import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import {
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PHONE_MAX_LENGTH,
} from './user-form.constants';
import { UserInfo } from '@shared/types/user-info.type';

@Component({
  selector: 'crm-user-form',
  templateUrl: 'user-form.component.html',
})
export class UserFormComponent implements OnInit {
  @Input() public user: UserInfo = null;

  public form: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const user = this.init();

    this.form = this.formBuilder.group({
      firstName: [
        user.firstName,
        [Validators.required, Validators.maxLength(FIRST_NAME_MAX_LENGTH)],
      ],
      lastName: [
        user.lastName,
        [Validators.required, Validators.maxLength(LAST_NAME_MAX_LENGTH)],
      ],
      email: [user.email, [Validators.maxLength(EMAIL_MAX_LENGTH)]],
      emailVerified: [user.emailVerified],
      phone: [user.phone, [Validators.maxLength(PHONE_MAX_LENGTH)]],
    });
  }

  init(): Omit<UserInfo, 'id'> {
    return this.user !== null
      ? this.user
      : {
          firstName: '',
          lastName: '',
          email: '',
          emailVerified: false,
          phone: '',
        };
  }

  closeModal() {
    this.modalRef.destroy();
  }
}
