
export interface UserDTO{
  email: string;
  password: string;
}

export interface UserRO {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  token?: string;
}
