import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClientModule } from './client/client.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ForumComponent} from "./client/Forum-components/forum/forum.component";
import {EditPostComponent} from "./client/Forum-components/edit-post/edit-post.component";
import {AddPostComponent} from "./client/Forum-components/add-post/add-post.component";
import {CommentComponent} from "./client/Forum-components/comment/comment.component";
import {ReactComponent} from "./client/Forum-components/react/react.component";
import {PostDetailsComponent} from "./client/Forum-components/post-details/post-details.component";
import {AddCommentComponent} from "./client/Forum-components/add-comment/add-comment.component";

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    ClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //ShopModuleModule,
    BrowserAnimationsModule,
    //GoogleMapsModule,
    //NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //ShopModuleModule,
    BrowserAnimationsModule,
    //GoogleMapsModule,
    //NgxPaginationModule,
    ReactiveFormsModule,
   // BackOfficeModule,
    NgOptimizedImage,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
