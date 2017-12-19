import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChartComponent } from '../chart/chart.component';
import { ChartService } from '../chart/chart.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  roleId = JSON.parse(localStorage.getItem('currentUser')).roleType.roleId;

  constructor(
    private navbarService: NavbarService,
    private chartService: ChartService,
    private router: Router) { }

  ngOnInit() {
    if( this.roleId != 2) {
      this.navbarService.hide();
    } else {
      this.navbarService.show();
    }
  }

  logout(): void {
    // localStorage.removeItem('currentUsertoken');
    localStorage.clear();
  }

  // getChartSubmit() {

  //   console.log("current board id: " + JSON.parse(localStorage.getItem('currentBoard')).boardId);
  //   console.log("Get chart by this boardID: " + JSON.parse(localStorage.getItem('currentBoard')).boardId);
  //   this.chartService.getChart(JSON.parse(localStorage.getItem('currentBoard')).boardId).subscribe(
  //     res => {
  //       console.log("Get chart success!", res);
  //       //places reponse of task-manager-service/getAllTasks/{storyId} into task array
  //       localStorage.setItem('currentChart', JSON.stringify(res));
  //       // this.chart = res;
  //     }
  //   )

  // }
}
