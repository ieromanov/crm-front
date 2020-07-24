import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@core/store';
import { userInfoSelector } from '@store/user/user.selector';

import { UserInfo } from '@shared/types/user-info.type';

@Component({
  selector: 'crm-profile',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent {
  public user$: Observable<UserInfo> = this._store.select(userInfoSelector);

  constructor(private readonly _store: Store<State>) {}
}
