import { Component, OnInit, Input } from '@angular/core';
import {MapShareService} from '../map-share.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Square } from '../domain/square';
import { Player } from '../domain/player';


@Component({
  selector: 'app-square-detail',
  templateUrl: './square-detail.component.html',
  styleUrls: ['./square-detail.component.css']
})
export class SquareDetailComponent implements OnInit {

    square:Square;
    playerIdCreator:number = 1;
    movementMode:boolean = false;
    selectedPlayer:Player;
    movable:boolean = false;

    createObjectForm = new FormGroup({
      playerName: new FormControl(),
      playerColor: new FormControl(),
      playerMovement: new FormControl()
    });

  constructor(private mapShareService: MapShareService) { }

  ngOnInit() {
      this.mapShareService.squareUpdated.subscribe(square => this.square =square);

//      this.squareId = this.mapShareService.squareId;
  }

  addObject(){
      const name = this.createObjectForm.get('playerName').value;
      const color = this.createObjectForm.get('playerColor').value;
      const movement = this.createObjectForm.get('playerMovement').value;

      var player:Player = new Player(this.playerIdCreator++, name, 100, movement, 3, 2, "physical", color, this.square.mapSquareId, this.square.mapHeightWidth);

      this.square.addPhysical(player);
  }
  showRange(player:Player){
      var allRangeSquares = player.moveRange;
      player.isSelected = true;
      this.mapShareService.setAllRangeSquares(allRangeSquares);
      this.movable = true;
  }

  moveObject() {
      if (this.movable){

          var selectedPlayer;
          for(var i = 0; i < this.square.players.length; i++) {
              if(this.square.players[i].isSelected) {
                  selectedPlayer = this.square.players[i];
                  this.movementMode = true;
                  this.mapShareService.setMovementMode(true);
                  this.mapShareService.setPlayerToMove(selectedPlayer);
                  this.square.removePhysical(selectedPlayer.id);
              }
          }
          this.movable = false;
      }
  }
}
