import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';
import { Board } from '../boards/board.interface';
import { BoardsService } from '../boards/boards.service';
import { NewBoard } from '../boards/newBoard.interface';
import { BoardsComponent } from '../boards/boards.component';
import { SwimlaneComponent } from '../swimlane/swimlane.component';
@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  @Input() board: Board;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false;
  currenBoardId: number;

  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id =  +params['id'];
      this.currenBoardId = id;
      this.navigated = true;
      this.boardsService.getBoard(id).subscribe(
        res => {
        })
    });
    this.callCurrentBoard();
  }

  callCurrentBoard(): void {
    this.boardsService.getBoard(this.currenBoardId).subscribe(
      res => {
        localStorage.setItem('currentBoardForLanes', JSON.stringify(res));
      });
  }
}
