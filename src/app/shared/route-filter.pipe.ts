import { Pipe, PipeTransform } from '@angular/core';
import { IRoute } from '../entities/iroute';

@Pipe({
  name: 'routeFilter',
  pure: false
})
export class RouteFilterPipe implements PipeTransform {
  transform(routes: IRoute[], filter: number): any{


    var filterFunctions = [
    function byDistUp(r1: IRoute, r2: IRoute){
      if(r1.distance < r2.distance){
        return -1;
      }
      else{
        return 1;
      }
    }
    ,
    function byDistDown(r1: IRoute, r2: IRoute){
      if(r1.distance < r2.distance){
        return 1;
      }
      else{
        return -1;
      }
    }
    ,
    function byPriceUp(r1: IRoute, r2: IRoute){
      if(r1.price < r2.price){
        return -1;
      }
      else{
        return 1;
      }
    }
    ,
    function byPriceUp(r1: IRoute, r2: IRoute){
      if(r1.price < r2.price){
        return 1;
      }
      else{
        return -1;
      }
    }
    ,
    function byOptimality(r1: IRoute, r2: IRoute){
      if(r1.optimality < r2.optimality){
        return -1;
      }
      else{
        return 1;
      }
    }
  ]


    return routes.sort(filterFunctions[filter]);

  }
}
