import { User } from "../user.model";
import { ReactType } from "./ReactType";
import { Post } from "./post";
import { PostComment } from "./postComment";



export class React {
  id!: number;
  type!:string
  user!: User;
  postComments!: PostComment;
  post!: Post;




}
