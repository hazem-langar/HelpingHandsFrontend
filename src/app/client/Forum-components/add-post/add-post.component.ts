import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../models/user.model";
import {Post} from "../../../models/forum_models/post";
import {ForumService} from "../../../Forum_services/forum.service";
import {UserService} from "../../../_serviceshazem/user.service";
import {TokenStorageService} from "../../../_serviceshazem/token-storage.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{
  postForm: FormGroup;
  user!:User;
  public post:Post[]=[];
  errorMessage: string = 'null';
 constructor(private tokenStorageService: TokenStorageService, private userService:UserService, private fb: FormBuilder,private forumService : ForumService) {
 }
  ngOnInit(): void {
    this.postForm = this.fb.group({
      postTitle: '',
      body: ''
    });
    this.user= this.tokenStorageService.getUser();
  }
  onSubmit(): void {
    const post: Post = this.postForm.value;
    this.forumService.addPost(post).subscribe(
      response => {
        console.log(response);
        this.errorMessage = 'Post Added successfully';
        window.location.reload();
      },
      error => {
        if (error?.status === 424) {
          this.errorMessage = 'Bad Word used';
        }
      }

    );
  }
}
