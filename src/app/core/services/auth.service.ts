import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_SERVICE } from '@core/di-tokens';
import { IApiService } from '@shared/interfaces/service/api-service.interface';
import { UserInfo } from '@shared/types/user-info.type';
import { LoginPayload } from '@shared/interfaces/login-payload.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    @Inject(API_SERVICE)
    private readonly _apiService: IApiService
  ) {}
  
  login(email: string, password: string): Observable<UserInfo> {
    return this._apiService.post<LoginPayload, UserInfo>('auth/login', { email, password })
  }

  logout() {
    return this._apiService.get('auth/logout')
  }
}