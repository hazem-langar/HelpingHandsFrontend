import {Component, OnInit} from '@angular/core';
import {UserService} from "../../_serviceshazem/user.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ForumService} from "../../Forum_services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";
import {PostComment} from "../../models/forum_models/postComment";
import {Media} from "../../models/forum_models/media";

@Component({
  selector: 'app-comments-tab',
  templateUrl: './comments-tab.component.html',
  styleUrls: ['./comments-tab.component.css']
})
export class CommentsTabComponent implements OnInit{
  email!: string;
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user !: User;
  commentForm: FormGroup;
  files: FileList;
  public comment:PostComment[]=[];
  public selectedMedia: Media; // declare the selectedMedia property with type Media
  public selectedMediaIndex = 0;
  public isImageModalOpen = false;
  showText = false;
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  constructor(private userService: UserService, private httpClient: HttpClient , private fb: FormBuilder,private forumService : ForumService , private routers: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.forumService.GetAllComments()
      .subscribe(res=>{
        this.comment = res;
        console.log(this.comment)
      })




  }
  onFileSelected(event): void {
    this.files = event.target.files;
  }




  deleteComment(commentId: number) {
    this.forumService.DeleteComment(commentId).subscribe(() => {
        // Update the posts array after successful deletion
        this.comment = this.comment.filter(comment => comment.id !== commentId);
        //this.router.navigate(['/forumDetails']).then(r => )
      },

      error => {
        window.location.reload();
      });
  }


}
