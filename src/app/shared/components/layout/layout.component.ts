import { Component } from '@angular/core';
import { MenuItem } from '@shared/types/menu-item.type';

import { menuItems } from './layout-menu-items';

@Component({
  selector: 'crm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public isCollapsed: boolean = false;

  public menuItems: MenuItem[] = menuItems

  public toggleMenuCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
