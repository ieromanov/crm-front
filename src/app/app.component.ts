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
  public items = [1, 2, 3, 4]
  public isCollapsed = false;

  public handleLogout(): void {
    window.open('http://localhost:3000/api/auth/logout', '_self')
  }
}
