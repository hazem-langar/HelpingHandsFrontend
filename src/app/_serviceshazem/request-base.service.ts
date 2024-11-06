/*import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export abstract class RequestBaseService {

  protected currentUser: User = new User();
  private roles: string[] | undefined;
  isLoggedIn = false;
  

  protected constructor(protected authenticationService: AuthenticationService,private tokenStorageService: TokenStorageService, protected http: HttpClient) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorageService.getUser();
      this.roles = this.currentUser.roles;
  }

  get getHeaders(): HttpHeaders{
    return new HttpHeaders(
        {
          authorization: 'Bearer ' + this.tokenStorageService.getToken(),
          'Content-Type': 'application/json; charset=UTF-8'
        }
    );
  }
}
}*/
