import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@store/index';
import { userInfoSelector } from '@store/user/user.selector';
import { logoutAction } from '@store/user/user.action';

import { UserInfo } from '@shared/types/user-info.type';

@Component({
  selector: 'crm-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() menuCollapsed: boolean = false;
  @Output() collapsedMenu: EventEmitter<void> = new EventEmitter();

  public user$: Observable<UserInfo> = this._store.select(userInfoSelector);
  public createRequestModalVisible: boolean = false;

  constructor(
    private readonly _store: Store<State>,
    private readonly _router: Router
  ) {}

  public get menuIcon() {
    return this.menuCollapsed ? 'menu-unfold' : 'menu-fold';
  }

  public collapseMenu(): void {
    this.collapsedMenu.emit();
  }

  public logout(): void {
    this._store.dispatch(logoutAction());
  }

  public showCreateRequestModal() {
    this.createRequestModalVisible = true;
  }
  public hideCreateRequestModal() {
    this.createRequestModalVisible = false;
  }
}
