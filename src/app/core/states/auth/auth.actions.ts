import { ILogin, IUser } from "../../interfaces/iuser.interface";

export namespace Auth {
  export class Login {
    static readonly type: string = '[Auth] Login';
    constructor(public user: ILogin) {}
  }
  export class Register {
    static readonly type: string = '[Auth] Register';
    constructor(public user: IUser) {}
  }
}
