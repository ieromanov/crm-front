import { IBase } from './base.interface';
import { ISetting } from '../setting.interface';

export interface IStatus extends IBase {
  name: string;
  description?: string;
  active: boolean;
}
