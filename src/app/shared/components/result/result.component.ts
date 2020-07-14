import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'crm-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.scss'],
})
export class ResultComponent implements OnDestroy {
  public status: string
  public title: string
  public subtitle: string
  private _activeRouteSub: Subscription

  constructor(
    private readonly _router: Router,
    private readonly _activeRouter: ActivatedRoute
  ) {
    this._activeRouteSub = this._activeRouter.data.subscribe(({ status, title, subtitle }) => {
      this.status = status
      this.title = title
      this.subtitle = subtitle
    })
  }

  ngOnDestroy(): void {
    this._activeRouteSub.unsubscribe()
  }

  public goToHome(): void {
    this._router.navigate(['/'])
  }
}
