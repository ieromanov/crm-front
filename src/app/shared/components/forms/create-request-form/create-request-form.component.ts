import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'crm-create-request-form',
  templateUrl: 'create-request-form.component.html'
})

export class CreateRequestFormComponent implements OnInit {
  @Input() public request = null
  public serviceTypes = []
  public houses = []
  public rooms = []

  public form: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({});
  }
}