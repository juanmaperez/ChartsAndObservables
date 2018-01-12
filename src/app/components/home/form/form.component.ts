import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule }from '@angular/forms';
import { ApiService } from './../../../services/api.service';

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

  @Output() changeFilters = new EventEmitter<void>()
  
  constructor(private api : ApiService) { }

  ngOnInit() {
    this.filters = this.api.filters
  }

  updateFilters(){
    this.api.updateFilters(this.filters)
    this.changeFilters.emit()
    // console.log(this.filters)
  }


}
