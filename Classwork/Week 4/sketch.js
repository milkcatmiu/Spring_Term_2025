
//GLOBAL VARIABLES (universally accessible)

let tileMap = [];
//array to store the entire tile map

let tilesX = 10;
let tilesY = 10;
//variables to determine how many tiles there are on each axis (10 on x, 10 on y)

let tileSize = 50;
//var to determine the size of each tile in pixels

let validtiles = [[5,6],[0,8],[3,4],[3,0]];
//array to store the coordinates of any tiles that will have displayMessage called

let graphicMap = [
  //Y coordinate
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //X coordinate
]

let collisionMap = [
  //Y coordinate
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //X coordinate
]

let tileRules = [
  //Y coordinate
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //X coordinate
]

let textures = [];

function preload(){
  textures[0] = loadImage('Resources/grassy.png');
  textures[1] = loadImage('Resources/stone.png');
}

//class for the tiles
class Tile {
  constructor(tileX, tileY, tileSize, tileID){
    //takes in above variables as parameters
    this.tileX = tileX;
    this.tileY = tileY;
    //assigns the X and Y grid coordinate (not position) of the tile

    this.tileSize = tileSize;
    this.tileID = tileID;
    //assigns the size in pixels of the tile, as well as it's unique ID

    this.xPos = this.tileX * this.tileSize;
    this.yPos = this.tileY * this.tileSize;
    //assigns a position in pixels for the tile based on its grid coordinate and the tile size
  }

  debugGrid(){

    let xPadding = 2;
    let yCoordinatePadding = 8;
    let yIDPadding = 18;
    //formatting variables that add visual padding to the displayed debug info

    strokeWeight(1);
    stroke(0);
    fill(255, 168, 233);
    //formatting text, setting the thickness and colour of stroke and fill

    textSize(8);
    text("x:"+ this.tileX + "y:" + this.tileY, this.xPos + xPadding, this.yPos + yCoordinatePadding);
    //displays the X and Y grid coordinate of the current tile using padding as offset

    textSize(10);
    text("ID:" + this.tileID, this.xPos + xPadding, this.yPos + yIDPadding);
    //displays the current tile ID

    noFill();
    stroke(255, 168, 233);
    rect(this.xPos, this.yPos, this.tileSize, this.tileSize);
    //draws a square around the current tile in pink

  }

  displayMessage(){
    //function that displays Accessed above a tile

    let xPadding = 2;
    let yPadding = 40;
    //padding variables

    strokeWeight(1);
    stroke(0);
    fill(255);
    textSize(10);
    //text formatting

    text("Accessed!", this.xPos+xPadding, this.yPos+yPadding);
    //displays the text Accessed! within the tile that has this function called.

  }

  displayTile(){
    image(textures[graphicMap[this.tileY][this.tileX]], this.xPos, this.yPos);
  }

}


function setup() {
  createCanvas(500, 500);
  //creates 500x500 canvas
  
  let tileID = 0;
  //creates tileID for current tile, starting at 0

  for(let x=0; x<tilesX; x++){
    tileMap[x] = [];
    //creates an array at the current tile X

    for(let y=0; y<tilesY; y++){
      tileMap[x][y] = new Tile(x, y, tileSize, tileID);
      //creates a new tile at the current X and Y grid coordinates

      tileID++;
      //increments tileID for the next tile creation
    }
  }
}

function draw() {
  background(0);
  //sets background to black

  for (let x=0; x<tilesX; x++){
    for (let y=0; y<tilesY; y++){
      //loops through the entire grid

      tileMap[x][y].debugGrid();
      tileMap[x][y].displayTile();
      //draws the debug grid at every X and Y

      for(let i=0; i<validtiles.length; i++){
        //will cycle through every single coordinate stored within the validtiles array

        if (x === validtiles[i][0] && y === validtiles[i][1]) {
          //checks if the current grid X and Y matches the current validtiles coordinate being checked

          tileMap[x][y].displayMessage();
          //if found a match, will display the Accessed message
        }        
      }
    }
  }
}
