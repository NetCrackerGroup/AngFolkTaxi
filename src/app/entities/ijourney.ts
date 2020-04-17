import { IUserRate } from './iuserrate';

export interface IJourney{
  journeyId : number,
  routeId : number,
  driverId : number,
  driverName : string,
  passengers : IUserRate[];
}
