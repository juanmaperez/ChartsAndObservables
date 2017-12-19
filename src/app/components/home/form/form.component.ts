import { Component, OnInit } from '@angular/core';
import { FormsModule }from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';




@Component({
  selector: 'main-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  data : Array<Object> = [];
  filters : any;

  public filtersSubscription = new Subscription;
  constructor(private api : ApiService) { }

  ngOnInit() {

    this.getCountries();


    this.filtersSubscription = this.api.filtersObservable.
      subscribe((filters)=>{
        this.filters = filters;
        console.log("filter",this.filters)
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
    .take(this.filters.quantity)
    .subscribe((data)=>{
      this.data.push(data);
    });
  }

}
