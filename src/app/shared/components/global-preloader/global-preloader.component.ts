import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { loadingAppSelector } from '@core/store/app/app.selector';
import { State } from '@store/index';

@Component({
  selector: 'crm-global-preloader',
  templateUrl: 'global-preloader.component.html',
  styleUrls: ['./global-preloader.component.scss'],
})

export class GlobalPreloaderComponent {
  public loading$: Observable<boolean> = this._store.select(loadingAppSelector)

  constructor(private readonly _store: Store<State>) {}
}