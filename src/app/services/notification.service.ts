import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { NotificationApp } from '../entities/notification';
import { Observable } from 'rxjs';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { 
  }

  getCountTopicNotification() { 
    const url = `${environment.devUrl}/notification/topic`;
    console.log(url);

    return this.http.get(url);
  }

  getCurrentlyNotifactions() : Observable<Array<NotificationApp>>
   {
    const url = `${environment.devUrl}/notification/currently`;
    console.log(url);

    return this.processData(this.http.get(url));
  }

  getAllNotifications() : Observable<Array<NotificationApp>> {
    const url = `${environment.devUrl}/notification/all`;
    console.log(url);
  
    return this.processData(this.http.get(url));
  }

  private processData(data : Observable<any> ) : Observable<Array<NotificationApp>> {
    return data.pipe( map(
      data => {
        console.log("map");
        let notifs = data["response"] as Array<any>;
        let result : Array<NotificationApp> = new Array(notifs.length);
        let temp : NotificationApp;
        let subject : string;
        let text : string;
        for ( let i : number = 0; i < notifs.length; i++) {
          subject = notifs[i].infoContent.subject;
          temp = new NotificationApp(subject);
          let date : Date = new Date(notifs[i].timestamp);
          temp.date = date;
          let templatevalues : Array<string> = notifs[i].templatevalues as Array<string>;
          text = notifs[i].infoContent.text;
          let fragment : Array<string> = text.split("$$$");
          for ( let j = 0; j < fragment.length; j++ ) {
            if ( j % 2 == 0) 
              continue;
            for( let k = 0; k < templatevalues.length; k++) {
              let part : string[] = templatevalues[k]
                                      .split(":")
                                      .map(x => x.trim());
              if (fragment[j].trim() == part[0].trim()) {
                fragment[j] = part[1];
                break;
              }
            }
          }
          temp.text = fragment.map(x => x.trim()).join(" ").trim();
          result[i] = temp;
        }
        return result;
      }
    )
    );
  }

}
