import { IBase } from './entity/base.interface';
import { SettingTypesEnum } from '@shared/enum/setting-type.enum';

export interface ISetting extends IBase {
  name: string;
  value: string;
  slug: string;
  type: SettingTypesEnum;
  description?: string;
  active: boolean;
}
