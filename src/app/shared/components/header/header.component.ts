import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'crm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() menuCollapsed: boolean = false;
  @Output() onCollapsedChanged = new EventEmitter<boolean>()

  constructor() {}

  get menuIcon() {
    return this.menuCollapsed ? 'menu-unfold' : 'menu-fold'
  }

  handleMenuCollapse(): void {
    this.onCollapsedChanged.emit(!this.menuCollapsed)
  }

  handleLogout(): void {
    window.open(environment.backend_url + '/auth/logout', '_self')
  }
}
