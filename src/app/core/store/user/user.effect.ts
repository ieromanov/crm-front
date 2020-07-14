import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  map,
  catchError,
  tap,
  concatMap,
} from 'rxjs/operators';
import { of, concat } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { LoginPayload } from '@shared/interfaces/login-payload.interface';

import { startLoadingAction, finishLoadingAction } from '../app/app.action';
import {
  loginAction,
  loginSuccessAction,
  loginFailAction,
  getUserInfoAction,
  getUserInfoSuccessAction,
  getUserInfoFailAction,
  logoutSuccessAction,
  logoutFailAction,
  logoutAction,
} from './user.action';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _userService: UserService
  ) {}

  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loginAction),
      mergeMap(({ email, password }: LoginPayload) =>
        this._authService.login(email, password).pipe(
          map((userInfo) => loginSuccessAction(userInfo)),
          catchError((error: HttpErrorResponse) => {
            if (error instanceof HttpErrorResponse) {
              return of(loginFailAction({ error: error.error.message }))
            } else {
              return of(loginFailAction({ error: 'Unknown error' }))
            }
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
      this._actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => this._router.navigate(['/']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logoutAction),
      mergeMap(() =>
        this._authService.logout().pipe(
          map(() => logoutSuccessAction()),
          catchError(() => of(logoutFailAction()))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(() =>
      this._actions$.pipe(
        ofType(logoutSuccessAction),
        tap(() => this._router.navigate(['/auth/login']))
      ),
    { dispatch: false }
  );

  getUserInfo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getUserInfoAction),
      concatMap(() => concat(
          of(startLoadingAction()),
          this._userService.getUserInfo().pipe(
            map(userInfo => getUserInfoSuccessAction(userInfo)),
            catchError(() => of(getUserInfoFailAction()))
          ),
          of(finishLoadingAction()),
        )
      )
    )
  );

  getUserInfoFail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getUserInfoFailAction),
      map(() => finishLoadingAction())
    )
  )
}
