import { Injectable } from '@angular/core';
import { io,Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  token:string = '';
  constructor() {
    this.socket = io('http://localhost:80/',{withCredentials:true,auth:{token:this.token}})
   }
   createAccount<T>(data:any):Promise<T>{
    return new Promise<T>((resolve,reject)=>{
      this.socket.emit('createAccount',data,(res:T)=>{
        resolve(res);
      });
    })
   }
}
