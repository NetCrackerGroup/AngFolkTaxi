import {IUser_moderator} from './iuser_moderator'


export interface IComplain{
  complainId : number;
  user: IUser_moderator;
  adresat: IUser_moderator;
  text: string;
}
