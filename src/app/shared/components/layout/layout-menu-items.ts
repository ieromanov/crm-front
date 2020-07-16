import { MenuItem } from '@shared/types/menu-item.type';

export const menuItems: MenuItem[] = [
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
        link: '/setting/move-size',
        title: 'Move size settings',
      },
      {
        link: '/setting/service-type',
        title: 'Service type',
      },
      {
        link: '/setting/truck',
        title: 'Truck',
      },
      {
        link: '/setting/users',
        title: 'Users',
      },
    ],
  },
];