export interface User {
  id: number;
  username: string;
  email: string;
}

export interface FriendUser{
  id:number;
  username:string;
  isFriend?:boolean;
}
