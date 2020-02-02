import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TempSetrService} from '../tempServices/temp-setr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  asd = '';

  constructor(private authService: AuthService) {

  }
  Login() {
    console.log('you are logging in');
    this.authService.login(this.email, this.password);
  }

  ngOnInit() {

  }





}
