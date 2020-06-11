import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@store/index';
import { Observable } from 'rxjs';
import { loadingUserInfoSelector } from '@store/user/user.selector';
import { getUserInfoAction } from '@store/user/user.action';

@Component({
  selector: 'crm-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  public loadingUserInfo$: Observable<boolean> = this._store.select(loadingUserInfoSelector)

  constructor(
    private readonly _store: Store<State>,
  ) {}

  ngOnInit() {
    this._store.dispatch(getUserInfoAction())
  }
}
