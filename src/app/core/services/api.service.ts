import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiService } from '@shared/interfaces/api-service.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements IApiService {
  private baseURL: string = environment.backend_url

  constructor(private readonly httpClient: HttpClient) {}

  get(url: string, options: Object = {}): Observable<Object> {
    return this.httpClient.get(this.baseURL + url, { ...options, withCredentials: true });
  }
  post(): void {}
  put(): void {}
  delete(): void {}
}
