import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../models/user.model";
import {PostComment} from "../../../models/forum_models/postComment";
import {ForumService} from "../../../Forum_services/forum.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit{
  commentForm: FormGroup;
  user!:User;
  public comment:PostComment[]=[];
  constructor( private fb: FormBuilder,private forumService : ForumService , private router:Router , private http:HttpClient ) {
  }
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      commentBody: '',
    });
  }


}
