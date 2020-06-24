import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IServiceType } from '@shared/interfaces/entity/service-type.interface';
import { IRoom } from '@shared/interfaces/entity/room.interface';
import { IHomeType } from '@shared/interfaces/entity/home.interface';

import { State } from '@core/store';
import {
  serviceTypesDictionaryEntitiesSelector,
  homeTypesDictionaryEntitiesSelector,
  roomDictionaryEntitiesSelector,
} from '@store/dictionaries/dictionaries.selector';

@Component({
  selector: 'crm-create-request-form',
  templateUrl: 'create-request-form.component.html',
})
export class CreateRequestFormComponent implements OnInit {
  @Input() public request = null;
  public serviceTypes$: Observable<IServiceType[]> = this._store.select(
    serviceTypesDictionaryEntitiesSelector
  );
  public homeTypes$: Observable<IHomeType[]> = this._store.select(
    homeTypesDictionaryEntitiesSelector
  );
  public rooms$: Observable<IRoom[]> = this._store.select(
    roomDictionaryEntitiesSelector
  );

  public form: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<State>
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      serviceType: [null, [Validators.required]],
      moveDate: [null, [Validators.required]],
      home: [null, [Validators.required]],
      rooms: [null],
      address: [null]
    });
  }
}
