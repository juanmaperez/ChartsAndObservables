import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'main-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input('values') values: Array<Object>; 

  constructor() { }

  ngOnInit() {
    console.log(this.values)
  }

}
