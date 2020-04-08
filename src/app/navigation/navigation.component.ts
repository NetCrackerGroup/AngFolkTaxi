import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../services/user.service';
import {GroupsService} from '../services/groups.service';
import {IGroup} from '../entities/igroup';
import {IRoute} from '../entities/iroute';
import {RoutesService} from '../services/routes.service';
import {ModalPopupComponent} from '../modal-popup/modal-popup.component';
import {LoginComponent} from '../login/login.component';
import {TempSetrService} from '../tempServices/temp-setr.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
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

  countNotifications: number;

  listGroups: IGroup[] = null;
  listDriverRoutes: IRoute[] = null;
  url = environment.devUrl;

  logged = false;

  private routeService: RoutesService;
  @ViewChild(ModalPopupComponent, {static: false})
   modalPopupComponent: ModalPopupComponent;

  @ViewChild(LoginComponent, {static: false})
   loginComponent: LoginComponent;

  authService: AuthService;
  tempSetrService: TempSetrService;
   http: HttpClient;

  userCheck : Boolean;

  private userEmail: string = null;
  private userService;
  constructor(private  groupService: GroupsService, routeService: RoutesService, authService: AuthService,

              tempSetrService: TempSetrService, http: HttpClient,
              loginComponent: LoginComponent, userService: UserService,
              private notificationService : NotificationService) {
    this.loginComponent = loginComponent;
    this.authService = authService;
    this.tempSetrService = tempSetrService;
    this.http = http;
    this.routeService = routeService;
    this.userService = userService;
  }


  ngOnInit() {
    console.log('navigationOnInit');
    // this.change2.subscribe((tempUser) => {
    //   this.visibility = true;
    //   this.email = tempUser.email;
    //   this.password = tempUser.password;
    // });
    if (this.isReg()) {
      // Нужно переделать под конкретный id пользователя
      // this.groupService.getUserGroups('alex@alex.com').subscribe(
      //   res => {
      //     this.listGroups = res;
      //   },
      //   err => {
      //     // alert(`Error , ${err}`);
      //   }
      // );

      this.routeService.getDriverRoutes().subscribe(
        res => {
          console.log(res);
          this.listDriverRoutes = res['count'];
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
          this.notificationService.getCountTopicNotification().subscribe(
            (res) => {
              console.log(res);
              this.countNotifications = res['count'];
            },
            (err) => {
              console.log(err);
            }
          );
        },
        3000
      );
    }
  }

  currentlyNotificains() : void {
    this.notificationService.getCurrentlyNotifactions().subscribe(
      res => {
        console.log(res);
        this.notifications = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  isReg(): boolean {
    return this.authService.logIn;

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
