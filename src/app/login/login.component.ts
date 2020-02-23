import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TempSetrService} from '../tempServices/temp-setr.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  visibility = false;

  constructor(private authService: AuthService,
              private tempService: TempSetrService) {

  }
  Submited(form: NgForm) {
    console.log('you are logging in');
    this.authService.login(this.email, this.password);
    this.visibility = false;
  }
  ngOnInit() {
    this.tempService.change2.subscribe((tempUser) => {
      this.visibility = true;
      this.email = tempUser.email;
      this.password = tempUser.password;
    });
  }
  toggle() {
    this.visibility = false;
  }
  OpenPopup() {
    this.visibility = true;
  }
}