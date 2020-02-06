import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';
import {AuthService} from './services/auth.service';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('/oauth/token') || req.url.includes('/users/sign-up')) {
      console.log('interseptor /oauth/token');
      const paramReq = req.clone({
        headers: req.headers.set(
          'Authorization', 'Basic ' + btoa(`spring-security-oauth2-read-client:spring-security-oauth2-read-client-password1234`),
        )
      });
    } else {
      if (req.url.includes('localhost:1337')) {
        console.log('interseptor http://localhost:1337');
        const paramReq = req.clone({
          headers: req.headers.set(
            'Authorization', 'bearer ' + localStorage.getItem('auth_token')
          )
        });

      }
    }
    console.log('intercept');
    console.log(localStorage.getItem('refresh_token'));
    return next.handle(this.addTokenHeader(req))
      .pipe(
        catchError(error => {
          return this.handleHttpError(req, next, error);
        })
      );
  }
  private queueRequest(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('queueRequest');
    return this.tokenSubject$.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(req)))
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler, error: any) {
    console.log('handle401');
    if (this.isAuthenticatedRequest(req)) {
      return (!this.isRefreshingToken) ? this.refreshToken(req, next) : this.queueRequest(req, next);
    } else {
      this.throwError(error);
    }
  }

  private handle400(req: HttpRequest<any>, error: any) {
    console.log('handle400');
    return this.isAuthenticatedRequest(req) ? this.logout(error) : this.throwError(error);
  }

  private addTokenHeader(req: HttpRequest<any>): HttpRequest<any> {
    // tslint:disable-next-line:max-line-length
    console.log('addTokenHeader');
    console.log(`addTokenHeader ${localStorage.getItem('auth_token')}`);
    // tslint:disable-next-line:max-line-length
    return this.isAuthenticatedRequest(req) ? req.clone({setHeaders: {Authorization: 'bearer ' + localStorage.getItem('auth_token')}}) : req;
  }

  private isAuthenticatedRequest(req: HttpRequest<any>) {
    const checks: boolean[] = [
      req.url.endsWith('/oauth/token'),
      req.url.startsWith('/assets')
    ];
    return checks.every(urlCheck => urlCheck === false);
  }

  private logout(error: any): Observable<any> {
    console.log('logout');
    this.authService.logout();
    return this.throwError(error);
  }

  // @ts-ignore
  private throwError(error: any): Observable<ErrorObservable> {
    console.log('throwError');
    return Observable.throw(error);
  }

  private refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log('refreshToken');
    this.isRefreshingToken = true;
    this.tokenSubject$.next(null);
    console.log('refreshToken');
    return this.authService.refreshToken()
      .pipe(
        switchMap((newToken: any) => {
          this.tokenSubject$.next(newToken);
          return next.handle(this.addTokenHeader(req));
        }),
        catchError(error => this.logout(error)),
        finalize(() => this.isRefreshingToken = false)
      );
  }

  private handleHttpError(req: HttpRequest<any>, next: HttpHandler, error: any): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
          return this.handle400(req, error);
        case 401:
          return this.handle401(req, next, error);
        default:
          return this.throwError(error);
      }
    } else {
      return this.throwError(error);
    }
}}
