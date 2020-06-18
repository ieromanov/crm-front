import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';

import { CONSTANT_SERVICE } from '@core/di-tokens';
import { IConstantService } from '@shared/interfaces/service/constant-service.interface';
import { IHomeType } from '@shared/interfaces/entity/home.interface';

import { HomeTypeService } from '@core/services/home-type.service';
import { State } from "@store/index";
import { homeTypesDictionaryEntitiesSelector } from '@store/dictionaries/dictionaries.selector';
import {
  addOneHomeTypeAction,
  updateOneHomeTypeAction,
  removeOneHomeTypeAction,
} from '@store/dictionaries/home-type-dictionary/home-type-dictionary.action';
import { HomeFormComponent } from '../home-form/home-form.component';
import { IRoom } from '@shared/interfaces/entity/room.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'crm-home-setting',
  templateUrl: './home-setting.component.html',
  styleUrls: ['./home-setting.component.scss'],
})
export class HomeSettingComponent {
  public loading: boolean = false;
  public homeTypes$: Observable<IHomeType[]> = this._store.select(
    homeTypesDictionaryEntitiesSelector
  );

  public get colorsConstants() {
    return this._constantService.colors;
  }

  constructor(
    @Inject(CONSTANT_SERVICE)
    private readonly _constantService: IConstantService,
    private readonly _homeTypeService: HomeTypeService,
    private readonly _modalService: NzModalService,
    private readonly _store: Store<State>
  ) {}

  public showDeleteConfirmModal(id: string) {
    this._modalService.confirm({
      nzTitle: 'Do you want to delete these home type?',
      nzContent:
        'When clicked the OK button, this home type will be deleted',
      nzOkType: 'danger',
      nzOnOk: this._handleOnConfirmDelete(id),
    });
  }

  public showCreateModal() {
    this._modalService.create({
      nzTitle: 'Create service type',
      nzContent: HomeFormComponent,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Create',
          type: 'primary',
          onClick: this._handleOnConfirmCreate.bind(this),
        },
      ],
    });
  }

  public showUpdateModal(homeType: IHomeType) {
    this._modalService.create({
      nzTitle: 'Update home type',
      nzContent: HomeFormComponent,
      nzComponentParams: { homeType },
      nzFooter: [
        {
          label: 'Cancel',
          onClick: this._handleCloseModal,
        },
        {
          label: 'Update',
          type: 'primary',
          onClick: this._handleOnConfirmUpdate(homeType.id),
        },
      ],
    });
  }

  private _handleOnConfirmCreate(componentInstance: HomeFormComponent) {
    const formValid = this._validateForm(componentInstance.form)
    if (formValid) {
      this.loading = true;
      const data = {
        ...componentInstance.form.value,
        rooms: componentInstance.rooms.filter(
          ({ id }: IRoom) => componentInstance.form.value.rooms.includes(id)
        )
      }
      this._homeTypeService
        .create(data)
        .subscribe((homeType: IHomeType) => {
          componentInstance.closeModal();
          this._store.dispatch(addOneHomeTypeAction(homeType));
          this.loading = false;
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: HomeFormComponent) => {
      const formValid = this._validateForm(componentInstance.form)
      if (formValid) {
        this.loading = true;
        const data = {
          ...componentInstance.form.value,
          rooms: componentInstance.rooms.filter(
            ({ id }: IRoom) => componentInstance.form.value.rooms.includes(id)
          )
        }
        this._homeTypeService.update(id, data).subscribe((homeType: IHomeType) => {
          componentInstance.closeModal();
          this._store.dispatch(
            updateOneHomeTypeAction({ id, changes: homeType })
          );
          this.loading = false;
        });
      }
    };
  }

  private _handleOnConfirmDelete(id: string) {
    return () => {
      this.loading = true;
      this._homeTypeService.delete(id).subscribe(() => {
        this._store.dispatch(removeOneHomeTypeAction({ id }));
        this.loading = false;
      });
    };
  }

  private _handleCloseModal(componentInstance: HomeFormComponent) {
    componentInstance.closeModal();
  }
  
  private _validateForm(form: FormGroup) {
    for (const field in form.controls) {
      form.controls[field].markAsDirty();
      form.controls[field].updateValueAndValidity();
    }
    return form.valid
  }
}
