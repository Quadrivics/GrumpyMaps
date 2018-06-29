import {Square} from './square';

export class DnDMap {
    id:number;
    name:string;
    heightWidth:number;
    numberOfSquares:number;
    squares:Square[]= new Array();
    imageUrl:string;

    constructor(id:number, heightWidth:number, squareSize:number) {
      this.id = id;
      this.heightWidth = heightWidth;
      this.createSquares(squareSize);
    }

    getSquares(){
        return this.squares;
    }
    setHeightWidth(heightWidth:number, squareSize:number){
        this.heightWidth = heightWidth;
        this.createSquares(squareSize);
    }

    setImage(imageUrl:string) {
      this.imageUrl = imageUrl;

    }

    private createSquares(squareSize:number){

        var squareHeightWidth = 100/this.heightWidth+'%';
        this.numberOfSquares = this.heightWidth*this.heightWidth;
        this.squares = new Array();
        for (var i = 0 ; i<this.numberOfSquares ; i++){
            this.squares.push(new Square(0, i+1, squareSize, squareHeightWidth, this.heightWidth));
        }
    }
}
