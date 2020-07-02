import { OrderTypeEmum } from '@shared/enum/order-type.enum';

export interface PagingRequestDto<T> {
  readonly limit: number;
  readonly page: number;
	readonly order?: { [P in keyof T]?: OrderTypeEmum };
}

export interface PagingResponseDto<T> {
  readonly data: T[];
  readonly total: number;
}
