import {environment} from '../../../environments/environment';

export class EndPoints {

  static uri(url: string): string {
    return environment.url_api + url;
  }

  static uriBase(url: string): string {
    return environment.url_base + url;
  }
}
