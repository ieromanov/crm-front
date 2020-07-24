import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime',
})
export class SecondsToTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value - hours * 3600) / 60);

    return `${this._normalizeTime(hours)}:${this._normalizeTime(minutes)}`;
  }

  private _normalizeTime(value: number): string | number {
    return value < 10 ? '0' + value : value;
  }
}
