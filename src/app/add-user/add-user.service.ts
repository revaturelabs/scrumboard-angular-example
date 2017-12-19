import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user.interface';
import { AddUser } from './add-user.interface';
@Injectable()
export class AddUserService {

  private USER_FOR_BOARD = '/user-service/getAllUsersForBoard/';
  private USER_NOT_BOARD = '/user-service/getAllUsersNotOnBoard/';

  private static readonly ADD_USER_TO_BOARD = '/user-service/addUserToBoard/';

  constructor(
    private http: Http,
    private httpClient: HttpClient) { }

  private headers = new Headers({
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUsertoken')).token
  });
  private options = new RequestOptions({ headers: this.headers });

  getUsersForBoard(id: number) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.USER_FOR_BOARD + id, this.options)
                    .map(response => <User[]> response.json());
  }

  getUsersNotOnBoard(id: number) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.USER_NOT_BOARD + id, this.options)
                    .map(response => <User[]> response.json());
  }

  addUserToBoard(user: AddUser): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(AddUserService.ADD_USER_TO_BOARD, user, this.options);
  }

}
