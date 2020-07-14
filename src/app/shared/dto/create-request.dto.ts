import { Address } from '@shared/types/address.type';
import { UserInfo } from '@shared/types/user-info.type';

interface ICreateRequest {
  emailControl: string,
  firstNameControl: string,
  lastNameControl: string,
  phoneControl: string,
  serviceTypeControl: string,
  statusControl: string,
  moveDateControl: Date,
  homeControl: string,
  extraRoomsControl: string[],
  originControl: Address
  destinationControl: Address
}

export class CreateRequestDTO {
  constructor(createRequest: ICreateRequest) {
    this.client = {
      email: createRequest.emailControl,
      firstName: createRequest.firstNameControl,
      lastName: createRequest.lastNameControl,
      phone: createRequest.phoneControl,
    };

    this.serviceTypeId = createRequest.serviceTypeControl;
    this.statusId = createRequest.statusControl;
    this.moveDate = createRequest.moveDateControl
    this.homeId = createRequest.homeControl,
    this.extraRooms = createRequest.extraRoomsControl,
    this.origin = createRequest.originControl
    this.destination = createRequest.destinationControl
  }

  client: UserInfo;

  moveDate: Date;

  statusId: string;

  serviceTypeId: string;

  homeId: string;

  extraRooms: string[];

  origin: Address;

  destination: Address;
}
