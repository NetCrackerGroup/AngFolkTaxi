import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { InjectionToken } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import { NgForm} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {ParamInterceptor} from './param-interceptor';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { CityMapComponent } from './city-map/city-map.component';
import { RouteComponent } from './route/route.component';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

export const ENVIRONMENT = new InjectionToken<{ [key: string]: any }>('environment');

const appRoutes: Routes = [
    { path: 'create-group', component: AppCreateComponent},
    { path: 'groups/:id' , component : GroupViewComponent},
    { path: 'groups' , component : GroupsComponent},
    { path: 'find-route' , component: FindRouteComponent},
    { path: '' , component : CityMapComponent},
    { path: 'find-route/show-routes' , component: RoutesListComponent}
];

import {Routes, RouterModule} from '@angular/router';

import { AddGroupComponent } from './app-group/addgroup.component';
import { AppCreateComponent } from './app-create/app-create.component';
import { FormsModule } from '@angular/forms';
import { GroupsService } from './services/groups.service';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupsComponent } from './groups/groups.component';
import {FindRouteComponent} from './find-route/find-route.component';
import { RoutesListComponent } from './routes-list/routes-list.component';


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
    RoutesListComponent
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
  providers: [ModalPopupComponent, LoginComponent, NgForm, GroupsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }], // что это такое
  bootstrap: [AppComponent]
})
export class AppModule { }
