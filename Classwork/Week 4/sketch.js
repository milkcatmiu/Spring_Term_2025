
//GLOBAL VARIABLES (universally accessible)

//player stuff

let player;
let bwLibrarianSprite;
let playercoordinate = [5,5];

class Player {
  constructor(sprite, x, y, hp){
    this.playersprite = sprite;
    this.playerX = x;
    this.playerY = y;
    this.playerHP = hp;
    this.textPaddingX = 18;
    this.textPaddingY = -5;
    this.playersize = 48;
    this.playermoving = false;
    this.playermoveX = 0;
    this.playermoveY = 0;

  }
  displayplayer(){
      image(this.playersprite, this.playerX, this.playerY, this.playersize,this.playersize);
    textSize(20);
    text(this.playerHP, this.playerX+this.textPaddingX, this.playerY+this.textPaddingY);
  }
  damageplayer(damagetaken){
    this.playerHP -= damagetaken;
  }

  setdirection(direction){
    //0 = North
    //1 = East
    //2 = South
    //3 = West
    if(direction==0){
      this.playermoveX = 0;
      this.playermoveY = 1;
    }
    else if(direction==1){
      this.playermoveX = 1;
      this.playermoveY = 0;
    }
    else if(direction==2){
      this.playermoveX = 0;
      this.playermoveY = -1;
    }
    else if(direction==3){
      this.playermoveX = -1;
      this.playermoveY = 0;
    }

    
  }
}


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

let textures = [];

function preload(){
  textures[0] = loadImage('Resources/grassy.png');
  textures[1] = loadImage('Resources/stone.png');
  bwLibrarianSprite = loadImage('Resources/librarian-bw.png');
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
