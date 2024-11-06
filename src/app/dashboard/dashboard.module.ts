import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsTabComponent } from './posts-tab/posts-tab.component';
import { ReactsTabComponent } from './reacts-tab/reacts-tab.component';
import { CommentsTabComponent } from './comments-tab/comments-tab.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    PostsTabComponent,
    ReactsTabComponent,
    CommentsTabComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }