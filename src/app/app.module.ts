import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { InjectionToken } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import { NgForm} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AccViewComponent } from './acc-view/acc-view.component';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import { AccEditComponent } from './acc-edit/acc-edit.component';
import {ParamInterceptor} from './param-interceptor';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { CityMapComponent } from './city-map/city-map.component';
import { RouteComponent } from './route/route.component';
import { RateAfterJourneyComponent } from './rate-after-journey/rate-after-journey.component';

export const ENVIRONMENT = new InjectionToken<{ [key: string]: any }>('environment');

const appRoutes: Routes = [
    { path: 'create-group', component: AppCreateComponent},
    { path: 'groups/:id' , component : GroupViewComponent},
    { path: 'groups' , component : GroupsComponent},
    { path: '' , component : CityMapComponent},
    { path: 'profile', component : AccEditComponent},
    { path: 'create-route', component : RouteComponent},
    { path: 'feedback/:id', component : RateAfterJourneyComponent},
];

import {Routes, RouterModule} from '@angular/router';

import { AddGroupComponent } from './app-group/addgroup.component';
import { AppCreateComponent } from './app-create/app-create.component';
import { FormsModule } from '@angular/forms';
import { GroupsService } from './services/groups.service';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupsComponent } from './groups/groups.component';
import { AccChangeNameComponent } from './acc-change-name/acc-change-name.component';
import { AccChangePassComponent } from './acc-change-pass/acc-change-pass.component';
import { AccChangeInfoComponent } from './acc-change-info/acc-change-info.component';
import { AccChangePhoneNumberComponent } from './acc-change-phone-number/acc-change-phone-number.component';
import { AccChangeCityComponent } from './acc-change-city/acc-change-city.component';
import { AccChangeEmailComponent } from './acc-change-email/acc-change-email.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CityMapComponent,
    AddGroupComponent,
    AppCreateComponent,
    GroupViewComponent,
    GroupsComponent,
    RouteComponent,
    LoginComponent,
    ModalPopupComponent,
    AccEditComponent,
    AccViewComponent,
    AccChangeNameComponent,
    AccChangePassComponent,
    AccChangeInfoComponent,
    AccChangePhoneNumberComponent,
    AccChangeCityComponent,
    RateAfterJourneyComponent,
    AccChangeEmailComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ModalPopupComponent,
    LoginComponent,
    AccViewComponent,
    AccChangeNameComponent,
    AccChangePassComponent,
    AccChangeInfoComponent,
    AccChangePhoneNumberComponent,
    AccChangeCityComponent,
    AccChangeEmailComponent,
    NgForm,
    GroupsService,
    ReportComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }], // что это такое
  bootstrap: [AppComponent]
})
export class AppModule { }
