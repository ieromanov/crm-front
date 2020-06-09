import { Injectable } from '@angular/core';
import { IConstantService } from '@shared/interfaces/service/constant-service.interface';

@Injectable()
export class ConstantService implements IConstantService {
  private _colors = {
    danger: '#f5222d',
    success: '#52c41a'
  }

  public get colors() {
    return this._colors
  }
}
