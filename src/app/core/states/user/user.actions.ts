import { IReportError } from "../../interfaces/ireport_error.interface";
import { IUser } from "../../interfaces/iuser.interface";

export namespace User {
  export class ReportError {
    static readonly type: string = '[User] Report Error';
    constructor(public data: IReportError) {}
  }
  export class SetUser {
    static readonly type: string = '[User] Set User';
    constructor(public user: IUser) {}
  }
  export class ConsultToken {
    static readonly type: string = '[User] Consult Token';
    constructor(public token: string) {}
  }
  export class GetAllUsers {
    static readonly type: string = '[User] Get All';
  }
}
