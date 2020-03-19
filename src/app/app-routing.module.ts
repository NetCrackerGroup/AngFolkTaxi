import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {RouteComponent} from "./route/route.component";


const routes: Routes = [
  { path: '', component: AppComponent},
  {path: 'addRoute', component: RouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
