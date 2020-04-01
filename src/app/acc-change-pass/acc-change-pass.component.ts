import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {TempSetrService} from '../tempServices/temp-setr.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-acc-change-pass',
  templateUrl: './acc-change-pass.component.html',
  styleUrls: ['./acc-change-pass.component.css']
})
export class AccChangePassComponent implements OnInit {

  visibility = false;

  oldPassword  = '';
  password  = '';
  newPassword = '';
  form : NgForm;

  constructor(private userService : UserService,
              form: NgForm,
              private router : Router) {
     this.form = form;
  }

  Submited(form: NgForm) {
    console.log('you are changing your password');
    if ( this.oldPassword.trim().length == 0) {
      alert("Заполните поле \"старый пароль\" ");
    }
    else if ( this.password.trim().length == 0) {
      alert("Заполните поле \"текущий пароль\" ");
    }
    else if ( this.newPassword.trim().length == 0) {
      alert("Заполните поле \"новый пароль\" ");
    }
    else if ( !(this.newPassword === this.newPassword) ) {
      alert(" Пароли не совпадают! ");
    }
    else{
      this.userService.updateUserPassword(this.oldPassword, this.password);
      this.visibility = false;
      this.router.navigate(['/profile']);
    }

  }
  ngOnInit() {
  }

  OpenPopup() {
   this.visibility = true;
  }

  toggle() {
    this.visibility = false;
  }

}
