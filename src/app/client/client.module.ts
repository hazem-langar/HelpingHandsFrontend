import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { ClientComponent } from './client.component';
import { ClientFooterComponent } from './client-footer/client-footer.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { PagesRegisterComponent } from './pages-register/pages-register.component';
import { PagesLoginComponent } from './pages-login/pages-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddPostComponent } from './Forum-components/add-post/add-post.component';
import { ForumComponent } from './Forum-components/forum/forum.component';
import { AddCommentComponent } from './Forum-components/add-comment/add-comment.component';
import { CommentComponent } from './Forum-components/comment/comment.component';
import { ReactComponent } from './Forum-components/react/react.component';
import { EditPostComponent } from './Forum-components/edit-post/edit-post.component';
import { PostDetailsComponent } from './Forum-components/post-details/post-details.component';
import { MsgComponent } from './Forum-components/msg/msg.component';
import { Nav2Component } from './nav2/nav2.component';




@NgModule({
  declarations: [
    ClientComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    UsersProfileComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    UserDetailsComponent,
    AddPostComponent,
    ForumComponent,
    AddCommentComponent,
    CommentComponent,
    ReactComponent,
    EditPostComponent,
    PostDetailsComponent,
    MsgComponent,
    Nav2Component

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class ClientModule { }
