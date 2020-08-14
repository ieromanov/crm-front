import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivationEnd,
  ActivatedRoute,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

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

  private _heading: string = '';
  public get heading(): string {
    return this._heading;
  }

  constructor(
    private readonly _store: Store<State>,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this._activatedRoute),
        map((route) => route.firstChild),
        switchMap((route) => route.data)
      )
      .subscribe((data) => {
        this._heading = data.header || '';
      });
  }

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
