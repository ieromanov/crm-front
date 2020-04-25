import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiService } from '@shared/interfaces/api-service.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements IApiService {
  constructor(private readonly httpClient: HttpClient) {}

  get(url: string, options: Object = {}): Observable<Object> {
    return this.httpClient.get(url, { ...options, withCredentials: true });
  }
  post(): void {}
  put(): void {}
  delete(): void {}
}
