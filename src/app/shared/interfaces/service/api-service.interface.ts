import { Observable } from 'rxjs';

export interface IApiService {
  get<T>(url: string, options?: Object): Observable<T>
  post<T, P>(url: string, body: T, options?: Object): Observable<P>
  put<T>(url: string, body: T, options?: Object): Observable<T>
  delete<T>(url: string, options?: Object): Observable<T>
}