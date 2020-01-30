import { Component, OnInit } from '@angular/core';

import { IGroup } from "../entities/igroup";
import { GroupsService } from "../services/groups.service";
 
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  listgroups : IGroup[];

  constructor(private  groupService : GroupsService) { }

  ngOnInit() {
      this.groupService.getAllGroups().subscribe(
        res => {
          this.listgroups = res;
        },
        err => {
          alert(`Error , ${err}`);
        }
      );
  }

}
