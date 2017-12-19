import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { Task } from './task.interface';

@Injectable()
export class TaskService {

    private static readonly NEW_TASK_URL = '/task-manager-service/newTask';
    private static getAllTasksByStoryIdURL = '/task-manager-service/getAllTasks/';

    // This setup the header information for the request.
    private headers = new Headers({
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUsertoken')).token
    });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http){}

    createTask(task: Task): Observable<any> {
        // console.log('task.service.ts storyId=' + task.storyId + ' task description ' + task.description);
        return this.http.post(TaskService.NEW_TASK_URL, task, this.options);
    }

    //gets input of storyId and adds to getAllTasks URL
    // will change this later to simply grab the storyid of the story in the lane
    getTasks(storyIdInput): Observable<any> {
        // console.log('getTasks storyID = ' + storyIdInput);
        return this.http.get(TaskService.getAllTasksByStoryIdURL + storyIdInput,  this.options).map(response => <Task[]> response.json());
    }
}
