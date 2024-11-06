import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../_serviceshazem/user.service";
import {TokenStorageService} from "../../../_serviceshazem/token-storage.service";
import {Message} from "../../../models/forum_models/message";
import {ChatService} from "../../../Forum_services/chat.service";

class Chatroom {
}

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {
  messages: string;
  username: string = '';
  theme: string = '';
  avatar: string = '';
  currentUser: User = new User();
  m: string;
  a: string;
  email!: string;
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user !: User;
  msgForm: FormGroup;
  public chatroom: Chatroom[]=[];

  @Input('m')
  set setsender(value: string) {
    this.m = value;
  }
  @Input('a')
  set setreciver(value: string) {
    this.a = value;
  }


constructor(private tokenStorageService: TokenStorageService,public chatService: ChatService, private authenticationService: UserService , private fb: FormBuilder) {
   this.user= this.tokenStorageService.getUser();

}
ngOnInit(): void {
  console.log(this.username)
  console.log(this.a, this.m);
  this.authenticationService.getAllUsers().subscribe(res =>{
    this.users=res
    console.log(this.users)

  })
  this.msgForm = this.fb.group({
    postTitle: '',
  });
  this.user= this.tokenStorageService.getUser();
  this.chatService.GetAllChats()
    .subscribe(res=>{
      this.chatroom = res;
      console.log(this.chatroom)
    })

}

// Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
sendMessage(event: any, avatar: string) {
  let obj: Message = {
    text: this.messages,
    avatar: avatar,
    username: this.user= this.tokenStorageService.getUser().username.toString(),
    sender: '0',
    idchat: '0'
  };
  console.log(this.a, this.m);

  this.chatService.sendMessage(obj);
}
}
