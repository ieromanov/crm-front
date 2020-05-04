import { Observable } from 'rxjs';

export interface IApiService {
  get(url: string, options?: Object): Observable<Object>
  post<T, P>(url: string, body: T, options?: Object): Observable<P>
  put<T, P>(url: string, body: T, options?: Object): Observable<P>
  delete(url: string, options?: Object): Observable<Object>
}