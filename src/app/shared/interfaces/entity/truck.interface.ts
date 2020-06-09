import { IBase } from './base.interface';
import { ISetting } from '../setting.interface';

export interface ITruck extends IBase, ISetting {
  volume: number
}