import { Component } from '@angular/core';

interface MenuItem {
  title: string; 
  link?: string;
  icon?: string;
  children?: MenuItem[]
}

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isCollapsed: boolean = false;

  public menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      children: [{
        link: '/dashboard',
        title: 'Dashboard'
      }]
    },
    {
      title: 'Setting',
      icon: 'setting',
      children: [
        {
          link: '/setting/general',
          title: 'General'
        },
        {
          link: '/setting/status',
          title: 'Status'
        },
        {
          link: '/setting/room',
          title: 'Room'
        },
        {
          link: '/setting/home',
          title: 'Home'
        },
        {
          link: '/setting/service-type',
          title: 'Service type'
        },
        {
          link: '/setting/truck',
          title: 'Truck'
        },
      ]
    }
  ]

  constructor() {}

  public toggleMenuCollapsed():void {
    this.isCollapsed = !this.isCollapsed
  }
}
