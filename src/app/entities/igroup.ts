import { ITypeGroup } from './type_group';
import { IUser } from './iuser';

export interface IGroup {
    groupId: number;
    typeGroup: ITypeGroup;
    groupName: string;
    groupLink: string;
    users: IUser[];
}

