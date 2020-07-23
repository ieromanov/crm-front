import { Component } from '@angular/core';

import { ISetting } from '@shared/interfaces/setting.interface';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { SettingService } from '@core/services/setting.service';

import { SettingTypesEnum } from '@shared/enum/setting-type.enum';
import { PagingResponseDto } from '@shared/dto/paging.dto';

@Component({
  selector: 'crm-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss'],
})
export class GeneralSettingComponent {
  public formGroups: { [key: string]: FormGroup };
  public changedValues: Set<string> = new Set();
  public settings: { [key in SettingTypesEnum]?: ISetting[] } = {};
  public initialSettings: { [key: string]: ISetting } = {};
  public loading = true;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _settingService: SettingService
  ) {
    this._getSettings();
  }

  public handleSave(setting: ISetting) {
    const settingGroup: FormGroup = this.formGroups[setting.type];
    const value = settingGroup.value[setting.slug];

    this._settingService.patch(setting.id, { value }).subscribe(() => {
      this.changedValues.delete(setting.slug);
    });
  }

  public handleUndo(setting: ISetting) {
    const settingGroup: FormGroup = this.formGroups[setting.type];
    const initialSetting = this.settings[setting.type].find(
      (s) => setting.id === s.id
    );
    settingGroup.controls[setting.slug].setValue(initialSetting.value);
    this.changedValues.delete(setting.slug);
  }

  public handleChange(slug: string) {
    if (!this.changedValues.has(slug)) {
      this.changedValues.add(slug);
    }
  }

  private _getSettings() {
    this._settingService.findAll().subscribe(this._initSettingData.bind(this));
  }

  private _initSettingData({ data }: PagingResponseDto<ISetting>) {
    const settings = {};
    const formGroups: { [key: string]: FormGroup } = {};

    data.forEach((s: ISetting) => {
      if (settings.hasOwnProperty(s.type)) {
        settings[s.type].push(s);
        (formGroups[s.type] as FormGroup).addControl(
          s.slug,
          new FormControl(s.value, [Validators.required])
        );
      } else {
        settings[s.type] = [s];
        formGroups[s.type] = this._formBuilder.group({
          [s.slug]: [s.value, [Validators.required]],
        });
      }
    });

    this.settings = settings;
    this.formGroups = formGroups;

    this.loading = false;
  }
}
