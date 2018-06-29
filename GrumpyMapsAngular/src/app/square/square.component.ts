import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Square } from '../domain/square';
import { DnDMap } from '../domain/dn-dmap';
import { Player } from '../domain/player';
import { MapDetailComponent } from '../map-detail/map-detail.component';
import { SquareDetailComponent } from '../square-detail/square-detail.component';
import { MapShareService } from '../map-share.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  @Input()  square: Square;
  @Input() squareIndex:number;
  private rowIndex:number;
  @Input() set _rowIndex(rowIndex: number) {
      this.rowIndex=rowIndex;
      this.setRowIndexLetter();
  }
  rowIndexAsLetter:string;
  private _squareHeightWidth: string;
  @Input() set squareHeightWidth(squareHeightWidth: string) {
      this._squareHeightWidth = squareHeightWidth;
      this.squareStyles['width'] = squareHeightWidth;
      this.setSquareMapCoordinates();
  }
  @Input() obstructionMode: boolean = false;
  @Input() movementMode: boolean;
  @Output() moveModeEvent = new EventEmitter<boolean>();
  @Output() setRangeSquaresEvent = new EventEmitter<number[]>();
  private _inRangeSquares: Square[] = new Array();
  @Input() set inRangeSquares(squares: Square[]) {
      this._inRangeSquares = squares;
      this.setRangeSquareStyles();
  }

  squareStyles = {};
  @Input() set _squareBorderStyles(squareBorderStyle: string) {
      this.squareStyles['border'] = squareBorderStyle;
  }
  playerNameStyles = {};
  @Input() playerToMove: Player;

  squarerangetruecounter=0;


  constructor(private mapShareService: MapShareService) { }

  ngOnInit() {

    this.squareStyles = {
      'width': this._squareHeightWidth
    }
    this.setObstructionStyle();

  }

  selectSquare() {
//    console.log("inrange: " + this.square.inRange);
    this.mapShareService.setSquare(this.square); //update active square in squareDetail via mapShareService

    // style squares if obstruct mode is on
    if (this.obstructionMode) {
        this.setObstruction();
    }

    // move an object from a square to a square if movementMode is on
    if (this.movementMode) {
        this.moveObject();
    }

    // after moving the rangeSquares is always set to nothing so it stops showing range
    this.setRangeSquaresEvent.emit([0]);
  }

  private setObstruction(){
      var isObstructed = this.square.obstructed;
      if (!isObstructed) {
          this.square.obstructed = true;
      }
      else {
          this.square.obstructed = false;
      }
      console.log("square " + this.square.mapSquareId + " is obstructed: " + this.square.obstructed);
      this.setObstructionStyle();
  }

  private setObstructionStyle(){
      // style squares if obstruct mode is on
      var isObstructed = this.square.obstructed;

        if (isObstructed) {
          this.squareStyles['background-color'] = 'rgba(161, 0, 0, 0.35)';
        }
        else {
          this.squareStyles['background-color'] = 'rgba(161, 0, 0, 0)';
        }
    }

    private moveObject(){
        var squareIdInRange = false;
        for (var i = 0; i < this._inRangeSquares.length; i++) {
            if (this._inRangeSquares[i].mapSquareId == this.square.mapSquareId) {
                squareIdInRange = true;
            }
        }
        if (squareIdInRange) {
            this.square.addPhysical(this.playerToMove);
        }
        else {
            var movingPlayerSquareID = this.playerToMove.mapSquareId;
            for (var j = 0; j < this._inRangeSquares.length; j++) {
                if (movingPlayerSquareID == this._inRangeSquares[j].mapSquareId) {
                    this._inRangeSquares[j].addPhysical(this.playerToMove);
                }
            }
        }
        this.playerToMove.isSelected = false;
        this.moveModeEvent.emit(false);
    }

  public setRangeSquareStyles() {
      if (this._inRangeSquares.length!=0){
          for(var i=0;i<this._inRangeSquares.length;i++){
              if (this._inRangeSquares[i].mapSquareId == this.square.mapSquareId){
                  this.square.inRange = true;
              }
          }
      }
      else {
          this.square.inRange = false;
      }

      if (this.square.inRange){
          this.squarerangetruecounter++;
      }
    if (!this.square.obstructed) {
      if (this.square.inRange) {
        this.squareStyles['background-color'] = 'rgba(8, 161, 0, 0.5)';
      }
      else {
        this.squareStyles['background-color'] = 'rgba(8, 161, 0, 0)';
      }
    }
  }

  private setSquareMapCoordinates(){
      this.square.mapCoordinate = this.rowIndexAsLetter+ (this.squareIndex+1);
  }

  private setRowIndexLetter(){
      switch(this.rowIndex) {
          case 1: {
              this.rowIndexAsLetter="A";
              break;
          }
          case 2: {
              this.rowIndexAsLetter="B";
              break;
          }
          case 3: {
              this.rowIndexAsLetter="C";
              break;
          }
          case 4: {
              this.rowIndexAsLetter="D";
              break;
          }
          case 5: {
              this.rowIndexAsLetter="E";
              break;
          }
          case 6: {
              this.rowIndexAsLetter="F";
              break;
          }
          case 7: {
              this.rowIndexAsLetter="G";
              break;
          }
          case 8: {
              this.rowIndexAsLetter="H";
              break;
          }
          case 9: {
              this.rowIndexAsLetter="I";
              break;
          }
          case 10: {
              this.rowIndexAsLetter="J";
              break;
          }
          case 11: {
              this.rowIndexAsLetter="K";
              break;
          }
          case 12: {
              this.rowIndexAsLetter="L";
              break;
          }
          case 13: {
              this.rowIndexAsLetter="M";
              break;
          }
          case 14: {
              this.rowIndexAsLetter="N";
              break;
          }
          case 15: {
              this.rowIndexAsLetter="O";
              break;
          }
          case 16: {
              this.rowIndexAsLetter="P";
              break;
          }
          case 17: {
              this.rowIndexAsLetter="Q";
              break;
          }
          case 18: {
              this.rowIndexAsLetter="R";
              break;
          }
          case 19: {
              this.rowIndexAsLetter="S";
              break;
          }
          case 20: {
              this.rowIndexAsLetter="T";
              break;
          }
          case 21: {
              this.rowIndexAsLetter="U";
              break;
          }
          case 22: {
              this.rowIndexAsLetter="V";
              break;
          }
          case 23: {
              this.rowIndexAsLetter="W";
              break;
          }
          case 24: {
              this.rowIndexAsLetter="X";
              break;
          }
          case 25: {
              this.rowIndexAsLetter="Y";
              break;
          }
      }
  }
}
