import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get('http://localhost:3000/request/all', {
        withCredentials: true
      })
      .pipe(
        catchError((error) => of(error))
      )
      .subscribe(requests => {
        console.log('requests: ', requests);
      });
  }
}
