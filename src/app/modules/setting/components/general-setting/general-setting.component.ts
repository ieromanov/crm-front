import { Component, OnInit, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { API_SERVICE } from '@core/di-tokens';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { FormGroup } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'crm-general-setting',
  templateUrl: './general-setting.component.html',
  animations: [
    trigger('loading', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('240ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('240ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class GeneralSettingComponent implements OnInit {
  public validateForm: FormGroup;
  public settings: any[] = [];
  public loading: boolean = true;

  constructor(
    @Inject(API_SERVICE)
    private readonly apiService: IApiService
  ) {}

  ngOnInit() {
    this.apiService
      .get('setting')
      .pipe(catchError((err) => of(err)))
      .subscribe((settings) => {
        this.loading = false;
        this.settings = settings.items;
      });
  }

  save() {}
}
