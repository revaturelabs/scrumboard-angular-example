import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Headers, Http, RequestOptions  } from '@angular/http';

import { Comment } from './comment.interface';
import { AddComment } from './add-comment.interface';
@Injectable()
export class CommentsService {

  private GET_COMMENTS = '/board-comment-service/getCommentsForBoard/';
  private static readonly ADD_COMMENT = '/board-comment-service/newComment';

  private headers = new Headers({ 
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUsertoken')).token 
  });
  private options = new RequestOptions({ headers: this.headers });

  getCommentsForBoard(boardId: number) {
    return this.http.get(this.GET_COMMENTS + boardId, this.options)
                    .map(response => <Comment[]> response.json());
  }

  addComment(comment: AddComment): Observable<any> {
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(CommentsService.ADD_COMMENT, comment, this.options);
  }

  visible: boolean;

  hide() { this.visible = false; }

  show() { this.visible = true; }

  constructor(
    private http: Http,
    private httpClient: HttpClient){
    this.visible = false;
  }

}
