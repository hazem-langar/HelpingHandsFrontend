import {Component, OnInit} from '@angular/core';
import {Post} from "../../../models/forum_models/post";
import {PostComment} from "../../../models/forum_models/postComment";
import {User} from "../../../models/user.model";
import {ForumService} from "../../../Forum_services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../_serviceshazem/user.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  public post:Post[]=[];
  public comment:PostComment[]=[];
  postId: number ;
  user!:User;
  constructor(private forumService : ForumService , private router: ActivatedRoute ,private userService: UserService ) {
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.postId = +params.get('id');
      this.getComments();
    });
  }

  getComments(): void {
    this.forumService.getComments(this.postId)
      .subscribe(comments => this.comment = comments);
  }


}
