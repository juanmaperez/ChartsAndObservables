import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService {

  public data: any

  private filters = new BehaviorSubject <Object>({
    continent : "All",
    metric: "None",
    quantity: 5,
  }); 
  public filtersObservable = this.filters.asObservable();


  url = "http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane";  

  constructor(private http : Http) { }


  getCountries(){
    return this.http.get(this.url)
      .map((res)=>{
        this.data = res.json();
        return this.data.geonames
      })
  }

  updateFilters(filters){
    this.filters.next(filters)
  }

}
