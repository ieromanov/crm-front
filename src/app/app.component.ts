import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private readonly httpClient: HttpClient
  ) {}

  isCollapsed = false;

  public handleLogin(): void {
    window.open('http://localhost:3000/auth/login', '_self')
  }
  public handleLogout(): void {
    window.open('http://localhost:3000/auth/logout', '_self')
  }

  public createRequest() {
    this.httpClient
      .post('http://localhost:3000/request/create', {}, {
        withCredentials: true
      })
      .pipe(
        map(request => request),
        catchError(error => of(error))
      )
      .subscribe((request) => {
        console.log(request)
      })
  }
}
