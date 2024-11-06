
import {Post} from "./post";
import {Media} from "./media";
import { User } from "../user.model";


export class PostComment {
  id!: number;
  commentBody!: string;
  commentedAt!: string;
  user!: User;
  postComments!: PostComment[];
  post!: Post;
  medias!: Media[];

}
