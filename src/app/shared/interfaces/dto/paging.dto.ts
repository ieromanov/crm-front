import { OrderTypeEmum } from '@shared/enum/order-type.enum';

export interface PagingRequestDto<T> {
  readonly take: number;
  readonly skip: number;
  readonly order?: { [P in keyof T]?: OrderTypeEmum };
}

export interface PagingResponseDto<T> {
  readonly items: T[];
  readonly total: number;
}
