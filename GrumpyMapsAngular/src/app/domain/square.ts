import { Player } from './player';

export class Square {
  mapSquareId: number;
  squareScale: string;
  squareSize: number;
  mapHeightWidth: number;
  obstructed: boolean = false;
  inRange: boolean = false;
  players: Player[] = new Array();

  constructor(mapSquareId: number, squareSize: number, squareScale: string, heightWidth: number) {
    this.mapSquareId = mapSquareId;
    this.squareScale = squareScale;
    this.squareSize = squareSize;
    this.mapHeightWidth = heightWidth;
  }

  addPhysical(player: Player) {
    player.setSquareId(this.mapSquareId);
    this.players.push(player);
  }

  removePhysical(id) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].id == id) {
        this.players.splice(i, 1);
      }
    }
  }
}
