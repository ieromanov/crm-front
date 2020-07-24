import { Component, Input } from '@angular/core';

import { UserInfo } from '@shared/types/user-info.type';

@Component({
  selector: 'crm-user-info',
  templateUrl: 'user-info.component.html',
})
export class UserInfoComponent {
  @Input() user: UserInfo;
}
