import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Chat} from "./model/chat";
import {ApiService} from "../shared/api.service";
import {GroupsService} from "../services/groups.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {IUser} from "../entities/iuser";
import {IRoute} from "../entities/iroute";
import {IGroup} from "../entities/igroup";
import{GroupViewComponent} from "../group-view/group-view.component";
import {AccViewComponent} from '../acc-view/acc-view.component';

@Component({
  selector: 'app-app-chat',
  templateUrl: './app-chat.component.html',
  styleUrls: ['./app-chat.component.css']
})
export class AppChatComponent implements OnInit {

  @ViewChild('component2', {static: false})
  accViewComponent: AccViewComponent;

  model: Message = {
    messageId: null,
    text: '',
    dateOfSending: null,
    chatId: null,
    user :{ userId : null,
             fio : '',
             email : '',
             phoneNumber : ''}

  };

  imageSwitch : boolean = true;
  messages: Message[] = [];
  public pages:Array<any>;
  chats: Chat[] = [];
  public page:number=0;
  chattId:string;

  groupId:string;
  private subscription: Subscription;
  private interval;

  constructor(private apiService: ApiService,private route: ActivatedRoute, private router: Router) {
    //this.getAllMessagesPage(this.chatId);


   }
  @Input() chatId:number;

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.getAllMessagesPage(this.chatId);
  }

  ngOnInit() {

    if(this.chatId!=null)
      this.getAllMessagesPage(this.chatId);
  }

  ngOnChanges(){
    console.log(this.chatId);
    if(this.chatId!=null){
      this.getAllMessagesPage(this.chatId);}
    const newThis = this;
    if(newThis.chatId!=null)

      setInterval(function(){newThis.apiService.getAllMessagesPage(newThis.chatId,newThis.page).subscribe(data=>{
        newThis.messages= data['content'];
        newThis.pages = new Array(data['totalPages'])
      })}, 3000,newThis.chatId);

  }
  ngOnDestroy(){
    if(this.interval){
      clearInterval(this.interval);
    }
  }


  public getAllMessages(ChatId: number ) {

    this.apiService.getAllMessages(ChatId).subscribe(
      res => {
        this.messages = res;
      },
      err => {
        alert("An error has occured;")
      }
    );
  }

  public getpageMessages(){

  }

  public getAllMessagesPage(chatId:number) {


    this.apiService.getAllMessagesPage(chatId,this.page).subscribe(
      data=>{
        this.messages= data['content'];
        this.pages = new Array(data['totalPages'])
        console.log(this.messages);
      },
      (error)=>{
        console.log(this.messages);
        alert("error")

      }
    );

  }




  public sendMessage(chatId: number ) {



    this.model.dateOfSending = new Date();
    this.apiService.postMessage(chatId, this.model).subscribe(
      res => {
        //this.model.messageId = res['messageId'];
        //this.model.text = res['text'];
       // this.model.dateOfSending= res['dateOfSending'];
       // this.model.user = res['user'];
        console.log(res['messageId']);

        let Newmes:Message = {
          messageId : res['messageId'],
            text: res['text'],
          dateOfSending: res['dateOfSending'],
          chatId: this.model.chatId,
          user: res['user']
        };

        this.messages.push(Newmes);
       this.model.text='';
      },
      err => {
        alert("An error has occured;")

      });


  }

  /*public getChatbyGroup(groupId:String) {
    this.apiService.getChatByGroup(groupId).subscribe(
      res => {
        this.model.chatId = res.chatId;
      },
      err => {
        alert("An error has occured;")
      }
    );
  }

*/
  MessageClick(event) {
    this.messages.forEach(mes => {
      if (+mes.messageId === +event.target.id && mes.user.fio  === 'Система' && mes.text === 'Оцените Маршрут' ) {
        //открывается попапс возможностью проголосовать
        console.log('Открылся попап');
        // @ts-ignore
        this.apiService.getJourneyByRouteMessage(mes.chat.chatId, mes.dateOfSending).subscribe( res => {
          console.log('getJourneyByRouteMessage', res);
          this.router.navigate(['feedback', +res]);
        });
      }
    });
  }

  isPointer(text) {

    return text === 'Оцените Маршрут';
  }
}
export interface Message {
  messageId: number;
  text: string;
  chatId: number;
  dateOfSending: Date;
  user : IUser;


}



