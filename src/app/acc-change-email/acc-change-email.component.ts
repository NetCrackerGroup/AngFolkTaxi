import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {TempSetrService} from '../tempServices/temp-setr.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-acc-change-email',
  templateUrl: './acc-change-email.component.html',
  styleUrls: ['./acc-change-email.component.css']
})
export class AccChangeEmailComponent implements OnInit {

  visibility = false;

  newEmail = '';
  currPassword  = '';
  form : NgForm;

  constructor(private userService : UserService,
              form: NgForm,
              private router : Router) {
     this.form = form;
  }

  Submited(form: NgForm) {
    console.log('you are changing your email');
    if ( this.newEmail.trim().length == 0) {
      alert("Заполните поле \"новая эл. почта\" ");
    }
    else if ( this.currPassword.trim().length == 0) {
      alert("Заполните поле \"текущий пароль\" ");
    }
    else{
      this.userService.updateUserEmail(this.newEmail, this.currPassword);
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
