import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-entrygroup',
  templateUrl: './entrygroup.component.html',
  styleUrls: ['./entrygroup.component.css']
})
export class EntrygroupComponent implements OnInit {

  private link : string;
  addCompletion : boolean = true;
  userMember : boolean = false;
  groupNotFind : boolean = false;
  userNotAuth : boolean = false;

  constructor(private groupService : GroupsService, 
    private route: ActivatedRoute,
    private router : Router) { 

      console.log("dsa");

      this.route.params.subscribe( 
        params => {
          console.log("inside");
          groupService.addUserToGroupWithinLink(params["link"]).subscribe(
            (res) => {
              console.log(res);
              if (res["status"] == "success") {
                router.navigate( ['/groups', res["groupId"]] );
              }
              if (res["status"] == "failure" && res["message"] == "Не авторизован" ) {
                this.addCompletion = false;
                this.userNotAuth = true;
              }
              console.log(res["status"] == "failure");
              console.log(res["message"] == "Группа не найдена");
              if (res["status"] == "failure" && res["message"] == "Группа не найдена") {
                this.addCompletion = false;
                this.groupNotFind = true;
              }
              if (res["status"] == "failure" && res["message"] == "Пользователь уже участник") {
                this.userMember = true;
                this.addCompletion = false;
              }
            },
            (err) => {
              console.log(err);
            }
          )
        }
      );
      console.log("create!");
  }

  ngOnInit(): void {
    console.log("create!");
  }

}
