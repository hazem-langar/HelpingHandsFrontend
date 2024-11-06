import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { User } from '../pages/models/user.model';
import { TokenStorageService } from './token-storage.service';
import { User } from '../models/user.model';
//import { User } from '../client/models/user.model';
//import { User } from '../models/user.model';

const API_URL = 'http://localhost:9090/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private API_URL = 'http://localhost:9090/user/';
  private apiUrl = 'http://localhost:9090/admin/';
  //getHeaders: HttpHeaders | { [header: string]: string | string[]; } | undefined;
  /* getHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });*/
 
  /*getHeader = () => {
        let headers = new Headers();
        headers.append("Content-Type", 'application/json');

        return headers;
    };*/
    
  constructor(private http: HttpClient,private tokenStorageService: TokenStorageService) { }
  
  
  get getHeaders(): HttpHeaders{
    return new HttpHeaders(
        {
          authorization: 'Bearer ' + this.tokenStorageService.getToken(),
          'Content-Type': 'application/json; charset=UTF-8'
        }
    );
  }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL +  { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL +  { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL +  { responseType: 'text' });
  }
  getUser(userId: number): Observable<any> {
    const userUrl = `http://localhost:9090/admin/${userId}`;
    return this.http.get(userUrl, {headers: this.getHeaders});
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+'all');
  }
  followUser(username: string): Observable<any> {
    const userUrl = `http://localhost:9090/user/friend/follow/${username}`;
    return this.http.post(userUrl, null, {headers: this.getHeaders});
  }
  ///////////////////////////////////////////////////
  followUser2(username1: string,username2: string): Observable<any> {
    const userUrl = `http://localhost:9090/user/friend/follow2/`;
    let queryParams = {'username1': username1,'username2':username2};
    return this.http.post(userUrl, null, {headers: this.getHeaders,params: queryParams});
  }
////////////////////////////////////////////////////////

  unfollowUser(username: string): Observable<any> {
    const userUrl = `http://localhost:9090/user/friend/unfollow/${username}`;
    return this.http.delete(userUrl, {headers: this.getHeaders});
  }
  ///////////////////////////////////////////
  unfollowUser2(username1: string,username2: string): Observable<any> {
    const userUrl = `http://localhost:9090/user/friend/unfollow2/`;
    let queryParams = {'username1': username1,'username2':username2};
    return this.http.delete(userUrl, {headers: this.getHeaders,params: queryParams});
  }
  /////////////////////////////////////////////////

  getUserProfilPicture(): Observable<any> {
    return this.http.get(API_URL + 'picture', {headers: this.getHeaders, responseType: 'text'});
  }

  getUserProfilPicture2(userId: string): Observable<any> {
    let queryParams = {'userId': userId};
    return this.http.get(API_URL + 'picture2', {headers: this.getHeaders, params: queryParams, responseType: 'text'});
  }

  getAllFriends(): Observable<any> {
    return this.http.get(API_URL + 'friends', {headers: this.getHeaders});
  }
///////////////////////////////////////////////
  getAllFriends2(userId: string): Observable<any> {
    let queryParams = {'userId': userId};
    return this.http.get('http://localhost:9090/user/friends2', {headers: this.getHeaders, params: queryParams});
  }

  getSuggestedFriends(): Observable<any> {
    return this.http.get(API_URL + 'suggestions', {headers: this.getHeaders});
  }

  getSuggestedFriends2(): Observable<any> {
    return this.http.get(API_URL + 'suggestions2', {headers: this.getHeaders});
  }
  /////////////////////////////////////////////
  getSuggestedFriends3(userid:string): Observable<any> {
    let queryParams = {'userid': userid};
    return this.http.get(API_URL + 'suggestions3', {headers: this.getHeaders,params: queryParams});
  }

  getUsersInCommon(userId: string): Observable<any> {
    let queryParams = {'userId2': userId};
    return this.http.get(API_URL + 'common-friends', {headers: this.getHeaders, params: queryParams});
  }
  /////////////////////////////////////////////////////
  getUsersInCommon2(userId1: string,userId2: string): Observable<any> {
    let queryParams = {'userId1': userId1,'userId2': userId2};
    return this.http.get(API_URL + 'common-friends2', {headers: this.getHeaders, params: queryParams});
  }
  //////////////////////////////////////////////
  /*addNotification(): Observable<any> {
    return this.http.post(API_URL + 'notifications2/save/', {headers: this.getHeaders});
  }*/

  getNotifications(): Observable<any> {
    return this.http.get(API_URL + 'notifications', {headers: this.getHeaders});
  }
  getNotifications2(userId:string): Observable<any> {
    let queryParams = {'userId': userId};
    return this.http.get(API_URL + 'notifications2', {headers: this.getHeaders, params: queryParams});
  }

  markNotificationAsRead(notifId: number){
    return this.http.put(API_URL + 'notification/read', notifId, {headers: this.getHeaders});
  }

  markNotificationAsUnRead(notifId: number){
    return this.http.put(API_URL + 'notification/unread', notifId, {headers: this.getHeaders});
  }


  
  unlockUser(username: string){
    return this.http.put('http://localhost:9090/admin/unlock', username, {headers: this.getHeaders});
  }

  lockUser(username: string){
    return this.http.put('http://localhost:9090/admin/lock', username, {headers: this.getHeaders});
  }

  getUsersByMonth(id: string): Observable<any> {
    let queryParams = {'id': id};
    return this.http.get('http://localhost:9090/admin/usersByMonth', {headers: this.getHeaders, params: queryParams});
  }

  getSubscribedUsersByMonth(id: string): Observable<any> {
    let queryParams = {'id': id};
    return this.http.get('http://localhost:9090/admin/subscribedUsersByMonth', {headers: this.getHeaders, params: queryParams});
  }



  makeAdmin(username: string): Observable<any> {
    const userUrl = `http://localhost:9090/admin/makeAdmin/${username}`;
    return this.http.put(userUrl, null,  {headers: this.getHeaders});
  }

  addSubscription(): Observable<any> {
    return this.http.post(API_URL + 'subscription/save', null, {headers: this.getHeaders});
  }

  getAllAdmins(): Observable<any>{
    return this.http.get('http://localhost:9090/admin/admins', {headers: this.getHeaders});
  }

  
}