import { Component, OnInit } from '@angular/core';
import { IGroup } from '../entities/igroup';
import { GroupsService } from '../services/groups.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-app-public-group',
  templateUrl: './app-public-group.component.html',
  styleUrls: ['./app-public-group.component.css']
})
export class AppPublicGroupComponent implements OnInit {

  listgroups : IGroup[];

  constructor(private groupService : GroupsService) { }

  ngOnInit() {
    console.log("Public groups");
    this.groupService.getAllGroups().subscribe(
      res => {
        console.log("response in method : getAllGroups");
        this.listgroups = res;
      },
      err => {
        console.log("2112");
        console.log(`Error , ${throwError(err)}`);
      }
    );
  }
}
