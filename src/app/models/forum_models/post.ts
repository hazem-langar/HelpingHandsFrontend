import {PostComment} from './postComment';

import {Media} from "./media";
import {React} from "./react";
import { User } from '../user.model';


export class Post {
  id!: number;
  body!: string;
  createdAt!: string;
  postTitle!: string;
  postComment!: PostComment[];
  user!: User;
  medias!: Media[];
  reacts!:React[];

}
