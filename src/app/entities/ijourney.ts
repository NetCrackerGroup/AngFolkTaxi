import { IPassenger } from '../entities/ipassenger';

export interface IJourney{
  journeyId : number,
  routeId : number,
  driverId : number,
  driverName : string,
  passengers : IPassenger[];
}
