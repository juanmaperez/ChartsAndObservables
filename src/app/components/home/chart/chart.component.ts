import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
declare var require: any;
const Highcharts = require('highcharts/highcharts.src');
import { Highcharts } from 'highcharts/adapters/standalone-framework.src';
import { ApiService } from '../../../services/api.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  
    element : any;
    opts: Object = {};
    container : any;

    @Input()
    values: Array<Object>;

    getCountriesSubscription: Subscription = null;

    
    
    chartValues: any = []

  @ViewChild('chart') chart: ElementRef
  constructor(
      private renderer : Renderer2,
      private api : ApiService, 
      private cdRef : ChangeDetectorRef
      
      ) { }

  ngOnInit() {

 

  }

  ngAfterViewInit(){

    this.getCountriesSubscription = this.api.dataObservable
    .subscribe((data)=>{
        if(data){
            data.map((element)=>{
                this.generateChartValues(element, this.api.filters.metric)
            })

            this.generateChartOptions(this.chartValues);
            this.createChart() 
            
            this.cdRef.markForCheck();
            console.log(this.chartValues[0])
        } 

    })
  
  }

  createChart(){
    let previousChild = document.getElementsByClassName('mychart')
    console.log(previousChild.length)
    if(previousChild.length !== 0 ){
        let child = this.renderer.selectRootElement('.mychart');
        
        this.element = this.renderer.selectRootElement('.chartplace');
        console.log(child)
        this.element.removeChild(this.element, child)
    }

    this.container = this.renderer.createElement("div");
    this.renderer.addClass(this.container, "mychart");
    let chart = new Highcharts.Chart(this.container,this.opts)
    this.renderer.appendChild(this.chart.nativeElement, this.container)
    console.log(this.container) 
     
    this.cdRef.markForCheck();
    
  }
  


  generateChartOptions(chartValues){
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
        data: chartValues
        }]
    }; 
  }

  generateChartValues(data, metric){
    if(metric == "population"){
        this.chartValues.push({ name: data.countryName, y: parseInt(data.population) });
    }
    if(metric == "areaInSqKm"){
        this.chartValues.push({ name: data.countryName, y: parseInt(data.areaInSqKm) });
    } 
    if(metric == "None"){      
        this.chartValues.push({ name: data.countryName, y: 1});
    }
  }


}
