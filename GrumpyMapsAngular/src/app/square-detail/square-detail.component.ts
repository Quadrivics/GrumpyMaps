import { Component, OnInit, Input } from '@angular/core';
import {SquareDetailShareService} from '../square-detail-share.service';
import { Square } from '../domain/square';
import { Player } from '../domain/player';


@Component({
  selector: 'app-square-detail',
  templateUrl: './square-detail.component.html',
  styleUrls: ['./square-detail.component.css']
})
export class SquareDetailComponent implements OnInit {

    square:Square;
  constructor(private squareDetailShareService: SquareDetailShareService) { }

  ngOnInit() {
      this.squareDetailShareService.squareUpdated.subscribe(square => this.square =square);
//      this.squareId = this.squareDetailShareService.squareId;
  }

  addObject(){
      console.log(this.square.physicals);
      var playerJan:Player = new Player(1, "Jan de Man", 100, 10, 3, 2);
      this.square.addPhysical(playerJan);
  }

}