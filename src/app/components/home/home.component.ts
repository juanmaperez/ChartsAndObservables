import { ApiService } from './../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  direction: String = "dsc"
  data: Array<Object> = [];
  filters: any;

  public filtersSubscription = new Subscription;  

  constructor(private api : ApiService) { }

  ngOnInit() {

    this.filtersSubscription = this.api.filtersObservable
      .subscribe((filters)=>{
        this.filters = filters;
        
        this.getCountries()    
        
      })

  }

  getCountries(){
    
    this.data = [];

    this.api.getCountries()
    .map((data)=>data.geonames.filter((country)=>{
      if(this.filters.continent !== "All"){
        console.log("continentes",country.continent)
        return country.continent == this.filters.continent
      }else{
        return country.continent
      }
    })
    )
    .map((data)=>{
      if(this.filters.metric == "population"){
        return this.sortByPopulation(data, this.direction)
      }else if(this.filters.metric == "areaInSqKm"){
        return this.sortByArea(data, this.direction)        
      }
      return data;
    })
    .mergeMap(data => Observable.from(data))
    .take(parseInt(this.filters.quantity))
    .subscribe((data)=>{
      this.data.push(data);
      console.log("esto es this data",this.data)
    });
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
}
