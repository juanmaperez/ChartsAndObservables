import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ApiService {

  private data = new BehaviorSubject<any>(null);
  public dataObservable = this.data.asObservable();

  
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
      .map(res=>res.json())
      .map((data)=>data.geonames.filter((country)=>{
        if(this.filters.continent !== "All"){
          return country.continent == this.filters.continent
        }else{
          return country.continent
        }
      })
      )
      .map((data)=>{        
        if(this.filters.metric == "population"){
          return this.sortByPopulation(data, this.direction).slice(0, this.filters.quantity)
        }else if(this.filters.metric == "areaInSqKm"){
          return this.sortByArea(data, this.direction).slice(0, this.filters.quantity)        
        }
        return data.slice(0, this.filters.quantity);
      })
      .subscribe((data)=>{
        this.setData(data);
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


  setData(data){
    this.data.next(data)
  }
  

}
