import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Helper } from '../helper/helper.component';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(
    private _helper: Helper
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    const token = await this._helper.getStoragePromise('token');
    let customHeaders;

    if (token && req.url.indexOf('/api/') > 1) {
      customHeaders = this.generateHeaders(req, token);
    } else {
      customHeaders = this.generateHeaders(req);
    }

    return next.handle(customHeaders).pipe(
      catchError(((e: any) => {
        if (e.status === 401 || e.status === 403) {
          /* this.store.dispatch(new LogoutAction()); */

        }
        return throwError(e);
      }))
    ).toPromise();
  }

  /**
   * @description genera customHeaders segun platform
   */
  private generateHeaders(req: HttpRequest<any>, token?): HttpRequest<any> {
    let customHeaders;
    if (token) {
            customHeaders = req.clone({
                headers: req.headers
                    .set('Content-Type', 'application/json')
                    .append('Authorization', `Bearer ${token}`)
                    .append('Accept', 'application/json')
            });

    } else {
        customHeaders = req.clone({
            headers: req.headers
        });
    }
    return customHeaders;
}
}
