import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {UserService} from "../_serviceshazem/user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "../models/forum_models/message";
import { Chatroom } from '../models/forum_models/chatroom';
import {TokenStorageService} from "../_serviceshazem/token-storage.service";
import {map} from "rxjs";


declare var SockJS: any;
declare var Stomp: any;
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // Store the chat messages
  public messages = [];

  public stompClient : any ;
  token!:string;
  user!:User;

  constructor(private tokenStorageService: TokenStorageService,private userService : UserService, private http: HttpClient  ) {
    this.initializeWebSocketConnection();
  }
  get getHeaders(): HttpHeaders{
    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json; charset=UTF-8'
      }
    );
  }
  initializeWebSocketConnection() {
    /**
     * Create a SockJS server with created back-end endpoint called /chat-websocket and added it over Stomp.
     */
    const serverUrl = 'http://localhost:9090/chat-websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    /**
     * Connect stomp client and subscribe asynchronously to the chat message-handling Controller endpoint and push any message body into the messages array
     */
    this.stompClient.connect({}, function() {
      that.stompClient.subscribe('/chat/messages', (message: { body: string; }) => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          that.addMessage(obj.text, obj.username, obj.avatar , obj.sender, obj.chatid );
        }
      });
      that.stompClient.subscribe('/user/chat/private-messages', (message: { body: string; }) => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          that.addMessage(obj.text, obj.username, obj.avatar, obj.sender , obj.chatid);
        }
      });
    });
  }

  // Prepare and push the chat messages into the messages array
  addMessage(message: any, username: string, avatar: string , chatid: string , sender: string) {
    // @ts-ignore
    this.messages.push({
      "text": message,
      "date": new Date(),
      "user": {
        "name": username,
        "avatar": avatar
      },
      "chatid": chatid,
      "sender": sender


    });
  }

  // Send a chat message using stomp client
  sendMessage(msg: Message) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
  }
  sendMessagep(msg: Message) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
  }
  getchatroom(ids: string , idr: string ) {
    this.user = this.tokenStorageService.getUser()
    // @ts-ignore
    return this.http.get<Chatroom>('http://localhost:9090/chat/Chatroom/' + ids + '/' + idr )
      .pipe(map((res:any)=>{
        return res;
      }))
  };


  color(id: string , c: string) {
    this.user = this.tokenStorageService.getUser()
    // @ts-ignore
    return this.http.post<string>('http://localhost:9090/chat/color/' + id , c )
      .pipe(map((res:any)=>{
        return res;
      }))
  };





  GetAllUser() {
    this.user = this.tokenStorageService.getUser()
    return this.http.get<User[]>('http://localhost:9090/chat/ListUser/')
      .pipe(map((res:any)=>{
        return res;
      }))


  }
  allchat() {
    this.user = this.tokenStorageService.getUser()
    // @ts-ignore
    return this.http.get<Chatroom[]>('http://localhost:9090/chat/allchat' )
      .pipe(map((res:any)=>{
        return res;
      }))
  };
  GetAllChats(){
    // this.user=this.userService.getCurrentUser()
    // // @ts-ignore
    return this.http.get<Chatroom[]>("http://localhost:9090/chat/getAll" )
      .pipe(map((res:any)=>{
        return res;
      }))
  }




}
