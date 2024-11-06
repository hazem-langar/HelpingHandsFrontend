import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { PagesLoginComponent } from './pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages-register/pages-register.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {ForumComponent} from "./Forum-components/forum/forum.component";
import {AddPostComponent} from "./Forum-components/add-post/add-post.component";
import {AddCommentComponent} from "./Forum-components/add-comment/add-comment.component";
import {CommentComponent} from "./Forum-components/comment/comment.component";
import {EditPostComponent} from "./Forum-components/edit-post/edit-post.component";
import {ReactComponent} from "./Forum-components/react/react.component";
import {PostDetailsComponent} from "./Forum-components/post-details/post-details.component";
//import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'client',
    component: ClientComponent
  },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'profil', component: UsersProfileComponent },
  { path: 'profil/:id', component: UserDetailsComponent },
  { path: 'client/forum', component: ForumComponent},
  { path: 'client/forum/add-post', component: AddPostComponent},
  { path: 'client/forum/add-comment', component: AddCommentComponent},
  { path: 'client/forum/comment', component: CommentComponent},
  { path: 'client/forum/edit-post', component: EditPostComponent},
  { path: 'client/forum/add-comment', component: AddCommentComponent },
  { path: 'client/forum/react', component: ReactComponent },
  { path: 'client/forum/post-details', component: PostDetailsComponent }
];


@NgModule({
  //imports: [RouterModule.forChild(routes)],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
