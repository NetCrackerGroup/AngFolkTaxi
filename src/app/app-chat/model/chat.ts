import {IRoute} from "../../entities/iroute";
import {IGroup} from "../../entities/igroup";

export interface Chat {
  chatId:number;
  route:IRoute;
  group:IGroup;


}
