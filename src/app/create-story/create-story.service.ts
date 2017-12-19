import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptions } from '@angular/http';
import { CreateStory } from './create-story.interface';

@Injectable()
export class CreateStoryService {
    private static readonly ADD_STORY_URL = '/story-manager-service/addStory';

    // This setup the header information for the request.
    private headers = new Headers({ 
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUsertoken')).token 
    });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http){}

    createNewStory(story: CreateStory): Observable<any> {
        return this.http.post(CreateStoryService.ADD_STORY_URL, story, this.options);
    }
}
