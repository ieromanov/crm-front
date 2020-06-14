import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-not-found',
  templateUrl: 'not-found.component.html',
  styleUrls: ['not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private readonly _router: Router) {}

  public goToHome(): void {
    this._router.navigate(['/'])
  }
}
