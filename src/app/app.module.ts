import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, NgForm} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {ParamInterceptor} from './param-interceptor';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavigationComponent} from './navigation/navigation.component';
import {CityMapComponent} from './city-map/city-map.component';
import {RouteComponent} from './route/route.component';
import {RouterModule, Routes} from '@angular/router';

import {AddGroupComponent} from './app-group/addgroup.component';
import {AppCreateComponent} from './app-create/app-create.component';
import {GroupsService} from './services/groups.service';
import {GroupViewComponent} from './group-view/group-view.component';
import {GroupsComponent} from './groups/groups.component';
import {ViewRouteComponent} from './view-route/view-route.component';
import { UserRouteComponent } from './user-route/user-route.component';
import { YamapComponent } from './yamap/yamap.component';

export const ENVIRONMENT = new InjectionToken<{ [key: string]: any }>('environment');

const appRoutes: Routes = [
    { path: 'create-group', component: AppCreateComponent},
    { path: 'groups/:id' , component : GroupViewComponent},
<<<<<<< HEAD
    { path: 'groups' , component : GroupsComponent},
    { path: 'start' , component : CityMapComponent},
    {path: 'addRoute', component: RouteComponent},
  {path: 'viewRoute/:id', component: ViewRouteComponent},
  {path: 'myRoute/:id', component: UserRouteComponent}
];

=======
    { path: 'groups' , component : AppPublicGroupComponent},
    { path: '' , component : CityMapComponent},
    { path: 'user/groups', component : AppUserGroupsComponent }
];

import {Routes, RouterModule} from '@angular/router';

import { AddGroupComponent } from './app-group/addgroup.component';
import { AppCreateComponent } from './app-create/app-create.component';
import { FormsModule } from '@angular/forms';
import { GroupsService } from './services/groups.service';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupsComponent } from './groups/groups.component';
import { AppEntrygroupComponent } from './app-entrygroup/app-entrygroup.component';
import { AppUserGroupsComponent } from './app-user-groups/app-user-groups.component';
import { AppPublicGroupComponent } from './app-public-group/app-public-group.component';
>>>>>>> addSecurity2.0


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
<<<<<<< HEAD
    ViewRouteComponent,
    UserRouteComponent,
    YamapComponent
=======
    AppEntrygroupComponent,
    AppUserGroupsComponent,
    AppPublicGroupComponent
>>>>>>> addSecurity2.0
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
      // c84cd246-c002-4cee-8ac2-9ad5c1539388 - мой
      // 658f67a2-fd77-42e9-b99e-2bd48c4ccad4
    // AgmCoreModule.forRoot()
    /**
     * forRoot & API_KEY are optional
     * imports: [AngularYandexMapsModule]
     */
  ],
  providers: [ModalPopupComponent, LoginComponent, NgForm, GroupsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }],
  // что это такое
  bootstrap: [AppComponent]
})
export class AppModule { }
