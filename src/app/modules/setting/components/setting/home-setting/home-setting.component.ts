import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HomeTypeService } from '@core/services/home-type.service';
import { ConstantService } from '@core/services/constant.service';

import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { IRoom } from '@shared/interfaces/entity/room.interface';
import { validateForm } from "@shared/helpers/validate-form-group.helper"

import { State } from "@store/index";
import { homeTypesDictionaryEntitiesSelector } from '@store/dictionaries/dictionaries.selector';
import {
  addOneAction,
  updateOneAction,
  removeOneAction,
} from '@store/dictionaries/home-type-dictionary/home-type-dictionary.action';

import { HomeFormComponent } from '../../form/home-form/home-form.component';

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
    private readonly _constantService: ConstantService,
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
    const formValid = validateForm(componentInstance.form)
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
          this._store.dispatch(addOneAction(homeType));
          this.loading = false;
        });
    }
  }

  private _handleOnConfirmUpdate(id: string) {
    return (componentInstance: HomeFormComponent) => {
      const formValid = validateForm(componentInstance.form)
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
            updateOneAction({ id, changes: homeType })
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
        this._store.dispatch(removeOneAction({ id }));
        this.loading = false;
      });
    };
  }

  private _handleCloseModal(componentInstance: HomeFormComponent) {
    componentInstance.closeModal();
  }
}
