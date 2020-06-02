import { Observable } from 'rxjs';

export interface IApiService {
  get<T>(url: string, options?: Object): Observable<T>
  post<T>(url: string, body: T, options?: Object): Observable<T>
  put<T>(url: string, body: T, options?: Object): Observable<T>
  delete<T>(url: string, options?: Object): Observable<T>
}