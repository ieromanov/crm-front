import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';


import { UserService } from '@core/services/user.service';
import { State } from '@core/store';
import {
  serviceTypesDictionaryEntitiesSelector,
  homeTypesDictionaryEntitiesSelector,
  roomDictionaryEntitiesSelector,
} from '@store/dictionaries/dictionaries.selector';

import { IServiceType } from '@shared/interfaces/entity/service-type.interface';
import { IRoom } from '@shared/interfaces/entity/room.interface';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { UserInfo } from '@shared/types/user-info.type';
import { FindUserDTO } from '@shared/dto/find-user.dto';
import { getValueFromEvent } from '@shared/helpers/get-value-from-event.helper';
import { isEmpty } from 'lodash';

@Component({
  selector: 'crm-create-request-form',
  templateUrl: 'create-request-form.component.html',
})
export class CreateRequestFormComponent implements OnInit {
  public serviceTypes$: Observable<IServiceType[]> = this._store.select(
    serviceTypesDictionaryEntitiesSelector
  );
  public homeTypes$: Observable<IHomeType[]> = this._store.select(
    homeTypesDictionaryEntitiesSelector
  );
  public rooms$: Observable<IRoom[]> = this._store.select(
    roomDictionaryEntitiesSelector
  );

  public form: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<State>,
    private readonly _userService: UserService,
    private readonly _nzMessageService: NzMessageService
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      serviceTypeControl: [null, [Validators.required]],
      moveDateControl: [null, [Validators.required]],
      homeControl: [null, [Validators.required]],
      roomsControl: [null],
      addressControl: [null, [Validators.required]],

      firstNameControl: [null, [Validators.required]],
      lastNameControl: [null, [Validators.required]],
      emailControl: [null, [Validators.required, Validators.email]],
      phoneControl: [null, [Validators.required]],
    });
  }

  public onEmailChanged(event: InputEvent) {
    const { emailControl, firstNameControl, lastNameControl } = this.form.controls
    if (emailControl.valid && isEmpty(firstNameControl.value) && isEmpty(lastNameControl.value)) {
      const email = getValueFromEvent(event);
      this._fetchUserInfo({ email })
    }
  }

  public onPhoneChanged(event: InputEvent) {
    const { phoneControl, firstNameControl, lastNameControl } = this.form.controls
    if (phoneControl.valid && isEmpty(firstNameControl.value) && isEmpty(lastNameControl.value)) {
      const phone = getValueFromEvent(event);
      this._fetchUserInfo({ phone })
    }
  }

  private _fetchUserInfo(dto: FindUserDTO) {
    this._userService
        .find(dto)
        .subscribe(
          this._updateClientInfo.bind(this),
          () => this._nzMessageService.create('warning', `User not found`)
        );
  }

  private _updateClientInfo(userInfo: UserInfo) {
    this.form.controls.firstNameControl.setValue(userInfo.firstName);
    this.form.controls.lastNameControl.setValue(userInfo.lastName);
    this.form.controls.emailControl.setValue(userInfo.email);
    this.form.controls.phoneControl.setValue(userInfo.phone);
  }
}
