import { IBase } from './base.interface';

export interface IStatus extends IBase {
  value: string
  description?: string
}