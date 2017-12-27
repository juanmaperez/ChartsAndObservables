import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
declare var require: any;
const Highcharts = require('highcharts/highcharts.src');
import { Highcharts } from 'highcharts/adapters/standalone-framework.src';
import { ApiService } from '../../../services/api.service';



@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  
  
  opts: Object = {};

  @Input()
  values: Array<Object>;


  @ViewChild('chart') chart: ElementRef
  constructor(
      private renderer : Renderer2,
      private api : ApiService, 
      
      ) { }

  ngOnInit() {
     
  }

  ngAfterViewInit(){
    this.generateChartOptions();
    this.createChart()

  }

  createChart(){
    let container = this.renderer.createElement("div");
    let chart = new Highcharts.Chart(container,this.opts)
    this.renderer.appendChild(this.chart.nativeElement, container)
  }
  


  generateChartOptions(){
    console.log(this.values["0"][0])
    this.opts = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: `Countries in by ${this.api.filters.metric}`
        },
        series: [{
        name: 'Total',
        colorByPoint: true,
        data: this.values
        }]
    }; 
  }





}
