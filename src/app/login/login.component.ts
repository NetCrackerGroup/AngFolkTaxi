import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TempSetrService} from '../tempServices/temp-setr.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

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
              private tempService: TempSetrService,
              private router: Router) {

  }
  Submited(form: NgForm) {
    console.log('you are logging in');
    this.authService.login(this.email, this.password);
    this.visibility = false;
    this.router.navigate(['']);
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
  loginWithGoogle(){
    this.router.navigate(['/login/google']);
  }
}
