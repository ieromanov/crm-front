import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
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

  post<T, P>(url: string, body: T, options: Object = {}): Observable<P> {
    return this.httpClient
      .post<P>(this._baseURL + '/' + url, body, options)
  }

  put<T>(url: string, body: T, options: Object = {}): Observable<T> {
    return this.httpClient
      .put<T>(this._baseURL + '/' + url, body, options)
  }

  patch<T>(url: string, body: Partial<T>, options: Object = {}): Observable<T> {
    return this.httpClient
      .patch<T>(this._baseURL + '/' + url, body, options)
  }
}
