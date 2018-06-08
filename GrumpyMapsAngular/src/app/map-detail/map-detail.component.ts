
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DnDMapService } from '../dn-dmap.service'
import { DnDMap } from '../domain/dn-dmap'
import { Square } from '../domain/square'

import { SquareDetailShareService } from '../square-detail-share.service';
import { SquareComponent } from '../square/square.component';
import { SquareDetailComponent } from '../square-detail/square-detail.component';


@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.css'],
  providers: [DnDMapService, SquareDetailShareService]
})

export class MapDetailComponent implements OnInit {
  mapForm = new FormGroup({
    heightwidth: new FormControl(),
    feet: new FormControl(),
    imageUrl: new FormControl(),
    gridToggle: new FormControl()
  });

  allSquares: Square[];
  dndMap: DnDMap;
  mapBackground = {};
  squareStyles = {};
  squareScale: string = '10%';


  constructor(private dndMapService: DnDMapService, private squareDetailShareService: SquareDetailShareService) { }


  ngOnInit() {
    //TODO dndmap should be created with a unique number as an id (first parameter): Get last map id from database, add 1.
    this.dndMap = new DnDMap(0, 10, 5);
    this.allSquares = this.dndMap.getSquares();
  }

  public uploadImage() {
    const imageUrl = this.mapForm.get('imageUrl').value;
    console.log(imageUrl);
    this.dndMap.setImage(imageUrl);
    this.mapBackground = {
      'background-image': 'url(' + imageUrl + ')'
    };
    console.log(typeof this.mapBackground);

  }

  public hideGrid() {
  var gridToggle = this.mapForm.get('gridToggle').value;
  console.log(gridToggle);
  var squareBorderStyle= 'dotted 1px rgba(0,0,0,0)';
  if (!gridToggle) {
      // grid off
    squareBorderStyle = 'dotted 1px rgba(0,0,0,0.5)';
  }

  this.squareDetailShareService.setSquareBorderStyles(squareBorderStyle);

}

  public setMapScale() {
    var heightWidth = +this.mapForm.get('heightwidth').value;
    if (heightWidth > 25) {
      heightWidth = 25;
      alert("Map gridsize can't be bigger than 25x25. Therefore gridsize is set to 25x25.");
    }
    var squareSize = +this.mapForm.get('feet').value;
    if (!squareSize) {
      squareSize = 5;
      alert("Square size wasn't set and is now defaulted to 5.");
    }

    this.dndMap.setHeightWidth(heightWidth, squareSize);
    this.allSquares = this.dndMap.getSquares();

  }

  public saveMap() {
    this.dndMapService.saveMap(this.dndMap).subscribe((id: number) => this.dndMap.id = id);
  }

  /*    public retrieveMaps(){
        console.log(this.dndMapService.findAll().subscribe());
    }
  */
}
