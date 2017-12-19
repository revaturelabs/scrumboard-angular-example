import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user.interface';
import { Headers, Http, RequestOptions} from '@angular/http';
import { Base64 } from 'js-base64';
import 'rxjs/add/operator/delay';

@Injectable()
export class UserService {
  //this will be: http://localhost:8765/user-service/...
  private static readonly SERVICE_URL = '/user-service';
  private static readonly LOGIN_URL = UserService.SERVICE_URL + '/login';
  private static readonly UATH_URL = UserService.SERVICE_URL + '/oauth/token';

  private headersOauth: Headers;
  private headerslogin: Headers;

  private options: RequestOptions;

  private url: string;
  private creds: String;
  private updatedUser: string;

  //Inject Http to http thru a constructor.
  constructor(private http: Http){}

  //Inject User interface to user, using Observable for async data. It's a normal post request.
  loginUser(user: User): Observable<any> {
    // console.log(user.scrumUserUsername + ' ' + user.scrumUserPassword);

    // Calls the authenticate() method to get a token for Authentication.
    this.authenticate(user);

    // This setup the header information for the request.
    this.headersOauth = new Headers({
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUsertoken')).token
    });
    this.options = new RequestOptions({ headers: this.headersOauth });

    // Send the HTTP POST request.
    return this.http.post(UserService.LOGIN_URL, user, this.options).map(res => res.json());
  }

  authenticate(user: User) {
    this.url = "http://localhost:8765/user-service/oauth/token";

    // This sets up the header information for the request.
    this.headerslogin = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + Base64.encode('clientid' + ':' + 'token')
    });
    this.options = new RequestOptions({ headers: this.headerslogin });

    // This sets up the body information for the request.
    let params = new URLSearchParams();
    params.append('username',user.scrumUserUsername);
    params.append('password',user.scrumUserPassword);
    params.append('grant_type','password');

    // Send the HTTP POST request.
    this.http.post(UserService.UATH_URL, params.toString(), this.options).delay(4000)
      .map(res => res.json()).subscribe(response => {

        // Adds the token to the local storage for reuse.
        localStorage.setItem('currentUsertoken', JSON.stringify(
          {userName:user.scrumUserUsername, token: response.access_token }));

        // console.log(localStorage.getItem('currentUsertoken'));
      }, (error) => {
        // console.log('error in', error);
      });
  }
}
