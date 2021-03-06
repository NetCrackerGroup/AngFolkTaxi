import { IUserRoute } from './iuser-route';

export interface IRoute {
  routeId: number;
  routeBegin: number[];
  routeEnd: number[];
  price: number;
  userRouteDto: IUserRoute;
  distance: number;
  optimality: number;
  groupId: number;
}
