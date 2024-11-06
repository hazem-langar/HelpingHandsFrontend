import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Post} from "../../models/forum_models/post";
import {Media} from "../../models/forum_models/media";
import {UserService} from "../../_serviceshazem/user.service";
import {HttpClient} from "@angular/common/http";
import {ForumService} from "../../Forum_services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../_serviceshazem/token-storage.service";

@Component({
  selector: 'app-posts-tab',
  templateUrl: './posts-tab.component.html',
  styleUrls: ['./posts-tab.component.css']
})
export class PostsTabComponent implements OnInit{
  email!: string;
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user !: User;
  postForm: FormGroup;
  public post:Post[]=[];
  public selectedMedia: Media; // declare the selectedMedia property with type Media
  public selectedMediaIndex = 0;
  public isImageModalOpen = false;
  showText = false;
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
    this.postForm = this.fb.group({
      postTitle: '',
      body: ''
    });
    this.user = this.tokenStorageService.getUser()
    this.forumService.GetPosts()
      .subscribe(res=>{
        this.post = res;
        console.log(this.post)
      })




  }
 // onFileSelected(event): void {
   // this.files = event.target.files;
  //}


  deletePost(postId: number) {
    this.forumService.DeletePost(postId).subscribe(() => {
        // Update the posts array after successful deletion
        this.post = this.post.filter(post => post.id !== postId);
        //this.router.navigate(['/forumDetails']).then(r => )
      },

      error => {
        window.location.reload();
      });
  }

}
