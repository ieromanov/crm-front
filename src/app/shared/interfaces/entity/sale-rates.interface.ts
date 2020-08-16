import { IBase } from './base.interface';

export interface ISalePeakRate extends IBase {
  name: string;
  color: string;
  twoMovers: number;
  threeMovers: number;
  fourMovers: number;
  additionalMover: number;
  additionalTruck: number;
}
