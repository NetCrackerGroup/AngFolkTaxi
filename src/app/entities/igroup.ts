import { ITypeGroup } from "./type_group"
import { IUser } from "./iuser"

export interface IGroup {
    groupId: string,
    typeGroup : ITypeGroup,
    groupName : string, 
    cityLink : string,
    users : IUser[]
}

