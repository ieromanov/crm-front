export interface UpdatePasswordDTO {
  token?: string,
  id?: string;
  newPassword: string;
}
