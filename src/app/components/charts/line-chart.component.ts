import { Component, OnInit, ViewChild  } from '@angular/core';
import io from 'socket.io-client';
import {NgxGalleryComponent } from 'ngx-gallery';
import {environment} from '../../../environments/environment';

 
@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.html'
})
export class LineChartComponent implements OnInit{

  
  @ViewChild(NgxGalleryComponent) ngxImageGallery: NgxGalleryComponent;
  
  socket: any;

  constructor(){

    this.socket = io(environment.server_url);
    
  }

  ngOnInit(){

    this.socket.on('connect', function () {
      console.log('this is a socket');   
      this.socket.emit('statsdata', {data: 'I\'m connected!'});
    }.bind(this));

    this.socket.on('face time stats', function (data) {    
      // update time charts
      this.updateTimeChart(data);     
      // update gender charts
      this.updateGenderChart(data);
    }.bind(this));


  } 

  // lineChart time spent
  
  public lineChartData:Array<any> = [
    {data: [45, 32, 56, 45, 59, 59, 59], label: 'Time Spent'}
  ];
  
  public lineChartLabels:Array<any> = ['20/12 17:59', '20/12 18:00', '20/12 18:01', '20/12 18:05', '20/12 18:10', 
                                       '20/12 18:23', '20/12 18:25'];

 // Gender lineChart 
  public lineChartGenderData:Array<any> = [
    {data: [1, 2, 0, 1, 1, 2, 1], label: 'Male'},
    {data: [1, 0, 1, 0, 0, 1, 0], label: 'Female'}
  ];
  public lineChartGenderLabels:Array<any> = ['20/12 17:59', '20/12 18:00', '20/12 18:01', '20/12 18:05', 
                                              '20/12 18:10', '20/12 18:23', '20/12 18:25'];
  

  
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(0,0,255,0.1)',
      borderColor: 'rgb(0, 102, 255)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#0066ff',
      pointHoverBackgroundColor: '#0066ff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(255,192,203,0.3)',
      borderColor: 'rgb(255,20,147)',
      pointBackgroundColor: 'rgb(255,192,203)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255,20,147)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#FFC0CB',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public updateTimeChart(data:any):void {

      let streamData = JSON.parse(data)
      console.log(data)

      let _lineChartData:Array<any> = new Array(this.lineChartData.length);
      
      for (let i = 0; i < this.lineChartData.length; i++) {
        _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
        
        for (let j = 0; j < this.lineChartData[i].data.length-1; j++) {
          _lineChartData[i].data[j] = this.lineChartData[i].data[j+1];
        }         
        
        _lineChartData[i].data[this.lineChartData[i].data.length-1] = streamData.total;
        }

        for (let j = 0; j < this.lineChartLabels.length-1; j++) {
          this.lineChartLabels[j] = this.lineChartLabels[j+1];
        }  

       this.lineChartLabels[this.lineChartLabels.length-1] = streamData.date;
       this.lineChartData = _lineChartData;
       console.log(this.lineChartLabels)
  }

  public updateGenderChart(data:any):void {

      let streamData = JSON.parse(data)
      console.log(data)

      let _lineChartGenderData:Array<any> = new Array(this.lineChartGenderData.length);
      
      for (let i = 0; i < this.lineChartGenderData.length; i++) {
        _lineChartGenderData[i] = {data: new Array(this.lineChartGenderData[i].data.length), label: this.lineChartGenderData[i].label};
        
        for (let j = 0; j < this.lineChartGenderData[i].data.length-1; j++) {
          _lineChartGenderData[i].data[j] = this.lineChartGenderData[i].data[j+1];
        }         
        
        if(i==0){
          _lineChartGenderData[i].data[this.lineChartGenderData[i].data.length-1] = streamData.maleFacesCount;
        }
        else{
          _lineChartGenderData[i].data[this.lineChartGenderData[i].data.length-1] = streamData.femaleFacesCount;
        }

        }

        for (let j = 0; j < this.lineChartGenderLabels.length-1; j++) {
          this.lineChartGenderLabels[j] = this.lineChartGenderLabels[j+1];
        }  

       this.lineChartGenderLabels[this.lineChartGenderLabels.length-1] = streamData.date;
       this.lineChartGenderData = _lineChartGenderData;
       console.log(this.lineChartGenderLabels)
  }


 
  public randomize():void {


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