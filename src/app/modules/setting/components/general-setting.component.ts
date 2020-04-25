import { Component, OnInit, Inject } from '@angular/core';
import { API_SERVICE } from '@core/di-tokens';
import { IApiService } from '@shared/interfaces/api-service.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-general-setting',
  templateUrl: 'general-setting.component.html',
})
export class GeneralSettingComponent implements OnInit {
  public settings: any[] = []

  constructor(@Inject(API_SERVICE) private readonly apiService: IApiService) {}

  ngOnInit() {
    this.apiService
      .get('/api/setting')
      .pipe(catchError((error) => of(error)))
      .subscribe(setting => {
        this.settings = setting.items
      });
  }
}
