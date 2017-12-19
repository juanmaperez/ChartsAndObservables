import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
declare var require: any;
const Highcharts = require('highcharts/highcharts.src');
import { Highcharts } from 'highcharts/adapters/standalone-framework.src';



@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  opts = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
        text: 'Browser market shares January, 2015 to May, 2015'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'IE',
            y: 56.33
        }, {
            name: 'Chrome',
            y: 24.03,
            sliced: true,
            selected: true
        }, {
            name: 'Firefox',
            y: 10.38
        }, {
            name: 'Safari',
            y: 4.77
        }, {
            name: 'Opera',
            y: 0.91
        }, {
            name: 'Other',
            y: 0.2
        }]
    }]
  }

  @Input('values')
  values: Array<Object>;

  @ViewChild('chart') chart: ElementRef
  constructor(
      private renderer : Renderer2, 
      ) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.createChart()
  }

  createChart(){
    let container = this.renderer.createElement("div");
    let chart = new Highcharts.Chart(container,this.opts)
    this.renderer.appendChild(this.chart.nativeElement, container)
  }
  






}
