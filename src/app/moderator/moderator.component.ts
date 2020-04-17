import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service'
import {IUser} from '../entities/iuser';
import {IUser_moderator} from '../entities/iuser_moderator';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  listUsers: IUser_moderator[] = null;
  admin : boolean;

  constructor(private userService : UserService) {
    userService.getAllUserswithComplain().subscribe(res => {
        this.listUsers = res;
      },
      err => {
        alert("An error has occured;")
      })
  }

  ngOnInit(): void {
  }
  public isAdmin(){
    this.userService.CheckUserIsAdmin().subscribe((res) => {
        console.log(res);
        this.admin = res["isAdmin"];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public getAllUsers(){
    this.userService.getAllUserswithComplain().subscribe(res => {
        this.listUsers = res;
      },
      err => {
        alert("An error has occured;")
      })
  }
  public handleResponse(){
    this.listUsers = [];
    this.getAllUsers();
  }
   public deleteUser(user: IUser_moderator){
    this.userService.deleteUser(user.userId).subscribe(res=>
    {this.handleResponse()},
      err=>{ alert("An error has occured")})
    
    
   }
   public setBan(user: IUser_moderator){
    this.userService.Ban(user.userId).subscribe(
      res=>{
        user.isBan = res["isBan"];
      },
      err=>{ alert("Ban error")}
    );
   }






}
