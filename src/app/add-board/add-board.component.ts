import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BoardsService } from '../boards/boards.service';
import { Board } from '../boards/board.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { BoardDetailComponent } from '../board-detail/board-detail.component';
import { NewBoard } from '../boards/newBoard.interface';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css']
})
export class AddBoardComponent implements OnInit {

  newBoard: NewBoard = {
    boardName:''
  }

  constructor(
    private boardsService: BoardsService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  addBoard(): void {

    if(this.newBoard.boardName == '') {
      window.alert("Board Name cannot be empty");
    } else {
        this.boardsService.addBoard(this.newBoard).subscribe(
          res => {
            this.router.navigateByUrl('/boards');
          })
      }
  }

}
