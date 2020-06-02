import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { IHome } from '@shared/interfaces/entity/home.interface';
import {
  HOME_NAME_MAX_LENGTH,
  HOME_DESCRIPTION_MAX_LENGTH,
} from './home-modal-form.constants';

@Component({
  selector: 'crm-home-modal',
  templateUrl: 'home-modal-form.component.html',
})
export class HomeModalFormComponent implements OnInit {
  @Input() public home: IHome = null;

  public form: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const home = this.initRoom();

    this.form = this.formBuilder.group({
      name: [
        home.name,
        [Validators.required, Validators.maxLength(HOME_NAME_MAX_LENGTH)],
      ],
      description: [
        home.description,
        [Validators.maxLength(HOME_DESCRIPTION_MAX_LENGTH)],
      ],
      active: [home.active],
    });
  }

  initRoom(): IHome {
    return this.home !== null
      ? this.home
      : {
          name: 'new home name',
          description: null,
          volume: 0,
          rooms: [],
          active: true,
        };
  }

  closeModal() {
    this.modalRef.destroy();
  }
}
