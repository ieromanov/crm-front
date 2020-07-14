import { Component, forwardRef, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import { Subject, Subscription } from 'rxjs';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { GeoService } from '@core/services/geo.service';
import { Address } from '@shared/types/address.type';

@Component({
  selector: 'crm-address-input',
  templateUrl: 'address-input.component.html',
  styleUrls: ['address-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputComponent),
      multi: true,
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor, OnDestroy {
  public placeId: string;
  public address: string;
  public numberOfFloor: number = 0;
  
  public withElevator = false;
  public withElevatorCheckboxDisabled = true;

  public addressInputUpdate = new Subject<string>();
  public addressIsSearching = false;
  public addresses = [];
  private _addressInputUpdateSub: Subscription;

  public get value(): Address {
    return {
      placeId: this.placeId,
      address: this.address,
      numberOfFloor: this.numberOfFloor,
      withElevator: this.withElevator
    };
  }
  public set value(value: Address) {
    this.placeId = value.placeId;
    this.address = value.address;
    this.numberOfFloor = value.numberOfFloor;
    this.withElevator = value.withElevator
  }

  constructor(private readonly _geoService: GeoService) {
    this._addressInputUpdateSub = this.addressInputUpdate
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(this._getAddressesByInput.bind(this));
  }
  ngOnDestroy() {
    this._addressInputUpdateSub.unsubscribe();
  }

  writeValue(value: Address): void {
    if (!isNil(value)) {
      this.value = value;
    }
  }
  registerOnChange(fn: (address: Address) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {}

  public onAddressChange(placeId: string) {
    if (isEmpty(placeId)) {
      this.address = null
    } else {
      const address = this.addresses.find((address) => address.place_id === placeId)
      this.address = address.description
    }
    this._onChange(this.value);
  }
  public onAddressSearch(value: string) {
    this.addressInputUpdate.next(value);
  }
  public onNumberOfFloorChanged(event: InputEvent) {
    this.numberOfFloor = +this._getValueFromEvent(event);
    if (this.numberOfFloor === 0) {
      this.withElevator = false;
      this.withElevatorCheckboxDisabled = true;
    } else {
      this.withElevatorCheckboxDisabled = false;
    }
    this._onChange(this.value);
  }
  public onWithElevatorChanged() {
    this.withElevator = !this.withElevator
    this._onChange(this.value)
  }

  private _getValueFromEvent(event: Event): string {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    return target.value;
  }

  private _getAddressesByInput(input: string) {
    if (input.length > 3) {
      this.addressIsSearching = true;
      this._geoService.place(input).subscribe((data: any) => {
        this.addresses = data.status === 'OK' ? data.predictions : []
        this.addressIsSearching = false;
      });
    }
  }

  private _onChange(address: Address): void {}
}
