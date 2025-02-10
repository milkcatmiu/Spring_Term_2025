//initializing variables


//character data

let bwLibrarian;
let bwLibrarianSprite;
let bwLibrarianX = 50;
let bwLibrarianY = 100;
let bwLibrarianHP = 10;

let pinkLibrarian;
let pinkLibrarianSprite;
let pinkLibrarianX = 200;
let pinkLibrarianY = 100;
let pinkLibrarianHP = 5;

//formatting

let textPaddingX = 50;
let textPaddingY = -25;

class Character {
  constructor(sprite, xPos, yPos, hitPoints, textPaddingX, textPaddingY){
    this.sprite = sprite;
    this.xPos = xPos;
    this.yPos = yPos;
    this.hitPoints = hitPoints;
    this.textPaddingX = textPaddingX;
    this.textPaddingY = textPaddingY;
  }
  display(){
    image(this.sprite, this.xPos, this.yPos);
    textSize(20);
    text(this.hitPoints, this.xPos+this.textPaddingX, this.yPos+this.textPaddingY);
  }
  damage(damagetaken){
    this.hitPoints -= damagetaken;
  }
}

function setup() {
  createCanvas(400, 400);
  bwLibrarian = new Character(bwLibrarianSprite,
                              bwLibrarianX,
                              bwLibrarianY,
                              bwLibrarianHP,
                              textPaddingX,
                              textPaddingY);

  pinkLibrarian = new Character(pinkLibrarianSprite,
                              pinkLibrarianX,
                              pinkLibrarianY,
                              pinkLibrarianHP,
                              textPaddingX,
                              textPaddingY);
}



function preload(){
  bwLibrarianSprite = loadImage('Resources/librarian-bw.png');
  pinkLibrarianSprite = loadImage('Resources/librarian-pink.png');
}

function draw() {
  background(220);
  bwLibrarian.display();
  pinkLibrarian.display();
}

function mouseClicked(){
  console.log(mouseX, mouseY);
  if(mouseX>76 && mouseX<143 && mouseY>94 && mouseY<229){
    bwLibrarian.damage(1);
  }
  else if(mouseX>230 && mouseX<302 && mouseY>94 && mouseY<229){
    pinkLibrarian.damage(1);
  }
}