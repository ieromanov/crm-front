import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from '@store/index';
import { UserInfo } from '@shared/types/user-info.type';
import { AuthService } from '@core/services/auth.service';
import { userInfoSelector } from '@store/user/user.selector';
import { logoutAction } from '@store/user/user.action';

@Component({
  selector: 'crm-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() menuCollapsed: boolean = false;
  @Output() collapsedMenu: EventEmitter<void> = new EventEmitter()

  public user$: Observable<UserInfo> = this._store.select(userInfoSelector)

  constructor(
    private readonly _store: Store<State>
  ) {}

  public get menuIcon() {
    return this.menuCollapsed ? 'menu-unfold' : 'menu-fold'
  }

  public handleMenuCollapse(): void {
    this.collapsedMenu.emit()
  }

  handleLogout(): void {
    this._store.dispatch(logoutAction())
  }
}
