import { Component, OnInit } from '@angular/core';
import {CreateStory} from './create-story.interface';
import {CreateStoryService} from './create-story.service';
import { Router } from '@angular/router';
import { SwimlaneService } from '../swimlane/swimlane.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  private currentBoard= JSON.parse(localStorage.getItem('currentBoard'));
  currentBoardId = this.currentBoard.boardId;

  story: CreateStory = {
    boardId: this.currentBoardId,
    storyName: '',
    storyPoints: null,
    storyDesc: ''
  }

  constructor(
    private storyService: CreateStoryService,
    private router: Router,
    private swimlaneService: SwimlaneService
  ) {}

  ngOnInit() {
    // console.log("Story->boardId ", this.currentBoardId);
  }

  storySubmit() {
    if(this.story.storyName == null){
      window.alert("Story Name cannot be empty");
    } else if(this.story.storyPoints == null){
      window.alert("You need to select story points");
    } else if(this.story.storyDesc == null){
      window.alert("Story description cannot be empty");
    } else {
      this.storyService.createNewStory(this.story).subscribe(
      res => {
        // this.router.navigateByUrl('/boards');
        this.router.navigate(['/detail', this.currentBoardId]);
      });
    }
  }

  backToStories(): void {
    this.router.navigate(['/detail', this.currentBoardId]);
  }
}
