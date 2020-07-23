import { IBase } from './base.interface';
import { IRoom } from './room.interface';
import { ISetting } from '../setting.interface';

export interface IHomeType extends IBase {
  name: string;
  description?: string;
  active: boolean;
  volume: number;
  rooms: IRoom[];
}
