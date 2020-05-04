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

  get(url: string, options: Object = {}): Observable<Object> {
    return this.httpClient
      .get(this._baseURL + url, { ...options, withCredentials: true });
  }

  delete(url: string, options: Object = {}): Observable<Object> {
    return this.httpClient
      .delete(this._baseURL + url, { ...options, withCredentials: true })
  }

  post<T, P>(url: string, body: T, options: Object = {}): Observable<P> {
    return this.httpClient
      .post(this._baseURL + url, body, { ...options, withCredentials: true }) as Observable<P>
  }
  put<T, P>(url: string, body: T, options: Object = {}): Observable<P> {
    return this.httpClient
      .put(this._baseURL + url, body, { ...options, withCredentials: true }) as Observable<P>
  }
}
