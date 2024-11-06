import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { PagesLoginComponent } from './client/pages-login/pages-login.component';
import { PagesRegisterComponent } from './client/pages-register/pages-register.component';
import { UsersProfileComponent } from './client/users-profile/users-profile.component';
import { UserDetailsComponent } from './client/user-details/user-details.component';
import { ForgetpasswordComponent } from './client/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './client/resetpassword/resetpassword.component';
import { ForumComponent } from "./client/Forum-components/forum/forum.component";
import { AddPostComponent } from "./client/Forum-components/add-post/add-post.component";
import { AddCommentComponent } from "./client/Forum-components/add-comment/add-comment.component";
import { CommentComponent } from "./client/Forum-components/comment/comment.component";
import { EditPostComponent } from "./client/Forum-components/edit-post/edit-post.component";
import { ReactComponent } from "./client/Forum-components/react/react.component";
import { PostDetailsComponent} from "./client/Forum-components/post-details/post-details.component";
import {MsgComponent} from "./client/Forum-components/msg/msg.component";
import {PostsTabComponent} from "./dashboard/posts-tab/posts-tab.component";
import {CommentsTabComponent} from "./dashboard/comments-tab/comments-tab.component";
import {ReactsTabComponent} from "./dashboard/reacts-tab/reacts-tab.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/client',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'client',
    component: ClientComponent
  },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'profil', component: UsersProfileComponent },
  { path: 'profil/:id', component: UserDetailsComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'client/forum', component: ForumComponent},
  { path: 'client/forum/add-post', component: AddPostComponent},
  { path: 'client/forum/add-comment', component: AddCommentComponent},
  { path: 'client/forum/comment', component: CommentComponent},
  { path: 'client/forum/edit-post', component: EditPostComponent},
  { path: 'client/forum/add-comment', component: AddCommentComponent },
  { path: 'client/forum/react', component: ReactComponent },
  { path: 'client/forum/post-details/:id', component: PostDetailsComponent },
  { path: 'client/forum/msg', component: MsgComponent },
  { path: 'dashboard/back-office/posts-tab', component: PostsTabComponent },
  { path: 'dashboard/back-office/comments-tab', component: CommentsTabComponent },
  { path: 'dashboard/back-office/reacts-tab', component: ReactsTabComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
