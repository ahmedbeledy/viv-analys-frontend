import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Comments } from 'src/app/data/comment';
import { CommentService } from 'src/app/services/comments.service';
import * as moment from 'moment';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData,private commentservice:CommentService) {
  }
 
  public page=1
  public collectionSize=0
  public comment  :Comments[] | undefined
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });
  date: number = Date.now();
  ngOnInit(): void {
    this.initCharts();
    this.commentservice.getAllComments().subscribe(
      data => {
        data.data.forEach((element:any) => {
          element.annotation_position =moment(element.annotation_position)
          element.comment_created_date =moment(element.comment_created_date)
          
        });
        this.comment = data.data  as Comments[]| []
        
        
        console.log( this.comment);
        
      this.collectionSize=this.comment?.length || 0
      })
  }
  
  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficdate(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
