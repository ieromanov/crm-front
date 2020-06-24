import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from '@store/index';
import { UserInfo } from '@shared/types/user-info.type';
import { userInfoSelector } from '@store/user/user.selector';
import { logoutAction } from '@store/user/user.action';
import { NzModalService } from 'ng-zorro-antd';
import { CreateRequestFormComponent } from '../forms/create-request-form/create-request-form.component';

@Component({
  selector: 'crm-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() menuCollapsed: boolean = false;
  @Output() collapsedMenu: EventEmitter<void> = new EventEmitter()

  public user$: Observable<UserInfo> = this._store.select(userInfoSelector)

  constructor(
    private readonly _store: Store<State>,
    private readonly modalService: NzModalService
  ) {}

  public get menuIcon() {
    return this.menuCollapsed ? 'menu-unfold' : 'menu-fold'
  }

  public handleMenuCollapse(): void {
    this.collapsedMenu.emit()
  }

  public handleLogout(): void {
    this._store.dispatch(logoutAction())
  }

  public showCreateRequestModal() {
    this.modalService.create({
      nzTitle: 'Create Request',
      nzContent: CreateRequestFormComponent,
      nzWidth: 600,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => { console.log('cancel') },
        },
        {
          label: 'Create',
          type: 'primary',
          onClick: () => { console.log('create') },
        },
      ],
    });
  }
}
