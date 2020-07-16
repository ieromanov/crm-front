export type SocketResponse<T> = {
  event: string;
  data: T
}