import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/oauth/token')) {
      console.log('interseptor /oauth/token');
      const paramReq = req.clone({
        headers: req.headers.set(
          'Authorization', 'Basic ' + btoa(`spring-security-oauth2-read-client:spring-security-oauth2-read-client-password1234`),
        )
      });
      return next.handle(paramReq);
    }

    if (req.url.includes('localhost:1337')) {
      console.log('interseptor http://localhost:1337');
      const paramReq = req.clone({
        headers: req.headers.set(
          'Authorization', 'bearer ' + localStorage.getItem('auth_token')
        )
      });
      return next.handle(paramReq);
    } else {
      return next.handle(req);
    }

  }
}


