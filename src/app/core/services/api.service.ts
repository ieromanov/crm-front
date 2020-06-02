import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements IApiService {
  private readonly _baseURL: string = environment.backend_url

  constructor(private readonly httpClient: HttpClient) {}

  get<T>(url: string, options: Object = {}): Observable<T> {
    return this.httpClient
      .get<T>(this._baseURL + '/' + url, options);
  }

  delete<T>(url: string, options: Object = {}): Observable<T> {
    return this.httpClient
      .delete<T>(this._baseURL + '/' + url, options)
  }

  post<T>(url: string, body: T, options: Object = {}): Observable<T> {
    return this.httpClient
      .post<T>(this._baseURL + '/' + url, body, options)
  }
  put<T>(url: string, body: T, options: Object = {}): Observable<T> {
    return this.httpClient
      .put<T>(this._baseURL + '/' + url, body, options)
  }
}
