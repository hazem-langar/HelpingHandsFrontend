import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/_serviceshazem/token-storage.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent {
  isLoggedIn = false;
  constructor(private tokenStorageService: TokenStorageService ) { }
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
}
