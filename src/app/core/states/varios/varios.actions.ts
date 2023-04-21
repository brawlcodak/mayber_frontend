import { EVarios } from "../../enums/varios.enum";
import { INotification } from "../../interfaces/inotification.interface";

export namespace Varios {
  export class NotificationError {
    static readonly type: string = '[Varios] NotificationError';
    constructor(public notification: INotification) {}
  }

  export class Default {
    static readonly type: string = '[Varios] Default';
    constructor(public fns?: EVarios) {}
  }
}
