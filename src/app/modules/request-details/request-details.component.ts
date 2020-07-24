import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestService } from '@core/services/request.service';

import { IRequest } from '@shared/interfaces/entity/request.interface';

@Component({
  selector: 'crm-request-details',
  templateUrl: 'request-details.component.html',
  styleUrls: ['request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  public request: IRequest;
  public loading: boolean = true;

  public get requestLoaded() {
    return this.request !== undefined;
  }

  constructor(
    private readonly _activateRoute: ActivatedRoute,
    private readonly _requestService: RequestService
  ) {}

  ngOnInit(): void {
    this._requestService
      .findById(this._activateRoute.snapshot.params.id)
      .subscribe((request) => {
        this.loading = false;
        this.request = request;
      });
  }
}
