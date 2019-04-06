import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CONFIG_FIXTURE } from './config-mock';

@Injectable()
export class ConfigHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let body = {};
    let status = 404;

    const hasMatchedRequest = !!(
      request.url.match(/\/assets\/config\/mock-config.json$/i) && request.method === 'GET'
    );
    if (hasMatchedRequest) {
      body = CONFIG_FIXTURE;
      status = 200;
    }

    const response = new HttpResponse({
      body,
      status,
    });
    if (response) {
      return new Observable(resp => {
        resp.next(response);
        resp.complete();
      });
    } else {
      return next.handle(request);
    }
  }
}
