import { IBase } from './base.interface';
import { ISetting } from '../setting.interface';

export interface IRoom extends IBase, ISetting {
  volume: number,
}