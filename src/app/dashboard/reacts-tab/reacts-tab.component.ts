import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {React} from "../../models/forum_models/react";
import {UserService} from "../../_serviceshazem/user.service";
import {HttpClient} from "@angular/common/http";
import {ForumService} from "../../Forum_services/forum.service";
import {TokenStorageService} from "../../_serviceshazem/token-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reacts-tab',
  templateUrl: './reacts-tab.component.html',
  styleUrls: ['./reacts-tab.component.css']
})
export class ReactsTabComponent implements OnInit{
  email!: string;
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user !: User;
  reactForm: FormGroup;
  files: FileList;
  public react:React[]=[];
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  constructor(private tokenStorageService: TokenStorageService,private userService: UserService, private httpClient: HttpClient , private fb: FormBuilder,private forumService : ForumService , private routers: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(res =>{
      this.users=res
      console.log(this.users)

    })
    this.reactForm = this.fb.group({
      type: '',
    });
    this.user = this.tokenStorageService.getUser()
    this.forumService.GetAllReacts()
      .subscribe(res=>{
        this.react = res;
        console.log(this.react)
      })




  }


  deleteReact(reactId: number) {
    this.forumService.DeleteReact(reactId).subscribe(() => {
        // Update the posts array after successful deletion
        this.react = this.react.filter(react => react.id !== reactId);
        //this.router.navigate(['/forumDetails']).then(r => )
      },

      error => {
        window.location.reload();
      });
  }

}
