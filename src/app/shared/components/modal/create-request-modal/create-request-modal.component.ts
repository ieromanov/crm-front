import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import isEmpty from 'lodash/isEmpty';

import { UserService } from '@core/services/user.service';
import { RequestService } from '@core/services/request.service';

import { State } from '@core/store';
import {
  serviceTypesDictionaryEntitiesSelector,
  homeTypesDictionaryEntitiesSelector,
  roomDictionaryEntitiesSelector,
  statusDictionaryEntitiesSelector,
} from '@store/dictionaries/dictionaries.selector';

import { CreateRequestDTO } from '@shared/dto/create-request.dto';
import { FindUserDTO } from '@shared/dto/find-user.dto';
import { getValueFromEvent } from '@shared/helpers/get-value-from-event.helper';
import { validateForm } from '@shared/helpers/validate-form-group.helper';
import { UserInfo } from '@shared/types/user-info.type';
import { IServiceType } from '@shared/interfaces/entity/service-type.interface';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { IRoom } from '@shared/interfaces/entity/room.interface';
import { IStatus } from '@shared/interfaces/entity/status.interface';

@Component({
  selector: 'crm-create-request-modal',
  templateUrl: 'create-request-modal.component.html',
  styleUrls: ['create-request-modal.component.scss']
})
export class CreateRequestModalComponent {
  @Input() public isVisible: boolean
  @Output() public onClose: EventEmitter<void> = new EventEmitter<void>()

  public statuses$: Observable<IStatus[]> = this._store.select(
    statusDictionaryEntitiesSelector
  );
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
  public loading: boolean = false

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<State>,
    private readonly _userService: UserService,
    private readonly _nzMessageService: NzMessageService,
    private readonly _requestService: RequestService
  ) {
    this.form = this._formBuilder.group({
      statusControl: [null, [Validators.required]],
      serviceTypeControl: [null, [Validators.required]],
      moveDateControl: [null, [Validators.required]],
      homeControl: [null, [Validators.required]],
      extraRoomsControl: [[]],
      originControl: [null, [Validators.required]],
      destinationControl: [null, [Validators.required]],

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

  public handleCreate() {
    const formValid = validateForm(this.form)
    if (formValid) {
      this.loading = true
      this._requestService.create(new CreateRequestDTO(this.form.value))
      .subscribe(() => {
        this.loading = false
        this.handleCancel()
      }, () => {
        this._nzMessageService.create('error', 'request not created');
        this.loading = false
      })
    }
  }
  public handleCancel() {
    this.onClose.emit()
  }

  private _fetchUserInfo(dto: FindUserDTO) {
    this._userService
        .find(dto)
        .subscribe(this._updateClientInfo.bind(this));
  }

  private _updateClientInfo(userInfo: UserInfo) {
    if (userInfo === null) {
      this._nzMessageService.create('warning', `User not found`);
      return;
    }
    this.form.controls.firstNameControl.setValue(userInfo.firstName);
    this.form.controls.lastNameControl.setValue(userInfo.lastName);
    this.form.controls.emailControl.setValue(userInfo.email);
    this.form.controls.phoneControl.setValue(userInfo.phone);
  }
}