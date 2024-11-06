import {Component, Input, OnInit} from '@angular/core';
import {ForumService} from "../../../Forum_services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../_serviceshazem/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../models/user.model";
import {TokenStorageService} from "../../../_serviceshazem/token-storage.service";
import {Post} from "../../../models/forum_models/post";
import {Media} from "../../../models/forum_models/media";
import {React} from "../../../models/forum_models/react";
import {PostComment} from "../../../models/forum_models/postComment";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit{
  public post:Post[]=[];
  public comment:PostComment[]=[];
  public react:React[]=[];
  selectedPost : Post = new Post();
  user!:User;
  message !: string;
  errormessage = true;
  @Input() indicators = true;
  @Input() controls = true;
  posts : Post = new Post();
  postId: number;
  commentForm: FormGroup;
  reactType: string;
  reacts: React;
  public allcomments:any[] = [];
  public allreacts:any[] = [];
  nbr_like : number;
  nbr_dislike : number;
  nbr_love : number;
  nbr_sad : number;
  nbr_angry : number;
  nbr_laugh : number;
  nbr_wow : number;
  showText = false;
  constructor(private tokenStorageService: TokenStorageService,private forumService : ForumService , private router:Router ,private userService: UserService , private routers: ActivatedRoute ,private fb: FormBuilder ) {
  }
  ngOnInit(): void {

    this.user= this.tokenStorageService.getUser();
    this.forumService.GetPosts()
      .subscribe(res=>{
        this.post = res;

        res.forEach((element)=>
        {
          this.allcomments.push(this.getComments(element.id))
          this.allreacts.push(this.getReacts(element.id))

        })


      });

    this.routers.paramMap.subscribe(params => {
      this.postId = +params.get('id');
    });
    this.commentForm = this.fb.group({
      commentBody: '',
    });
    this.user= this.tokenStorageService.getUser();
    this.routers.paramMap.subscribe(params => {
      this.postId = +params.get('postId');
    });

  }

  //onFileSelected(event): void {
    //this.files = event.target.files;
  //}


///////Post CRUD
  showPost(id:number){
    this.router.navigate(['client/forum/post-details/'+id])
  }
  deletePost(postId: number) {
    this.forumService.DeletePost(postId).subscribe(() => {
        // Update the posts array after successful deletion
        this.post = this.post.filter(post => post.id !== postId);
        //this.router.navigate(['/forumDetails']).then(r => )
      },

      error => {
        console.log('output of the deleeteeee')
        if(error.error.text.startsWith('You can'))
        {
          this.errormessage = false;
          this.message = error.error.text;
          return;
        }
        window.location.reload();
      });
  }
  initPostUpdate()
  {
    console.warn(this.selectedPost.id)
    this.forumService.getpostByiD(this.selectedPost.id).subscribe(response =>
    {
      this.selectedPost.postTitle = response.postTitle;
      this.selectedPost.id = response.id;
      this.selectedPost.body = response.body;
      this.selectedPost.medias = response.medias;
      this.selectedPost.user = response.user;
      this.selectedPost.createdAt = response.createdAt
      console.log(this.selectedPost)

    })
  }
  getPostId(id: any)
  {
    this.selectedPost.id = id;
  }
  updatePost()
  {

    return this.forumService.updatePost(this.selectedPost ,this.selectedPost.id).subscribe(
      response => {
        console.log(response);
        window.location.reload();
        // Do something with the response, e.g. redirect to the new post's page
      },
      error => {
        console.log(error);
        // Handle any errors that occurred during the POST request
      }
    );
  }



  //////Comment CRUD
  getComments(id: number){
    return this.forumService.getComments(id)
      .subscribe(res=>{
        this.comment = res;

      });

  }
  getReacts(id: number){
    this.nbr_like=0;
    this.nbr_dislike=0;
    this.nbr_love=0;
    this.nbr_sad=0;
    this.nbr_angry=0;
    this.nbr_laugh=0;
    this.nbr_wow=0;

    this.forumService.getReacts(id)
      .subscribe(res=>{
        this.react = res;


        console.warn('/////////////////////////////')
        console.warn(this.react)
        for (let i=0; i<this.react.length; i++)
        {
          console.log(this.react[i].type)
          if (this.react[i].type.startsWith('LIKE'))
          {
            console.log('found match')
            this.nbr_like++;
          }
          if (this.react[i].type.startsWith('DISLIKE'))
          {
            console.log('found match')
            this.nbr_dislike++;
          }
          if (this.react[i].type.startsWith('LOVE'))
          {
            console.log('found match')
            this.nbr_love++;
          }
          if (this.react[i].type.startsWith('SAD'))
          {
            console.log('found match')
            this.nbr_sad++;
          }
          if (this.react[i].type.startsWith('ANGRY'))
          {
            console.log('found match')
            this.nbr_angry++;
          }
          if (this.react[i].type.startsWith('LAUGH'))
          {
            console.log('found match')
            this.nbr_laugh++;
          }
          if (this.react[i].type.startsWith('WOW'))
          {
            console.log('found match')
            this.nbr_wow++;
          }
        }
      });


  }
  protected readonly Post = Post;


  addComments(): void {
    const element = document.getElementById('postId')as HTMLInputElement | null;
    const comment: PostComment = this.commentForm.value;
    this.forumService.addComment(comment,Number(element.value)).subscribe(
      response => {
        window.location.reload();
        // Do something with the response, e.g. redirect to the new post's page
      },
      error => {
        // Handle any errors that occurred during the POST request
        window.location.reload();
      }
    );
  }

  ////React CRUD
  addReactToPost(id: number ,reactType: string): void {
    console.warn(id)
    console.warn(reactType)
    this.forumService.addReactToPost(id, reactType).subscribe(
      (response)=>
      {
        console.log(response);
        // Store the selected react type in local storage
        localStorage.setItem('selectedReactType', reactType);
      },
      error1 => {
        console.error(error1)
      }
    )
  }


}
