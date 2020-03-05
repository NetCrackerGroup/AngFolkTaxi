import { Component, OnInit } from '@angular/core';

import { IGroup } from '../entities/igroup';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupsComponent implements OnInit {

  flag : boolean;
  listgroups: IGroup[];

  constructor(private  groupService: GroupsService) { }

  ngOnInit() {
    this.flag = true;
    this.loadgroups(this.flag);
  }

  onClick(event : any) {
    this.flag = !this.flag;
    this.loadgroups(this.flag);
    event.disable();
  }
  // Mood - 
  private loadgroups(mood : boolean) {
    if(mood) {
      this.groupService.getAllGroups().subscribe(
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
