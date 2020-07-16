import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { ConstantService } from '@core/services/constant.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'crm-home-type-card',
  templateUrl: 'home-type-card.component.html',
})
export class HomeTypeCardComponent {
  @Input() homeType: IHomeType;

  @Output()
  public onEdit: EventEmitter<IHomeType> = new EventEmitter<IHomeType>();
  @Output()
  public onDelete: EventEmitter<string> = new EventEmitter<string>();

  public get colorsConstants() {
    return this._constantService.colors;
  }

  public get title() {
    return this.homeType.name;
  }
  public get volume() {
    return this.homeType.volume;
  }
  public get rooms() {
    return this.homeType.rooms || []
  }
  public get hasRooms() {
    return !isEmpty(this.homeType.rooms)
  }

  public get description() {
    return this.homeType.description;
  }
  public get hasDescription() {
    return !isEmpty(this.homeType.description);
  }

  constructor(private readonly _constantService: ConstantService) {}

  public emitEdit() {
    this.onEdit.emit(this.homeType);
  }

  public emitDelete() {
    this.onDelete.emit(this.homeType.id);
  }
}
