import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Story } from './story.interface';
import 'rxjs/add/operator/map';
import { MoveStory } from './move-story.interface';
import { DeleteStory } from './delete-story.interface';

@Injectable()
export class SwimlaneService {

  private GET_ALL_STORIES = "/story-manager-service/allboardStories/";
  private ADD_USER_TO_BOARD = "/user-service/addUserToBoard"
  private static readonly DELETE_STORY_URL = "/story-manager-service/deleteStory/";
  private static readonly MOVE_STORY_URL ='/story-manager-service/moveStoryLane';

  // This setup the header information for the request.
  private headers = new Headers({
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUsertoken')).token
  });
  private options = new RequestOptions({ headers: this.headers });

  getAllStories(boardId: number) {
    return this.http.get(this.GET_ALL_STORIES + boardId, this.options)
                    .map(response => <Story[]> response.json());
  }

  moveStoryLane(story: MoveStory): Observable<any> {
    return this.http.post(SwimlaneService.MOVE_STORY_URL, story, this.options);
  }

  deleteStory(story: DeleteStory): Observable<any> {
    return this.http.post(SwimlaneService.DELETE_STORY_URL, story, this.options);
  }

  addUserToBoard():void {

  }

  visible: boolean;

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  constructor(
    private http: Http,
    private httpClient: HttpClient) {
    this.visible = false; }
}
