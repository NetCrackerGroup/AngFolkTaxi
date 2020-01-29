import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "./model/message";
import {Chat} from "./model/chat";

@Component({
  selector: 'app-app-chat',
  templateUrl: './app-chat.component.html',
  styleUrls: ['./app-chat.component.css']
})
export class AppChatComponent implements OnInit {
  messages: Message[] = [];
  chats: Chat[] =[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllMessages();
  }
  public getAllMessages(ChatId: number=1){
    let url ="http://localhost:1337/Chat/chat" + ChatId;
    this.http.get<Message[]>(url).subscribe(
      res=> {
        this.messages = res;
      },
      err => {
        alert("An error has occured;")
      }
    );
  }
  public getAllChats(){
    let url ="http://localhost:1337/Chat/all/" ;
    this.http.get<Chat[]>(url).subscribe(
      res=> {
        this.chats = res;
      },
      err => {
        alert("An error has occured;")
      }
    );

  }

}

