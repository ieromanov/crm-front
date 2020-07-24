import { IHomeType } from '@shared/interfaces/entity/home.interface';
import { ITruck } from "@shared/interfaces/entity/truck.interface";
import { IStatus } from "@shared/interfaces/entity/status.interface";
import { IServiceType } from "@shared/interfaces/entity/service-type.interface";
import { IRoom } from '@shared/interfaces/entity/room.interface';
import { UserInfo } from '@shared/types/user-info.type';
import { Address } from '@shared/types/address.type';

export interface IRequest {
  number: number;

  client: UserInfo;

  leadScore: number;

  moveDate: Date;

  pickupStartTime: Date;
  pickupEndTime: Date;
  pickupWorkTime: Date;

  travelTimeInSeconds: number;

  movers: UserInfo[];

  trucks: ITruck[];

  rate: number;

  status: IStatus;

  serviceType: IServiceType;

  home: IHomeType;

  extraRooms: IRoom[];

  origin: Address;

  destination: Address;

  salesNotes?: string;

  foremanNotes?: string;

  clientNotes?: string;

  dispatchNotes?: string;

  salesWeight: number;

  assignedManager: UserInfo;
}