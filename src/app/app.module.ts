import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AngularYandexMapsModule} from 'angular8-yandex-maps';

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
import { RouteFilterPipe } from './shared/route-filter.pipe';



import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { CityMapComponent } from './city-map/city-map.component';
import { RouteComponent } from './route/route.component';
import { RateAfterJourneyComponent } from './rate-after-journey/rate-after-journey.component';
import {UserRouteComponent} from "./user-route/user-route.component";
import {YamapComponent} from "./yamap/yamap.component";


export const ENVIRONMENT = new InjectionToken<{ [key: string]: any }>('environment');

const appRoutes: Routes = [
  {
    path: 'Chats/:chatId',
    component: AppChatComponent
  },
    { path: 'create-group', component: AppCreateComponent},
    { path: 'groups/:id' , component : GroupViewComponent},
    { path: 'profile', component : AccEditComponent},
    { path: 'create-route', component : RouteComponent},
    { path: 'feedback/:id', component : RateAfterJourneyComponent},
    { path: 'find-route' , component: FindRouteComponent},
    { path: 'show-routes' , component: RoutesListComponent},
    {path: 'start', component : CityMapComponent},
    {path: 'addRoute', component: RouteComponent},
    {path: 'viewRoute/:id', component: ViewRouteComponent},
    {path: 'myRoute/:id', component: UserRouteComponent},
    { path: 'groups' , component : AppPublicGroupComponent},
    { path: '' , component : FindRouteComponent},
    { path: 'user/groups', component : AppUserGroupsComponent },
    { path : 'notifications' , component : NotificationsComponent}
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
import { AppEntrygroupComponent } from './app-entrygroup/app-entrygroup.component';
import { AppUserGroupsComponent } from './app-user-groups/app-user-groups.component';
import { AppPublicGroupComponent } from './app-public-group/app-public-group.component';
import {AppChatComponent} from "./app-chat/app-chat.component";
import {ViewRouteComponent} from "./view-route/view-route.component";


import {FindRouteComponent} from './find-route/find-route.component';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { InviteUserToGroupComponent } from './invite-user-to-group/invite-user-to-group.component';
import { NotificationsComponent } from './notifications/notifications.component';
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
    FindRouteComponent,
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
    AppChatComponent,
    ModalPopupComponent,
    RoutesListComponent,
    ViewRouteComponent,
    UserRouteComponent,
    YamapComponent,
    AppEntrygroupComponent,
    AppUserGroupsComponent,
    AppPublicGroupComponent,
    InviteUserToGroupComponent,
    RouteFilterPipe,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    AngularYandexMapsModule.forRoot('c84cd246-c002-4cee-8ac2-9ad5c1539388')
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
