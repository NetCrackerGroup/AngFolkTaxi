import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "./model/message";
import {Chat} from "./model/chat";
import {ApiService} from "../shared/api.service";
import {GroupsService} from "../services/groups.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {IUser} from "../entities/iuser";
import {IRoute} from "../entities/iroute";
import {IGroup} from "../entities/igroup";
import{GroupViewComponent} from "../group-view/group-view.component";

@Component({
  selector: 'app-app-chat',
  templateUrl: './app-chat.component.html',
  styleUrls: ['./app-chat.component.css']
})
export class AppChatComponent implements OnInit {
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

  messages: Message[] = [];
  public pages:Array<any>;
  chats: Chat[] = [];
  public page:number=0;
  chattId:string;

  groupId:string;
  private subscription: Subscription;

  constructor(private apiService: ApiService,private route: ActivatedRoute) {
    //this.getAllMessagesPage(this.chatId);


   }
  @Input() chatId:number;

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.getAllMessagesPage(this.chatId);
  }

  ngOnInit() {
    //console.log(this.chatId);
   // this.chatId = this.GroupViewComponent.chatId

     /*this.subscription = this.route.params.subscribe(params=>{
    this.apiService.getChat(params['chatId']).subscribe(
        res => {
          console.log(res["chatId"]);
          this.chatId =  res["chatId"];
          console.log(this.model.chatId);
          console.log(this.chatId);

          this.getAllMessagesPage(params['chatId']);

        },
        // console.log(this.chat)},
        err => {
          alert("Чат не найден")
        })})*/
    this.getAllMessagesPage(this.chatId);
  }

  ngOnChanges(){
    console.log(this.chatId);
    this.getAllMessagesPage(this.chatId);

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

        this.messages.push(Newmes)
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
}
export interface Message {
  messageId: number;
  text: string;
  chatId: number;
  dateOfSending: Date;
  user : IUser;


}



