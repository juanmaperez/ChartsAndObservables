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

    this.filtersSubscription = this.api.filtersObservable.
      subscribe((filters)=>{
        this.filters = filters;
      })
      
  }



}
