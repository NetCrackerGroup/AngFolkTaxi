import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-acc-change-info',
  templateUrl: './acc-change-info.component.html',
  styleUrls: ['./acc-change-info.component.css']
})
export class AccChangeInfoComponent implements OnInit {

  visibility = false;
  newInfo : string = "";
  form : NgForm;
  numLock : number = 100;

  constructor(private userService : UserService,
              form: NgForm,
              private router : Router) {
     this.form = form;
  }

  Submited(form: NgForm) {
    console.log('you are changing your info ');
    if ( this.newInfo.match( /^(\s+)/g ) != null )
      this.newInfo = " ";
    this.userService.updateUserInfo(this.newInfo);
    this.visibility = false;
    this.numLock = 100;
    this.router.navigate(['/profile']);
  }

  ngOnInit() {
  }

  OpenPopup(info : string) {
    this.newInfo = info;
    if (info != null)
      this.numLock -= info.length;
    this.visibility = true;
  }

  onInput(){
    this.numLock = 100 - this.newInfo.length;
  }

  onKeydown() {
    this.numLock = 100 - this.newInfo.length;
  }

  toggle() {
    this.visibility = false;
    this.numLock = 100;
  }
}
