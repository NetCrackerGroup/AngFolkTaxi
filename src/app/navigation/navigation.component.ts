import {Component, OnInit, ViewChild} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import {GroupsService} from '../services/groups.service';
import {IGroup} from '../entities/igroup';
import {IRoute} from '../entities/iroute';
import {RoutesService} from '../services/routes.service';
//import {ModalPopupComponent} from '../modal-popup/modal-popup.component';
import {LoginComponent} from '../login/login.component';
import {TempSetrService} from '../tempServices/temp-setr.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {ModeratorComponent} from '../moderator/moderator.component'
import { NotificationService } from '../services/notification.service';
import { NotificationApp } from '../entities/notification';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  testAPO : string;
  notifications : Array<NotificationApp>;
  //notification : AppNotification
  isShowNotifications : boolean = false;
  countNotifications: number;

  listGroups: IGroup[] = null;
  listDriverRoutes: IRoute[] = null;
  url = environment.devUrl;

  private userService: UserService;
  private routeService: RoutesService;
  //@ViewChild(ModalPopupComponent, {static: false})
  //modalPopupComponent: ModalPopupComponent;

  @ViewChild(LoginComponent, {static: false})
   loginComponent: LoginComponent;

  authService: AuthService;
  tempSetrService: TempSetrService;
  http: HttpClient;

  image: string = "";
  imageSwitch: boolean = true;
  userCheck : Boolean;
  admin : Boolean;
  result: Boolean;


  private userEmail: string = null;

  constructor(private  groupService: GroupsService, routeService: RoutesService, authService: AuthService,

              tempSetrService: TempSetrService, http: HttpClient,
              loginComponent: LoginComponent,  userService: UserService,
              private notificationService : NotificationService,
              private titleService: Title
              ) {
    this.loginComponent = loginComponent;
    this.authService = authService;
    this.tempSetrService = tempSetrService;
    this.http = http;
    this.routeService = routeService;
    this.userService = userService;
    this.isAdmin();
    this.titleService.setTitle( 'FolkTaxi' );
  }


  ngOnInit() {

    // this.change2.subscribe((tempUser) => {
    //   this.visibility = true;
    //   this.email = tempUser.email;
    //   this.password = tempUser.password;
    // });
      // Нужно переделать под конкретный id пользователя
      // this.groupService.getUserGroups('alex@alex.com').subscribe(
      //   res => {
      //     this.listGroups = res;
      //   },
      //   err => {
      //     // alert(`Error , ${err}`);
      //   }
      // );
      this.userService.getUserImageForNav().subscribe(
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
      });

      this.routeService.getDriverRoutes().subscribe(
        res => {
          console.log(res);
          this.listDriverRoutes = res;
        },
        err => {
           // alert(`Error , ${err}`);
           alert(`Error , ${err}`);
          console.log(`Error , ${err}`);
        }
      );
      this.notificationService.getCountTopicNotification().subscribe(
        (res) => {
          console.log(res);
          this.countNotifications = res['count'];
        },
        (err) => {
          console.log(err);
        }
      );

      setInterval(
        () => {
          if (this.isReg()) {
            this.getCurrentNumberNotifications();
          }
        },
        2000
      );
  }


  getCurrentNumberNotifications () {
    this.notificationService.getCountTopicNotification().subscribe(
      (res) => {
        this.countNotifications = res['count'];
        if (this.countNotifications != 0 && !this.isShowNotifications) {
          this.isShowNotifications = true;
        }
        if (this.countNotifications == 0 && this.isShowNotifications) {
          this.isShowNotifications = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  currentlyNotificains() : void {
    this.notificationService.getCurrentlyNotifactions().subscribe(
      res => {
        console.log(res);
        this.notifications = res;
        this.getCurrentNumberNotifications();
      },
      err => {
        console.log(err);
      }
    )
  }

  isReg(): boolean {
    return this.authService.logIn;
  }



  isRegAdmin(): boolean{

    this.result  = false;
    if(this.isReg){
      if(this.admin)
        this.result = true;
    }


    return this.result.valueOf();
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

  getUserRoutes() {
    console.log('получил');
    this.routeService.getDriverRoutes().subscribe(
      res => {
        console.log(res);
        this.listDriverRoutes = res;
      },
      err => {
        // alert(`Error , ${err}`);
        alert(`Error , ${err}`);
        console.log(`Error , ${err}`);
      }
    );
  }



}
