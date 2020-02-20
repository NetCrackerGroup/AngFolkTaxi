import { Component, OnInit } from '@angular/core';
import {GroupsService} from '../services/groups.service';
import {IGroup} from '../entities/igroup';
import {IRoute} from '../entities/iroute';
import {RoutesService} from '../services/routes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  listGroups: IGroup[] = null;
  listDriverRoutes: IRoute[] = null;

  constructor(private  groupService: GroupsService, private routeService: RoutesService) { }

  ngOnInit() {
    if (this.isReg()) {
      // Нужно переделать под конкретный id пользователя
      this.groupService.getUserGroups('oskar2016@gmail.com').subscribe(
        res => {
          this.listGroups = res;
        },
        err => {
          console.log(`Error , ${err}`);
        }
      );

      this.routeService.getDriverRoutes('oskar2016@gmail.com').subscribe(
        res => {
          this.listDriverRoutes = res;
        },
        err => {
          console.log(`Error , ${err}`);
        }
      );
    }


  }

  isReg(): boolean {
    return true;
  }

}
