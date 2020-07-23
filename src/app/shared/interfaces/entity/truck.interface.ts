import { IBase } from './base.interface';
import { ISetting } from '../setting.interface';

export interface ITruck extends IBase {
  name: string;
  description?: string;
  active: boolean;
  volume: number;
}
