import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd';

import { RequestService } from '@core/services/request.service';

import { State } from '@store/index';
import { userInfoSelector } from '@store/user/user.selector';
import { logoutAction } from '@store/user/user.action';

import { UserInfo } from '@shared/types/user-info.type';
import { validateForm } from '@shared/helpers/validate-form-group.helper';
import { CreateRequestFormComponent } from '@shared/components/forms/create-request-form/create-request-form.component';
import { CreateRequestDTO } from '@shared/dto/create-request.dto';

@Component({
  selector: 'crm-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() menuCollapsed: boolean = false;
  @Output() collapsedMenu: EventEmitter<void> = new EventEmitter();

  public user$: Observable<UserInfo> = this._store.select(userInfoSelector);

  constructor(
    private readonly _store: Store<State>,
    private readonly _modalService: NzModalService,
    private readonly _requestService: RequestService
  ) {}

  public get menuIcon() {
    return this.menuCollapsed ? 'menu-unfold' : 'menu-fold';
  }

  public handleMenuCollapse(): void {
    this.collapsedMenu.emit();
  }

  public handleLogout(): void {
    this._store.dispatch(logoutAction());
  }

  public showCreateRequestModal() {
    this._modalService.create({
      nzTitle: 'Create Request',
      nzContent: CreateRequestFormComponent,
      nzStyle: { top: '20px' },
      nzWidth: 600,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => {
            console.log('cancel');
          },
        },
        {
          label: 'Create',
          type: 'primary',
          onClick: this._handleOnConfirmCreate.bind(this),
        },
      ],
    });
  }

  private _handleOnConfirmCreate(componentInstance: CreateRequestFormComponent) {
    const formValid = validateForm(componentInstance.form)
    if (formValid) {
      this._requestService.create(new CreateRequestDTO(componentInstance.form.value))
      .subscribe(() => {
        debugger
      })
    }
  }
}
