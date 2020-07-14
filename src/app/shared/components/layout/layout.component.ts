import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '@store/index';
import { MenuItem } from '@shared/types/menu-item.type';

import { menuItems } from './layout-menu-items';
import { getUserInfoAction } from '@core/store/user/user.action';

@Component({
  selector: 'crm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public isCollapsed: boolean = false;

  public menuItems: MenuItem[] = menuItems

  constructor(private readonly _store: Store<State>) {}

  ngOnInit() {
    this._store.dispatch(getUserInfoAction());
  }

  public toggleMenuCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
