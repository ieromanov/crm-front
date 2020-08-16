import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorChromeModule } from 'ngx-color/chrome';

import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';

import { ColorPickerComponent } from './color-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ColorChromeModule],
  exports: [ColorPickerComponent],
  declarations: [ColorPickerComponent, ClickOutsideDirective],
})
export class ColorPickerModule {}
