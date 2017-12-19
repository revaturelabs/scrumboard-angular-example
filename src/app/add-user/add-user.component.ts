import { Component, OnInit } from '@angular/core';
import { AddUserService } from './add-user.service';
import { User } from './user.interface';
import { Router } from '@angular/router';
import { AddUser } from './add-user.interface';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  private currentBoard = JSON.parse(localStorage.getItem('currentBoard'));
  currentBoardId = this.currentBoard.boardId;

  usersOnBoard: User[];
  usersNotOnBoard: User[];

  addUser: AddUser = {
    boardId: null,
    scrumUserId: null
  }

  constructor(
    private addUserService: AddUserService,
    private router: Router) { }

  ngOnInit() {
    this.displayUsers();
  }

  getUsersForBoard(): void {
    this.addUserService.getUsersForBoard(this.currentBoardId).subscribe(
      res => {
        this.usersOnBoard = res;
        // console.log(this.usersOnBoard);
      });
  }

  getUsersNotOnBoard(): void {
    this.addUserService.getUsersNotOnBoard(this.currentBoardId).subscribe(
      res => {
        this.usersNotOnBoard = res;
        // console.log(this.usersNotOnBoard)
      })
  }

  displayUsers(): void{
    this.getUsersForBoard();
    this.getUsersNotOnBoard();
  }

  addUserSubmit(id: number): void {

    this.addUser.scrumUserId = id;
    this.addUser.boardId = this.currentBoardId;
    // console.log(this.addUser.scrumUserId + ' ' + this.addUser.boardId);
    if(this.addUser.scrumUserId == null) {
      window.alert("Scrum User Id cannot be empty");
    } else {
      this.addUserService.addUserToBoard(this.addUser).subscribe(
        res => {
          this.displayUsers();
        }
      );
    }
  }

  backToStories(): void {
    this.router.navigate(['/detail', this.currentBoardId]);
  }

}
