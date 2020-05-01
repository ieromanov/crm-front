import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isCollapsed: boolean = false;

  constructor() {}

  public toggleMenuCollapsed():void {
    this.isCollapsed = !this.isCollapsed
  }
}
