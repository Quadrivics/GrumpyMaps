import { Component, OnInit, Input } from '@angular/core';
import { Square } from '../domain/square';
import { DnDMap } from '../domain/dn-dmap';
import { MapDetailComponent } from '../map-detail/map-detail.component';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

    @Input()
    squareScale:string;
    @Input()
    squareId:number;

    squareStyles = {};
  constructor() { }

  ngOnInit() {
      this.squareStyles = {
          'width': this.squareScale,
          'height': this.squareScale,
      }
  }

  selectSquare(){
      console.log(this.squareId);

  }

}
