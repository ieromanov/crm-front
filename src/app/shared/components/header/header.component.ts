import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '@env/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() menuCollapsed: boolean = false;
  @Output() collapsedMenu: EventEmitter<void> = new EventEmitter()

  constructor(private readonly router: Router) {}

  public get menuIcon() {
    return this.menuCollapsed ? 'menu-unfold' : 'menu-fold'
  }

  public handleMenuCollapse(): void {
    this.collapsedMenu.emit()
  }

  handleLogout(): void {
    window.open(environment.backend_url + '/auth/logout', '_self')
  }
}
