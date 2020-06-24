import { Component, forwardRef, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { Address } from '@shared/types/address.type';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import isNil from 'lodash/isNil'

@Component({
  selector: 'crm-address-input',
  templateUrl: 'address-input.component.html',
  styleUrls: ['address-input.component.scss'],
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressInputComponent),
    multi: true
   }]
})
export class AddressInputComponent implements ControlValueAccessor {
  public zipCode: number
  public address: string = ''
  public city: string = ''
  public state: string = ''
  public numberOfFloor: number = 0
  public withElevator = true

  public withElevatorCheckboxDisabled = true

  public get value(): Address {
    return {
      zipCode: this.zipCode,
      address: this.address,
      city: this.city,
      state: this.state,
      numberOfFloor: this.numberOfFloor
    }
  }
  public set value(value: Address) {
    this.zipCode = value.zipCode
    this.address = value.address
    this.city = value.city
    this.state = value.state
    this.numberOfFloor = value.numberOfFloor
  }

  writeValue(value: Address): void {
    if (!isNil(value)) {
      this.value = value
    }
  }
  registerOnChange(fn: (address: Address) => void): void {
    this._onChange = fn
  }
  registerOnTouched(fn: any): void {}

  public onZipCodeChanged(event: InputEvent) {
    this.zipCode = +this._getValueFromEvent(event)
    this._onChange(this.value)
  }
  public onAddressChanged(event: InputEvent) {
    this.address = this._getValueFromEvent(event)
    this._onChange(this.value)
  }
  public onCityChanged(event: InputEvent) {
    this.city = this._getValueFromEvent(event)
    this._onChange(this.value)
  }
  public onStateChanged(event: InputEvent) {
    this.state = this._getValueFromEvent(event)
    this._onChange(this.value)
  }
  public onNumberOfFloorChanged(event: InputEvent) {
    this.numberOfFloor = +this._getValueFromEvent(event)
    if (this.numberOfFloor === 0) {
      this.withElevator = false
      this.withElevatorCheckboxDisabled = true
    } else {
      this.withElevatorCheckboxDisabled = false
    }
    this._onChange(this.value)
  }
  
  public validate({ value }: FormControl) {
    const isNotValid = true
    return isNotValid && {
      invalid: true
    }
  }

  private _getValueFromEvent(event: Event): string {
    const target: HTMLInputElement = event.target as HTMLInputElement
    return target.value
  }

  private _onChange(address: Address): void {}
}
