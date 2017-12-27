import { ApiService } from './../../services/api.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap'
import { mergeMap } from 'rxjs/operator/mergeMap';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  data: any;
  filters: any;
  chartValues : any = new Array();
  example : Array<Number> = [2, 5, 6]

  getCountriesSubscription: Subscription = null;

  constructor(private api : ApiService) { }

  ngOnInit() {
    this.getCountries()
    
    this.getCountriesSubscription = this.api.dataObservable
    .subscribe((data)=>{
      this.data = data;
      // console.log("chartValues",this.chartValues)
    })
    
  }

  getCountries(){
    this.chartValues = []    

    this.api.getCountries()

    this.getCountriesSubscription = this.api.dataObservable
    .subscribe((data)=>{
      this.data = data;
      // console.log("chartValues",this.chartValues)
    })    
    
  }

  generateChartValues(data, metric){
    if(metric == "population"){
        this.chartValues.push({ name: data.countryName, y: data.population });
    }
    if(metric == "areaInSqKm"){
        this.chartValues.push({ name: data.countryName, y: data.areaInSqKm });
    } 
    if(metric == "None"){      
        this.chartValues.push({ name: data.countryName, y: 1});
    }
  }

  
}
