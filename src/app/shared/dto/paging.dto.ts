export interface PagingRequestDto<T> {
  readonly limit: number;
  readonly page: number;
}

export interface PagingResponseDto<T> {
  readonly data: T[];
  readonly total: number;
  readonly count: number;
  readonly page: number;
  readonly pageCount: number;
}
