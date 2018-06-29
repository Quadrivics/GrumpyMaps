import { Player } from './player';

export class Square {
    id:number;
  mapSquareId: number;
  mapCoordinate:string;
  squareHeightWidth: string;
  squareSize: number;
  mapHeightWidth: number;
  obstructed: boolean = false;
  inRange: boolean = false;
  mapId:number;
  players: Player[] = new Array();
  numberofPlayers:number;

  constructor(id:number, mapSquareId: number, squareSize: number, squareHeightWidth: string, heightWidth: number) {
    this.id = id;
    this.mapSquareId = mapSquareId;
    this.squareHeightWidth = squareHeightWidth;
    this.squareSize = squareSize;
    this.mapHeightWidth = heightWidth;
  }

  setMapId(mapId:number){
      this.mapId = mapId;
  }

  addPhysical(player: Player) {
    player.setMapSquareId(this.mapSquareId);
    this.players.push(player);
    this.numberofPlayers=this.players.length;
  }

  removePhysical(id) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].id == id) {
        this.players.splice(i, 1);
        this.numberofPlayers=this.players.length;
      }
    }
  }

}
