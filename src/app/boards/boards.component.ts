import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BoardsService } from './boards.service';
import { Board } from './board.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { BoardDetailComponent } from '../board-detail/board-detail.component';
import { NewBoard } from './newBoard.interface';
import { ChartService } from '../chart/chart.service';

import { Pipe, PipeTransform } from '@angular/core';
import { OrderByPipe } from './order-by.pipe';
import { DeleteBoard } from './delete-board.interface';

import { CommentsService } from '../comments/comments.service';
import { AddComment } from '../comments/add-comment.interface';
import { Comment } from '../comments/comment.interface';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})

export class BoardsComponent implements OnInit {

  boards: Board[];

  order = "boardId";
  ascending = true;

  newBoard: NewBoard = {
    boardName:''
  }

  deleteThisBoard: DeleteBoard = {
    boardId: null
  }

  selectedBoard: Board;
  id: number;
  name: string;
  error: any;

  constructor(
    private router: Router,
    private boardsService: BoardsService,
    private commentsService: CommentsService,
    private chartService: ChartService) {
     }

  roleId = JSON.parse(localStorage.getItem('currentUser')).roleType.roleId;

  ngOnInit() {
    this.displayAllBoards();

    if( this.roleId != 2) {
      this.boardsService.hide();
    } else {
      this.boardsService.show();
    }
  }

  Select(board: Board, boardId): void {
    this.selectedBoard = board;
    this.loadChart(boardId);
    localStorage.setItem('currentBoardId',boardId); //delete this if loadChart works
  }

  scrumUserId = JSON.parse(localStorage.getItem("currentUser")).scrumUserId;

  displayAllBoards() {
    this.boardsService.getAllBoards().subscribe(
      res => {
        this.boards = res;
        localStorage.setItem('currentBoards', JSON.stringify(res));
      })
  }

  onSelect(board: Board, num: number, str: string): void {

    this.selectedBoard = board;
    this.id = num;
    this.name = str;
    this.gotoDetail();
    localStorage.setItem('currentBoard', JSON.stringify(board));
  }

  //pre-loads chart for current board so chart will display when view chart button is clicked
  loadChart(selectedBoardId){
    this.chartService.getChart(selectedBoardId).subscribe(
      res => {
        localStorage.setItem('currentChart', JSON.stringify(res));
      }
    )
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.id]);
  }

  addBoard(): void {

    if(this.newBoard.boardName == '') {
      window.alert("Board Name cannot be empty");
    } else {
        this.boardsService.addBoard(this.newBoard).subscribe(
          res => {
          })
      }
  }

  deleteBoard(id: number): void {
    this.deleteThisBoard.boardId = id;
    this.boardsService.deleteBoard(this.deleteThisBoard).subscribe(
      res => {
        this.displayAllBoards();
      });
  }

  //Display all comments fro one board
  comments: Comment[];

  addComment: AddComment = {
    boardId: null,
    scrumUserId: null,
    comment: ''
  }

  viewComments(board: Board, id: number): void {
    this.commentsService.show();
    var num = id;
    this.commentsService.getCommentsForBoard(num).subscribe(
      res=> {
        this.comments = res;
      });
  }

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  currentUserId = this.currentUser.scrumUserId;

  newComment(id: number):void {
    this.addComment.boardId = id;
    this.addComment.scrumUserId = this.currentUserId;
    this.commentsService.addComment(this.addComment).subscribe(
      res => {
        this.viewComments(this.selectedBoard, id);
      });
  }
}

