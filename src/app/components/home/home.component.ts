import { ChartComponent } from './chart/chart.component';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
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
  options : Object;


  example : Array<Number> = [2, 5, 6]
  decrease : boolean;
  getCountriesSubscription: Subscription = null;

  @ViewChild(ChartComponent) myChart: ChartComponent;

  constructor(private api : ApiService) { 


  }

  ngOnInit() { 
    // console.log(this.api.decreaseObservable)
    this.getCountriesSubscription = this.api.valuesObservable
    .subscribe((data)=>{
      this.data = data;
      // console.log("chartValues",this.chartValues)
    })  

    this.getCountries()
      
  }

  getCountries(){
    this.api.getCountries()
      .subscribe((data)=>{
        this.data = data
    })     
  }

  updateValues(){
    this.api.refilterValues()  
  }

  changeDirection(){
    this.api.changeDirection();
  }



  
}
