import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserInfo } from '@shared/types/user-info.type';
import { LoginPayload } from '@shared/interfaces/login-payload.interface';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly _apiService: ApiService
  ) {}
  
  login(email: string, password: string): Observable<UserInfo> {
    return this._apiService.post<LoginPayload, UserInfo>('auth/login', { email, password })
  }

  logout() {
    return this._apiService.get('auth/logout')
  }
}