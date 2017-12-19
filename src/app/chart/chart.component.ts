import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartsModule } from 'ng2-charts';
import { Http } from "@angular/http";
import { DatePipe } from '@angular/common';
import { ChartService } from './chart.service';
import { Chart } from './chart.interface';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Board } from '../boards/board.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart: Chart = {
    type: '',
    data: {
        labels: [
           null
        ],
        datasets: [
            {
                label: '',
                data: [
                   null
                ],
                borderColor: '',
                fill: null
            }
        ]
    }
  }

  board: Board = {
    boardId: null,
    boardName: ''
  }
  

  constructor(
    private chartService: ChartService, 
    private router: Router
  ) { }

  currentBoardId;
  ngOnInit() {
    this.chart = JSON.parse(localStorage.getItem('currentChart'));
    this.board = JSON.parse(localStorage.getItem('currentBoard'));
  }

  //brings user back to the board details
  backToBoardDetails(){
    // JSON.parse(localStorage.getItem('currentBoardId'));
    this.router.navigate(['/detail', JSON.parse(localStorage.getItem('currentBoardId'))]);
  }

  /*
    Things to do for chart:
      change colors
      center chart
      have points end in 0
      add a back button to go back to board details
      moving a story does not change the last move date, need to fix that to reflect change in chart
  */
  public lineChartColors:Array<any> = [ 
    {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgb(255, 0, 0)',
    pointBackgroundColor: 'rgb(255, 0, 0)',
    pointBorderColor: 'rgb(255, 0, 0)',
    pointHoverBackgroundColor: 'rgb(255, 0, 0)',
    pointHoverBorderColor: 'rgb(255, 0, 0)'
    }
  ];

  //***TODO possibly change this to retrieve data from chart-service and store in this array to be able to change it */
  // public lineChartData:Array<any> = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  //   {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  // ];

  public lineChartLabels:Array<any> = [ 
    {
      defaultFontSize: 20
    }
  ];

  public lineChartOptions:Array<any> = [ 
    {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgb(255, 0, 0)',
    pointBackgroundColor: 'rgb(255, 0, 0)',
    pointBorderColor: 'rgb(255, 0, 0)',
    pointHoverBackgroundColor: 'rgb(255, 0, 0)',
    pointHoverBorderColor: 'rgb(255, 0, 0)',
    }
  ];
}
