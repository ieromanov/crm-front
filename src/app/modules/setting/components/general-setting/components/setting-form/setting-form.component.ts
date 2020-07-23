import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ISetting } from '@shared/interfaces/setting.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'crm-setting-form',
  templateUrl: 'setting-form.component.html',
})
export class SettingFormComponent {
	@Input() formGroup: FormGroup
	@Input() settings: ISetting[]
	@Input() slugsChangedValues: Set<string>

	@Output() onSave: EventEmitter<ISetting> = new EventEmitter<ISetting>()
	@Output() onUndo: EventEmitter<ISetting> = new EventEmitter<ISetting>()
	@Output() onChange: EventEmitter<string> = new EventEmitter<string>()

	save(setting: ISetting) {
		this.onSave.emit(setting)
	}
	undo(setting: ISetting) {
		this.onUndo.emit(setting)
	}
	change(slug: string) {
		this.onChange.emit(slug)
	}
}
