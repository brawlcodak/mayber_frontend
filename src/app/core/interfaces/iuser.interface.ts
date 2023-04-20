import { ILicense } from "./ilicense.interface";

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  "re-password"?: string;
  email?: string;
  date?: string;
  login_date?: string;
}

export interface IUsersResponses {
  user: IUser,
  license: ILicense
}

export interface ILogin {
  username: string;
  password: string;
}
