import { Component, OnInit } from '@angular/core';
import { NotificationApp } from '../entities/notification';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications : Array<NotificationApp>;

  constructor(private notificationService: NotificationService ) { 
    this.notificationService.getAllNotifications().subscribe(
      res => {
        this.notifications = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
  }

}
