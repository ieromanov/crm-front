import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import isNil from 'lodash/isNil';

@Component({
  selector: 'crm-color-picker',
  templateUrl: 'color-picker.component.html',
  styleUrls: ['color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent implements ControlValueAccessor {
  public isDisabled: boolean;
  public showColorPicker: boolean;
  private _color: string;

  public get value(): string {
    return this._color;
  }
  public set value(color: string) {
    this._color = color;
  }

  writeValue(value: string): void {
    if (!isNil(value)) {
      this.value = value;
    }
  }
  registerOnChange(fn: (color: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {}

//   setDisabledState?(isDisabled: boolean): void {
//     this.isDisabled = isDisabled;
//   }

  public handleChange({ color }: ColorEvent) {
    this._onChange(color.hex);
  }

  public handleClickOutside() {
    this.showColorPicker = false;
  }

  toggleShowColorPicker() {
    this.showColorPicker = !this.showColorPicker;
  }

  private _onChange(color: string): void {}
}
