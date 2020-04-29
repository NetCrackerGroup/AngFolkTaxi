import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { UserService } from '../services/user.service';
import {TempSetrService} from '../tempServices/temp-setr.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {BlockedErrorComponent} from "../blocked-error/blocked-error.component";

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
              private router: Router,
              private userService: UserService) {

  }
  Submited(form: NgForm) {
    console.log('you are logging in');
    this.authService.login(this.email, this.password);
    /*this.userService.getUserImageForNav().subscribe(
    res => {
      if(res['userImageSource'] == null){
        this.imageSwitch = false;
        console.log(res['userImageSource']);
        }
      else{
        this.image = 'data:image/jpeg;base64,' + res['userImageSource'];
        console.log("xxxxxxxxxx" + res['userImageSource']);
        }
    },
    err => {
      //alert("Изображение не найдено!");
    });*/

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
