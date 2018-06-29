import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MapShareService } from '../map-share.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Square } from '../domain/square';
import { Player } from '../domain/player';


@Component({
  selector: 'app-square-detail',
  templateUrl: './square-detail.component.html',
  styleUrls: ['./square-detail.component.css']
})
export class SquareDetailComponent implements OnInit {

  square: Square;
  playerIdCreator: number = 1;
  movementMode: boolean = false;
  @Output() moveModeEvent = new EventEmitter<boolean>();
  @Output() setRangeSquaresEvent = new EventEmitter<number[]>();
  @Output() setPlayerToMoveEvent = new EventEmitter<Player>();
  previousPlayer: Player;
  movable: boolean = false;
  playerNameColor = {};
  previousPlayerColor: string;

  createObjectForm = new FormGroup({
    playerName: new FormControl(),
    playerColor: new FormControl(),
    playerMovement: new FormControl()
  });

  constructor(private mapShareService: MapShareService) { }

  ngOnInit() {
      this.mapShareService.squareUpdated.subscribe(square => this.square =square);
      this.createObjectForm.get('playerMovement').setValue(1);
      this.createObjectForm.get('playerColor').setValue("#000");
  }

  addObject(){
      const name = this.createObjectForm.get('playerName').value;
      const color = this.createObjectForm.get('playerColor').value;
      const movement = +this.createObjectForm.get('playerMovement').value;

      var player:Player = new Player(0, this.playerIdCreator++, name, 100, movement, 3, 2, "physical", color, this.square.mapSquareId, this.square.mapHeightWidth);

      this.square.addPhysical(player);
  }

  clickPlayer(player: Player) {
      this.showRange(player);
      this.markPlayerName(player);
  }

  showRange(player:Player){
      var allRangeSquares = player.getMoveRange();
      //console.log(allRangeSquares);
      player.isSelected = true;
      this.setRangeSquaresEvent.emit(allRangeSquares);

      this.movable = true;
  }

  markPlayerName(player) {
    if (this.previousPlayer !=null){
      this.previousPlayer.color = this.previousPlayerColor;
    }
    this.previousPlayerColor = player.color;
    this.previousPlayer = player;
    player.color = "#00ff00";
  }

  moveObject() {
      if (this.movable){

          var selectedPlayer;
          for(var i = 0; i < this.square.players.length; i++) {
              if(this.square.players[i].isSelected) {
                  selectedPlayer = this.square.players[i];
                  this.movementMode = true;
                  this.moveModeEvent.emit(this.movementMode);
                  this.setPlayerToMoveEvent.emit(selectedPlayer);
                  this.square.removePhysical(selectedPlayer.id);
              }
          }
          this.movable = false;
      }
  }
}
