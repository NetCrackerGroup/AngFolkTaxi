import { Component, OnInit } from '@angular/core';
import { IGroup } from '../entities/igroup';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-app-public-group',
  templateUrl: './app-public-group.component.html',
  styleUrls: ['./app-public-group.component.css']
})
export class AppPublicGroupComponent implements OnInit {

  listgroups : IGroup[];

  constructor(private groupService : GroupsService) { }

  ngOnInit() {
    this.groupService.getAllGroups().subscribe(
      res => {
        console.log("response in method : getAllGroups");
        this.listgroups = res;
      },
      err => {
        console.log(`Error , ${err}`);
      }
    );
  }

}
