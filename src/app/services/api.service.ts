import { mergeMap } from 'rxjs/operator/mergeMap';
import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toArray';


import "rxjs/add/observable/of";
import { Response } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ApiService {

  public data: any;


  private values = new BehaviorSubject<any>(null);
  public valuesObservable = this.values.asObservable();
  
  direction: String = "dsc";
  

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
        console.log(this.data)
        return res.json().geonames
      })
      .map((data)=>data.filter((country)=>{
          if(this.filters.continent !== "All"){
            return country.continent == this.filters.continent
          }else{
            return country.continent
          }
        })
      )
      .map((data)=>{        
        if(this.filters.metric == "population"){
          this.setValues(data.slice(0, this.filters.quantity))
          return this.sortByPopulation(data, this.direction).slice(0, this.filters.quantity)
        }else if(this.filters.metric == "areaInSqKm"){
          this.setValues(data.slice(0, this.filters.quantity))
          return this.sortByArea(data, this.direction).slice(0, this.filters.quantity)        
        }

        this.setValues(data.slice(0, this.filters.quantity))
        return data.slice(0, this.filters.quantity);
      })
      
  }
 
  refilterValues(){
    let countries = []
    Observable.from(this.data)
    .map((country)=>{
      if(this.filters.continent == "All"){
        return country;
      }else{
        if(country["continent"] == this.filters.continent){
          return country
        }
      }
    })
    .toArray()
    .map((data)=>{ 
      if(this.filters.metric == "population"){
        return this.sortByPopulation(data, this.direction).slice(0, this.filters.quantity)
      }else if(this.filters.metric == "areaInSqKm"){
        return this.sortByArea(data, this.direction).slice(0, this.filters.quantity)        
      }
        return data
    })
    .subscribe((data)=>{
      this.setValues(data.slice(0, this.filters.quantity))

    })

   
  }
  
  sortByPopulation(data, direction){
    if(direction =="asc"){
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

  sortByArea(data, direction){
    if(direction =="asc"){
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

}
