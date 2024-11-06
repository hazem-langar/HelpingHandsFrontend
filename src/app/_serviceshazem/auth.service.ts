import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:9090/api/auth/';
const AUTH_API2 = 'http://localhost:9090/admin/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private tokenStorageService:TokenStorageService) { }
  get getHeaders(): HttpHeaders{
    return new HttpHeaders(
        {
          authorization: 'Bearer ' + this.tokenStorageService.getToken(),
          'Content-Type': 'application/json; charset=UTF-8'
        }
    );}
  login(credentials: { username: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: { username: any; email: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  updatePassword(userid: string, newpassword: string){
    let queryParams = {'userid': userid,'newpassword': newpassword};
    return this.http.post(AUTH_API2 + 'resetpassword/new', {headers: this.getHeaders, params: queryParams});
  }
}