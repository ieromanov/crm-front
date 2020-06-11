import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { LoginPayload } from '@shared/interfaces/login-payload.interface';
import {
  UserActionTypes,
  loginSuccessAction,
  loginFailAction,
  getUserInfoSuccessAction,
  getUserInfoFailAction,
  logoutSuccessAction,
  logoutFailAction,
} from './user.action';

@Injectable()
export class UserEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _userService: UserService
  ) {}

  login$ = createEffect(() =>
    this._actions$.pipe<LoginPayload, any>(
      ofType(UserActionTypes.login),
      mergeMap(({ email, password }: LoginPayload) =>
        this._authService.login(email, password).pipe(
          map(userInfo => loginSuccessAction(userInfo)),
          catchError(() => of(loginFailAction()))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this._actions$.pipe<any, any>(
      ofType(UserActionTypes.loginSuccess),
      tap(() => this._router.navigate(['/']))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this._actions$.pipe<LoginPayload, any>(
      ofType(UserActionTypes.logout),
      mergeMap(() =>
        this._authService.logout().pipe(
          map(() => logoutSuccessAction()),
          catchError(() => of(logoutFailAction())),
        )
      )
    )
  );

  logoutSuccess$ = createEffect(() =>
    this._actions$.pipe<any, any>(
      ofType(UserActionTypes.logoutSuccess),
      tap(() => this._router.navigate(['/auth/login']))
    ),
    { dispatch: false }
  );

  getUserInfo$ = createEffect(() =>
    this._actions$.pipe<any, any>(
      ofType(UserActionTypes.getUserInfo),
      mergeMap(() =>
        this._userService.getUserInfo().pipe(
          map((userInfo) => getUserInfoSuccessAction(userInfo)),
          catchError(() => of(getUserInfoFailAction()))
        )
      )
    )
  );
}
