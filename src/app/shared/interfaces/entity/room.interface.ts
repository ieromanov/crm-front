import { IBase } from './base.interface';
import { ISetting } from '../setting.interface';

export interface IRoom extends IBase {
  name: string;
  description?: string;
  active: boolean;
  volume: number;
}
