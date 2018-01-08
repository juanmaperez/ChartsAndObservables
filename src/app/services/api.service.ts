import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import "rxjs/add/observable/of";

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
        return res.json()
      })
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
    .mergeMap(data=>Observable.of(data))
    .filter((country)=>{
      console.log("este es el filtro",this.filters.continent);
      if(this.filters.continent == "All"){
        console.log("filtering with All", country)
        return country.continent;
      }else{
        console.log("filtering without all", country)
        return country.continent === this.filters.continent
      }
    })
    .subscribe((data)=>{
      countries.push(data)
      console.log("final data", data)
      console.log(countries)
      return countries
    })

    this.values.next(countries.slice(0, this.filters.quantity))
    // .filter((country)=>{
    //       console.log("Entra Aquí");
    //       if(this.filters.continent !== "All"){
    //         console.log("filtering", country.continent)
    //         return country.continent == this.filters.continent
    //       }else{
    //         console.log("filtering", country.continent)
    //         return country.continent
    //       }
    // })

    // data.array.map((element)=>{
    //   console.log("maping",data)
    //   element.filter((country)=>{
        
    //     console.log("Entra Aquí");
    //     if(this.filters.continent !== "All"){
    //       console.log("filtering", country.continent)
    //       return country.continent == this.filters.continent
    //     }else{
    //       console.log("filtering", country.continent)
    //       return country.continent
    //     }
    //   })
    // })
    // )
    // .map((data)=>{        
    //   if(this.filters.metric == "population"){
    //     this.setValues(data.slice(0, this.filters.quantity))
    //   }else if(this.filters.metric == "areaInSqKm"){
    //     this.setValues(data.slice(0, this.filters.quantity))
    //   }
    //   this.setValues(data.slice(0, this.filters.quantity))
    // })
    console.log(this.values)
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
