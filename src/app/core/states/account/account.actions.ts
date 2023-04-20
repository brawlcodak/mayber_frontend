import { ILicense, ILicenseType } from "../../interfaces/ilicense.interface";
import { IPayPayload } from "../../interfaces/ipay.interface";

export namespace Account {
  export class GetLicensesType {
    static readonly type: string = '[Account] Get Licenses Types';
  }
  export class GetLicensesTypeByUser {
    static readonly type: string = '[Account] Get Licenses Types by User';
    constructor(public user_id: number) {}
  }
  export class AddLicense {
    static readonly type: string = '[Account] Add License';
    constructor(public license: ILicense) {}
  }
  export class AddFreeLicense {
    static readonly type: string = '[Account] Add Free License';
    constructor(public license: ILicense) {}
  }
  export class UpdateLicense {
    static readonly type: string = '[Account] Update';
    constructor(public license: ILicense) {}
  }
  export class LicenseForPay {
    static readonly type: string = '[Account] License For Pay';
    constructor(public license: ILicenseType) {}
  }
  export class AddPayReport {
    static readonly type: string = '[Account] Add Pay Report';
    constructor(public payload: IPayPayload) {}
  }
  export class GetAllPayReports {
    static readonly type: string = '[Account] Get All Pay Reports';
  }
  export class GetAllPayReportsByUser {
    static readonly type: string = '[Account] Get All Pay Reports By User';
    constructor(public user_id: number) {}
  }
  export class AddBlackList {
    static readonly type: string = '[Account] Add Black List';
    constructor(public ip: string) {}
  }
  export class ResponseReportPay {
    static readonly type: string = '[Account] Response Report Pay';
    constructor(public data: IPayPayload) {}
  }
  export class GetBlackIp {
    static readonly type: string = '[Account] Get Black Ip';
    constructor(public ip: string) {}
  }
}
