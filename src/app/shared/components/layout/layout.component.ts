import { Component } from '@angular/core';
import { MenuItem } from '@shared/types/menu-item.type';

@Component({
  selector: 'crm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public isCollapsed: boolean = false;

  public menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      children: [
        {
          link: '/dashboard',
          title: 'Dashboard',
        },
      ],
    },
    {
      title: 'Setting',
      icon: 'setting',
      children: [
        {
          link: '/setting/general',
          title: 'General',
        },
        {
          link: '/setting/status',
          title: 'Status',
        },
        {
          link: '/setting/room',
          title: 'Room',
        },
        {
          link: '/setting/home',
          title: 'Home',
        },
        {
          link: '/setting/service-type',
          title: 'Service type',
        },
        {
          link: '/setting/truck',
          title: 'Truck',
        },
      ],
    },
  ];

  public toggleMenuCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
