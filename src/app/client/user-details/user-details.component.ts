import { Component, OnInit } from '@angular/core';
//import { User } from '../models/user.model';
import { UserService } from 'src/app/_serviceshazem/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_serviceshazem/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
/*import {User} from '../../models/user.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, Router} from '@angular/router';*/

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User = new User;
  currentUser: User = new User;
  friendList: Array<User> = [];
  currentUserFriendList: Array<User> = [];
  friendExists!: boolean;
  profilPicture!: string;
  friendInCommon: Array<User> = [];
  //theUserId!: number;
//////////////////////////////
private roles: string[] | undefined;
  isLoggedIn = false;
  constructor( private tokenStorageService: TokenStorageService,private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
       this.currentUser = this.tokenStorageService.getUser();
      this.roles = this.currentUser.roles;
    }
    /*this.route.paramMap.subscribe(() => {
      this.handleUserDetails();
    });*/
    if (this.currentUser.id !== undefined){
    this.userService.getAllFriends2(this.currentUser.id.toString()).subscribe(data => {
      this.currentUserFriendList = data;
      console.log(this.currentUserFriendList);
  });}
  //////////////////////////////////////////
  const theUserId: number = +this.route.snapshot.paramMap.get('id')!;
    if(theUserId!==undefined){
    this.userService.getUser(theUserId).subscribe(data => {
      this.user = data;
      console.log('hazem'+theUserId);
      console.log(this.user.id,this.currentUser.id);})
      
    }
    
    this.friendExists = this.currentUserFriendList.some(e => e.id === this.user.id);
    //this.friendExists = this.currentUserFriendList.map(e => e.id).includes(this.user.id);

        console.log(this.friendExists);
       
    /*if(this.user.id!==undefined){
    this.userService.getAllFriends2(this.user.id.toString()).subscribe(data => {
        this.friendList = data;});}
        console.log(this.friendList);  */ 
     //////////////////////////////////////////////// 
     if(this.currentUser.id!==undefined && this.user.id!=undefined){
      //let userId1=this.currentUser.id.toString();
       this.userService.getUsersInCommon2(this.currentUser.id.toString(),this.user.id.toString()).subscribe( data => {
        this.friendInCommon = data;
      });  
      console.log('hi'+this.friendInCommon);
     } 
   /*this.theUserId = +this.route.snapshot.paramMap.get('id')!;
   console.log(this.theUserId);*/
  }

  /*handleUserDetails(){
    const theUserId: number = +this.route.snapshot.paramMap.get('id')!;
    if(theUserId!==undefined){
    this.userService.getUser(theUserId).subscribe(data => {
      this.user = data;
      console.log('hazem'+theUserId);
      console.log(this.user.id);})
      
    }
    
    this.friendExists = this.currentUserFriendList.some(e => e.id === this.user.id);
    //this.friendExists = this.currentUserFriendList.map(e => e.id).includes(this.user.id);

        console.log(this.friendExists);
       
    if(this.user.id!==undefined){
    this.userService.getAllFriends2(this.user.id.toString()).subscribe(data => {
        this.friendList = data;});}
        console.log(this.friendList);   
     //////////////////////////////////////////////// 
     if(this.currentUser.id!==undefined && this.user.id!=undefined){
      let userId1=this.currentUser.id.toString();
       this.userService.getUsersInCommon2(userId1,this.user.id.toString()).subscribe( data => {
        this.friendInCommon = data;
      });  
      console.log(this.friendInCommon);
     } */          
        
      
    
     /* this.userService.getUserProfilPicture2(this.user.id.toString()).subscribe(pic => {
        this.profilPicture = pic.split('\\').pop();
      }, err => {
        this.profilPicture = "https://res.cloudinary.com/diubo1tzp/image/upload/v1650587140/defaultProfilePicture_drigsj.png";
      });*/

    

  

  followUser(){
    const theUserId: number = +this.route.snapshot.paramMap.get('id')!;
    console.log(theUserId)
    this.userService.getUser(theUserId).subscribe(data => {
      this.user = data;
      if(this.user.username!==undefined && this.currentUser.username){
      this.userService.followUser2(this.currentUser.username,this.user.username).subscribe();
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }});
  }

  unfollowUser(){
    const theUserId: number = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUser(theUserId).subscribe(data => {
      this.user = data;
      if(this.user.username!==undefined && this.currentUser.username){
      this.userService.unfollowUser2(this.currentUser.username,this.user.username).subscribe();
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }});
  
  }
  /*getFriendsInCommon(userId2:string){
    if(this.currentUser.id!==undefined){
    let userId1=this.currentUser.id.toString();
    return this.userService.getUsersInCommon2(userId1,userId2).subscribe( data => {
      this.friendInCommon = data;
    });
    
  }
  console.log(this.friendInCommon);
}*/
}
