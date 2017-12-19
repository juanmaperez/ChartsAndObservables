import { ApiService } from './../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
    this.api.getCountries()
    .filter((data)=>{      
      if(this.filters.continent !== "All"){
        return data.continent == this.filters.continent;        
      }else{
        return data;
      }
    })
    .switchMap(data => Observable.from(data))
    .take(parseInt(this.filters.quantity))
    .subscribe((data)=>{
      this.data.push(data);
    });
  }

}
