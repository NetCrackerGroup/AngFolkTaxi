import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {FormsModule, NgForm} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {ParamInterceptor} from './param-interceptor';
import {RouteComponent} from './route/route.component';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    ModalPopupComponent,
    RouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularYandexMapsModule.forRoot('c84cd246-c002-4cee-8ac2-9ad5c1539388')
      // c84cd246-c002-4cee-8ac2-9ad5c1539388 - мой
      // 658f67a2-fd77-42e9-b99e-2bd48c4ccad4
    // AgmCoreModule.forRoot()
    /**
     * forRoot & API_KEY are optional
     * imports: [AngularYandexMapsModule]
     */
  ],
  providers: [ModalPopupComponent, LoginComponent, NgForm,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }],
  // что это такое
  bootstrap: [AppComponent]
})
export class AppModule { }
