import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_serviceshazem/auth.service';
import { TokenStorageService } from 'src/app/_serviceshazem/token-storage.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  password!: string ;
  confirmPassword!: string ;
  token!: string;
  errorMessage: string = "";
  currentUser: User = new User;
  constructor(private tokenStorageService: TokenStorageService,private authenticationService:AuthService, private router: Router) {}

  updatePassword(){
    this.tokenStorageService.saveToken(this.token);
    this.currentUser= this.tokenStorageService.getUser();
    console.log(this.currentUser);
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
