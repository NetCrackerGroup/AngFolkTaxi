import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './main-page/navigation/navigation.component';
import { CityMapComponent } from './main-page/city-map/city-map.component';
import { RouteComponent } from './route/route.component';
import {HttpClientModule} from '@angular/common/http';
import {Router, Routes} from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CityMapComponent,
    RouteComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
