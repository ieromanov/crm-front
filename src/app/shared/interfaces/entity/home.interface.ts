import { IBase } from './base.interface';
import { IRoom } from './room.interface';
import { ISetting } from '../setting.interface';

export interface IHomeType extends IBase, ISetting {
  volume: number
  rooms: IRoom[]
}