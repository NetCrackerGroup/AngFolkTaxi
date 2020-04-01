import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chat} from "../app-chat/model/chat";
import {Message} from "../app-chat/model/message";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private ALL_CHATS_URL = "http://localhost:1337/Chats/all";
  private GET_CHATS_URL = "http://localhost:1337/Chat/";
  private ALL_MESSAGES_URL = "http://localhost:1337/Messages/chat/";
  private SEND_MESAGE_URL = "http://localhost:1337/Messages/send/";
  private GET_PAGES_URL = "http://localhost:1337/Messages/messages/";
  private Get_CHAT_BY_GROUP_URL="http://localhost:1337/Chat/findchat/"
  private GET_CHAT_BY_ROUTE_URL = "http://localhost:1337/Chat/findRouteChat/"

  constructor(private http:HttpClient) {

  }
  getAllChats(): Observable<Chat[]>{

  return this.http.get<Chat[]>(this.ALL_CHATS_URL)

 }
 getAllMessages(chatId:number): Observable<Message[]>{
    return this.http.get<Message[]>(this.ALL_MESSAGES_URL + chatId)
 }

 postMessage(chatId:number,message:Message):Observable<any>{

    let newparams:HttpParams = new HttpParams().set('text',message.text.toString());
    return this.http.post<Message>(this.SEND_MESAGE_URL + chatId, newparams);
 }


  getAllMessagesPage(chatId:number,page:number): Observable<Message[]>{
    return this.http.get<Message[]>(this.GET_PAGES_URL + chatId +"/pages?page="+page);
  }

  getChatByGroup(groupId:String): Observable<Chat> {

    return this.http.get<Chat>(this.Get_CHAT_BY_GROUP_URL + groupId);
  }
  getChatByRoute(routeId:String): Observable<Chat> {

    return this.http.get<Chat>(this.GET_CHAT_BY_ROUTE_URL + routeId);
  }

  getChat(chatId:String):Observable<Chat> {
    const url = `${environment.devUrl}/Chat/${chatId}`;
    console.log(url);

    return this.http.get<Chat>(url);
  }












  }
