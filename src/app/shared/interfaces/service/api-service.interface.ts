import { Observable } from 'rxjs';

export interface IApiService {
  get: (url: string, options?: Object) => Observable<Object>
  post: () => void
  put: () => void
  delete(url: string, options?: Object): Observable<Object>
}