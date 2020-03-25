import {IUser} from "../../entities/iuser";
import {Chat} from "./chat";


export interface Message {
  messageId: number;
  text: string;
  chatId:number;
  dateOfSending: Date;
  user : IUser;

}
