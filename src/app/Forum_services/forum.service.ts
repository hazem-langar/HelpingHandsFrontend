import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../_serviceshazem/user.service";
import {Router} from "@angular/router";
import {Post} from "../models/forum_models/post";
import {map, Observable} from "rxjs";
import {TokenStorageService} from "../_serviceshazem/token-storage.service";
import {PostComment} from "../models/forum_models/postComment";
import {React} from "../models/forum_models/react";

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  token!:string;
  user!:User;
  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient ,private userService:UserService , private router:Router) { }
  get getHeaders(): HttpHeaders{
    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json; charset=UTF-8'
      }
    );
  }
  addPost(post: Post): Observable<any> {
    const formData = new FormData();
    formData.append('postTitle', post.postTitle);
    formData.append('body', post.body);
    return this.http.post<any>("http://localhost:9090/post/add", formData);
  }

  GetPosts(){
    return this.http.get<Post[]>("http://localhost:9090/post/findAll",{headers: this.getHeaders} )
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getpostByiD(id: number):Observable<Post> {
    this.user = this.tokenStorageService.getUser()
    return this.http.get<any>('http://localhost:9090/post/findById?idPost=' + id );

  }

  DeletePost(postId: number) {
    this.user = this.tokenStorageService.getUser()
    // @ts-ignore
    const url = `http://localhost:9090/post/delete?idPost=${idPost}`;
    // @ts-ignore
    return this.http.post<Post>(url ,new FormData());

  }
  getCommentsByPostId(postId: number): Observable<any[]> {
    const url = `http://localhost:9090/comment/getAll?idPost=${postId}`;
    return this.http.get<any[]>(url );
  }


  addComment(comment: PostComment, idPost: number): Observable<Post> {
    const formData = new FormData();
    formData.append('commentBody', comment.commentBody);
    return this.http.post<Post>(`http://localhost:9090/comment/add?idPost=${idPost}`, formData);
  }
  updatePost(post: Post, id: number): Observable<Post> {
    const formData = new FormData();
    formData.append('postTitle', post.postTitle);
    formData.append('body', post.body);

    return this.http.post<Post>("http://localhost:9090/post/update?idPost="+id, formData);
  }

  getComments(idPost: number) {
    this.user = this.tokenStorageService.getUser()
    // @ts-ignore
    return this.http.get<any[]>('http://localhost:9090/comment/getAll?idPost='+idPost);
  }

  addCommentReply(id: number, comment: PostComment) {
    this.user = this.tokenStorageService.getUser()
    // @ts-ignore
    const formData = new FormData();
    formData.append('commentBody', comment.commentBody);
    return this.http.post<Comment>('http://localhost:9090/comment/addResponse?idComment='+id, formData);
  }
  getCommentReplies(id: number)
  {
    return this.http.get<any[]>("http://localhost:9090/comment/getReply?idComment="+id)
  }

  DeleteComment(idComment: number) {
    this.user = this.tokenStorageService.getUser()
    // @ts-ignore
    const url = `http://localhost:9090/comment/delete?idComment=${idComment}`;
    // @ts-ignore
    return this.http.post<PostComment>(url ,new FormData());

  }

  addReactToPost(idPost: number, reactType: string): Observable<React> {
    const url = `http://localhost:9090/react/post/add?idPost=${idPost}&reactType=${reactType}`;
    return this.http.post<React>(url, {});
  }
  addReactToComment(idComment: number, reactType: string): Observable<React> {
    const url = `http://localhost:9090/react/comment/add?idComment=${idComment}&reactType=${reactType}`;
    return this.http.post<React>(url, {});
  }
  getcommentByiD(id: any): Observable<PostComment>{
    this.user = this.tokenStorageService.getUser()
    // @ts-ignore
    return this.http.get<any>('http://localhost:9090/comment/getById?idComment=' + id );
  }
  updateComment(comment: PostComment, id: number): Observable<PostComment> {
    const formData = new FormData();
    formData.append('commentBody', comment.commentBody);

    return this.http.post<PostComment>("http://localhost:9090/comment/update?idComment="+id, formData);
  }

  getReacts(idPost: number) {
    this.user = this.tokenStorageService.getUser()
    // @ts-ignore
    return this.http.get<any[]>('http://localhost:9090/react/post/getAll?idPost='+idPost);
  }
  DeleteReact(idReact: number) {
    this.user = this.tokenStorageService.getUser()
    const url = `http://localhost:9090/react/deleteReact?idReact=${idReact}`;

    // @ts-ignore
    return this.http.post<React>(url ,new FormData());

  }
  GetAllReacts(){
    // this.user = this.tokenStorageService.getUser()
    // // @ts-ignore
    return this.http.get<React[]>("http://localhost:9090/react/getAll" )
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  GetAllComments(){
    // this.user = this.tokenStorageService.getUser()
    // // @ts-ignore
    return this.http.get<PostComment[]>("http://localhost:9090/comment/getAllComment" )
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}



