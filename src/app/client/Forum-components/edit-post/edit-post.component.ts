import {Component, OnInit} from '@angular/core';
import {Post} from "../../../models/forum_models/post";
import {ActivatedRoute} from "@angular/router";
import {ForumService} from "../../../Forum_services/forum.service";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit{
  post!: Post;
  error: string;
  constructor(private route: ActivatedRoute, private forumService: ForumService) { }

  ngOnInit() {

  }

  onSubmit() {
    this.forumService.updatePost(this.post,this.post.id).subscribe(
      post => {
        console.log(post);
        window.location.reload();
        // Handle success scenario here
      },
      error => {
        this.error = error;
        console.log(error);
      }
    );
  }
}
