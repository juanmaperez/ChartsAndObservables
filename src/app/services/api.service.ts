import { mergeMap } from 'rxjs/operator/mergeMap';
import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toArray';


import "rxjs/add/observable/of";
import { Response } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ApiService {

  public data: any;


  private values = new ReplaySubject<any>(null);
  public valuesObservable = this.values.asObservable();
  
  private decrease = new BehaviorSubject<boolean>(true);
  public decreaseObservable = this.decrease.asObservable()
  

  public filters: any = {
    continent : "All",
    metric: "None",
    quantity: 5,
  }; 


  url = "http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane";  

  constructor(private http : Http) { }


  getCountries(){
    return this.http.get(this.url)
      .map((res)=>{
        this.data = res.json().geonames;
        this.setValues(res.json().geonames.slice(0, this.filters.quantity))
        return res.json().geonames.slice(0, this.filters.quantity)
      })    
  }
 
  refilterValues(){
    let countries = []
    Observable.from(this.data)
    .filter((data)=> this.filterCountriesByContinent(data, this.filters.continent))
    .toArray()
    .map((data)=>{ 

      if(this.filters.metric == "population"){
        return this.sortByPopulation(data, this.decrease.getValue())
      }else if(this.filters.metric == "areaInSqKm"){
        return this.sortByArea(data, this.decrease.getValue())        
      }
        return data
    })
    .subscribe((data)=>{
      this.setValues(data.slice(0, this.filters.quantity))

    })
   
  }
  
  filterCountriesByContinent(country, continent){
    if(continent == "All"){
      return country;
    }else{
      if(country["continent"] == continent){
        return country
      }
    }
  }
 


  sortByPopulation(data, decrease){
    if(!decrease){
      data.sort((a, b)=>{
        return a["population"] - b["population"]
       })
    } else{
      data.sort((a, b)=>{
        return b["population"] - a["population"]
       })
    }
    return data
  }

  sortByArea(data, decrease){
    if(!decrease){
      data.sort((a, b)=>{
        return a["areaInSqKm"] - b["areaInSqKm"]
       })
    } else{
      data.sort((a, b)=>{
        return b["areaInSqKm"] - a["areaInSqKm"]
       })
    }
    return data
  }

  updateFilters(filters){
    this.filters = filters
  }
  
  setValues(data){
    this.values.next(data)
  }

  changeDirection(){

    this.decrease.next(!this.decrease.getValue());
    this.refilterValues();
  }

}
