import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { Subscription } from 'rxjs/Subscription';

import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';




@Component({
  selector: 'mychart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  
    chart;
    options: Object;

    @Input()
    values: Array<Object>;

    getCountriesSubscription: Subscription = null;

    
    
    chartValues: any = []

    constructor(
        private renderer : Renderer2,
        private api : ApiService, 
        private cdRef : ChangeDetectorRef
        
        ) { }

    ngOnInit() {

        this.getCountriesSubscription = this.api.valuesObservable
        .subscribe((data)=>{
           this.chartValues = data.map((element)=>{ 
               return this.generateChartValues(element, this.api.filters.metric)
            })

            if(this.chart){
                // console.log(this.chart)
                // remove existing series. Set param to false so chart is not redrawn
                this.chart.series[0].remove(false);
                // add new series. Set second param to true so chart is redrawn with new series
                this.chart.addSeries({
                  data: this.chartValues
                }, true);
            }else{
                this.options = this.generateChartOptions(this.chartValues)
            }

            this.cdRef.markForCheck();
        })

    }

    ngAfterViewInit(){

        
    
    }


    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }


    generateChartOptions(chartValues){
        return this.options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: `Countries in ${this.api.filters.continent} by ${this.api.filters.metric}`
            },
            series: [{
            name: 'Total',
            colorByPoint: true,
            data: chartValues
            }]
        }; 
    }

    generateChartValues(data, metric){
        // console.log(this.api.filters)
        if(metric == "population"){
           return { name: data.countryName, y: parseInt(data.population) };
        }
        if(metric == "areaInSqKm"){
            return { name: data.countryName, y: parseInt(data.areaInSqKm) };
        } 
        if(metric == "None"){      
            return{ name: data.countryName, y: 1};
        }
    }


}
