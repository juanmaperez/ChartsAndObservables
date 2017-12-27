import { ApiService } from './../../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'main-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

 filters
  
  @Input()
  values : any;

  constructor(private api : ApiService) { }

  ngOnInit() {
    this.filters =this.api.filters;
    
  }

}
