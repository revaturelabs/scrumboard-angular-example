import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserService } from './login/user.service';
import { BoardsService } from './boards/boards.service';
import { NavbarService } from './navbar/navbar.service';
import { ChartService } from './chart/chart.service';
import { AddUserService } from './add-user/add-user.service';

import { ScrumHomeComponent } from './scrum-home/scrum-home.component';
import { TaskComponent } from './task/task.component';
import { CreateStoryComponent } from './create-story/create-story.component';

import { HomeComponent } from './home/home.component';
import { BoardsComponent } from './boards/boards.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { TaskService } from './task/task.service';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { CreateStoryService } from './create-story/create-story.service';
import { CommentsService } from './comments/comments.service';

import { AddBoardComponent } from './add-board/add-board.component';
import { OrderByPipe } from './boards/order-by.pipe';
import { SwimlaneComponent } from './swimlane/swimlane.component';
import { SwimlaneService } from './swimlane/swimlane.service';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { AddUserComponent } from './add-user/add-user.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'task', component: TaskComponent},
  { path: 'scrum-home', redirectTo: 'boards', pathMatch: 'full'},
  { path: 'home', redirectTo: 'boards', pathMatch: 'full'},
  { path: 'boards', component: BoardsComponent},
  { path: 'modal', component: ModalComponent},
  { path: 'add-user', component: AddUserComponent },
  { path: 'add-board', component: AddBoardComponent},
  { path: 'detail/:id', component: BoardDetailComponent},

  { path: 'chart', component: ChartComponent},
  { path: 'add-story', component: CreateStoryComponent},
  { path: 'boards', component: BoardsComponent},
  { path: 'add-board', component: AddBoardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ScrumHomeComponent,
    TaskComponent,
    HomeComponent,
    BoardsComponent,
    BoardDetailComponent,
    ChartComponent,
    CreateStoryComponent,
    AddBoardComponent,
    OrderByPipe,
    SwimlaneComponent,
    ModalComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ChartsModule,
    BootstrapModalModule,
    BootstrapModalModule.forRoot({container:document.body}),
    RouterModule.forRoot(routes, {useHash: true})
  ],
  entryComponents: [
    ModalComponent
  ],

  providers: [DatePipe, UserService, AddUserService, BoardsService, SwimlaneService, NavbarService, TaskService, CreateStoryService, ChartService, ModalService, CommentsService],

  bootstrap: [AppComponent]
})
export class AppModule { }
