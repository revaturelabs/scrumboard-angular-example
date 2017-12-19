import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptions  } from '@angular/http';
import { Chart } from './chart.interface';

@Injectable()
export class ChartService {

    private static getChartByBoardIdURL = '/chart-service/getChart/';

    // This setup the header information for the request.
    private headers = new Headers({
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUsertoken')).token
    });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http){}

    getChart(boardId): Observable<any> {
        return this.http.get(ChartService.getChartByBoardIdURL + boardId,  this.options).map(response => <Chart[]> response.json());
    }


}
