import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IGroup } from '../entities/igroup';


@Component({
  selector: 'app-app-user-groups',
  templateUrl: './app-user-groups.component.html',
  styleUrls: ['./app-user-groups.component.css']
})
export class AppUserGroupsComponent implements OnInit {

  flag : boolean;
  listgroups : IGroup[];

  constructor( private userService : UserService) { 
  }

  ngOnInit() {
    this.flag = true;
    this.loadgroups(this.flag);
  }

  onClick(event : any) {
    this.flag = !this.flag;
    this.loadgroups(this.flag);
    event.disable();
  }

  private loadgroups(mood : boolean) {
    if(mood) {
      this.userService.getUserGroups().subscribe(
        res => {
          this.listgroups = res;
        },
        err => {
          console.log(`Error , ${err}`);
        }
      );
    }
  }

}
