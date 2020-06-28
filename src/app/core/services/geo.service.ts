import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class GeoService {
  constructor(private readonly _apiService: ApiService) {}

  place(input: string) {
    const params = new HttpParams().set('input', input);
    return this._apiService.get('geo/place', { params });
  }
}
