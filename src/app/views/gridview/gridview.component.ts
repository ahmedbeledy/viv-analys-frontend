import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.scss']
})
export class GridviewComponent implements OnInit {

  constructor() { }

  @Input() data: any;
  @Input() state: any;

  // @Input() columns: any[] = [];
  @Output() onStateChange = new EventEmitter();

  ngOnInit(): void {
  }

}
