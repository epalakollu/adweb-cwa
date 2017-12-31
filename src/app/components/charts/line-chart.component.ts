import { Component, OnInit  } from '@angular/core';
import io from 'socket.io-client';
 
@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.html'
})
export class LineChartComponent implements OnInit{

  ngOnInit(){
  }

/*
  socket: any;
  constructor(){

    this.socket = io('http://localhost:8000/analytics');
  }

  ngOnInit(){

      this.socket.on('connect', function () {
      console.log('this is a socket');

      this.socket.on('statsdata', function (data) {
      console.log('dddd'+data);
      });      
    });
  }  */

  // lineChart
  public lineChartData:Array<any> = [
    {data: [45, 32, 56, 45, 59, 59, 59], label: 'Total Count'},
    {data: [28, 23, 40, 19, 28, 27, 18], label: 'Mens Count'},
    {data: [18, 25, 77, 9, 25, 28, 22], label: 'Women Count'}
  ];
  public lineChartLabels:Array<any> = ['20/12 17:59', '20/12 18:00', '20/12 18:01', '20/12 18:05', '20/12 18:10', '20/12 18:23', '20/12 18:25'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {

    /* console.log('callign stats data');
    
    this.socket.on('connect', function(){
          console.log('event fired:');
      });

    console.log('after calling stats data');
    */


    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}