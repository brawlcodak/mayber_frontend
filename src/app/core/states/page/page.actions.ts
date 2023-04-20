export namespace Page {
  export class GoTo {
    static readonly type: string = '[Page] GoTo';
    constructor(public url: string) {}
  }
}
