import { Component, OnInit } from '@angular/core';
//import { User } from '../models/user.model';
import { UserService } from 'src/app/_serviceshazem/user.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_serviceshazem/token-storage.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
//import { Notifications } from '../models/notifications.models';
import { AuthService } from 'src/app/_serviceshazem/auth.service';
import { User } from 'src/app/models/user.model';
import { Notifications } from 'src/app/models/notifications.model';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  currentUser: User = new User;
  allUsers: Array<User> = [];
  friendList: Array<User> = [];
  friendSuggestionList: Array<User> = [];
  friendInCommon: Array<User> = [];
  /*myPosts: Array<Post> = [];
  allPosts: Array<Post> = [];
  allEvents: Array<Event> = [];
  allCourses: Array<Course> = [];*/
  //allOffers: Array<> = []
  private roles: string[] | undefined;
  isLoggedIn = false;
  profilPicture!: string;
  test:User=new User;
  //////////////////////////////
  notificationList: Array<Notifications> = [];
  /////////////////////////////////
  password!: string ;
  confirmPassword!: string ;
  errorMessage: string = "";
  constructor(private tokenStorageService: TokenStorageService,private userService: UserService,private authenticationService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.currentUser= this.tokenStorageService.getUser(); 
      this.roles = this.currentUser.roles;
      console.log(this.currentUser.id);
  }
  if (this.currentUser.id !== undefined) {
    this.userService.getAllFriends2(this.currentUser.id.toString()).subscribe((Response: User[]) => {
      this.friendList = Response;
      console.log(this.friendList);

    },
    (error:HttpErrorResponse)=>{alert(error.message)}
    );
    this.userService.getSuggestedFriends3(this.currentUser.id.toString()).subscribe((Response: User[]) => {
      this.friendSuggestionList = Response;
      console.log(this.friendSuggestionList);
    },
    (error:HttpErrorResponse)=>{alert(error.message)}
    );
    this.userService.getNotifications2(this.currentUser.id.toString()).subscribe(data => {
      this.notificationList = data;
    });
  }
  /*this.userService.getUserProfilPicture().subscribe(xx => {
    this.profilPicture = xx.split('\\').pop();
  }, err => {
    this.profilPicture = "https://res.cloudinary.com/diubo1tzp/image/upload/v1650587140/defaultProfilePicture_drigsj.png";
  });

  this.userService.getAllUsers().subscribe(users => {
    this.allUsers = users;
  });*/

  this.userService.getUser(2).subscribe(data => {
    this.test = data;});
    console.log(this.test);
    console.log(this.currentUser);


}
getFriendsInCommon3(userId2:string){
  /*userId1=this.currentUser.id.toString();
  return this.userService.getUsersInCommon2(userId1,userId2).subscribe( data => {
    this.friendInCommon = data;
  });*/
}

navigateTo(userId: string){
  const url = `user/profil/${userId}`;
  console.log(url);
  this.router.navigate([url])
      .then(() => {
        window.location.reload();
      });
}
markAsRead(notifId: number){
  this.userService.markNotificationAsRead(notifId).subscribe();
  let currentUrl = this.router.url;
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([currentUrl]);
}

markAsUnRead(notifId: number){
  this.userService.markNotificationAsUnRead(notifId).subscribe();
  let currentUrl = this.router.url;
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([currentUrl]);
}

updatePassword(){
  if (this.currentUser.id !== undefined) {
  this.authenticationService.updatePassword( this.currentUser.id.toString(),this.password).subscribe( data => {
          this.router.navigate(['/login']).then(() => {
              window.location.reload();
          });
  }, err => {
      if (err?.status === 406){
          this.errorMessage = 'Password must:\n\tHave 8 or more characters' +
              '\n\tContain 1 or more uppercase characters' +
              '\n\tContain 1 or more digit characters\n\tContain 1 or more special characters';
        }
      }
      );}

console.log(this.password,this.currentUser);
}}
