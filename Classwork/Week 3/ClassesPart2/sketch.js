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

let librarians = [];
let numlibrarians = 50;
let librariansize = 48  ;

//formatting

let textPaddingX = 18;
let textPaddingY = -5;

class Character {
  constructor(sprite, xPos, yPos, hitPoints, textPaddingX, textPaddingY, size){
    this.sprite = sprite;
    this.xPos = xPos;
    this.yPos = yPos;
    this.hitPoints = hitPoints;
    this.textPaddingX = textPaddingX;
    this.textPaddingY = textPaddingY;
    this.size = size;
    this.displaying = true;
  }
  display(){
    if (this.displaying){
      image(this.sprite, this.xPos, this.yPos, this.size,this.size);
    textSize(20);
    text(this.hitPoints, this.xPos+this.textPaddingX, this.yPos+this.textPaddingY);
    }
  }
  damage(damagetaken){
    this.hitPoints -= damagetaken;
  }
}

function setup() {
  createCanvas(400, 400);
    
  for (x=0; x<numlibrarians; x++){
    librarians[x] = new Character(pinkLibrarianSprite,
      random(0,width),
      random(0,height),
      pinkLibrarianHP,
      textPaddingX,
      textPaddingY,
      librariansize);
  }
}



function preload(){
  bwLibrarianSprite = loadImage('Resources/librarian-bw.png');
  pinkLibrarianSprite = loadImage('Resources/librarian-pink.png');
}

function draw() {
  background(220);
  for (x=0; x<numlibrarians; x++){
    librarians[x].display();
  }
}

function mouseClicked(){
  console.log(mouseX, mouseY);
  for(x=0; x<numlibrarians; x++){
    if (mouseX>librarians[x].xPos && mouseX<librarians[x].xPos+librariansize && mouseY>librarians[x].yPos && mouseY<librarians[x].yPos+librariansize)
      librarians[x].displaying = false;
    //console.log('librarian X (LEFT): ',librarians[x].xPos)
    //console.log('librarian X (RIGHT): ',librarians[x].xPos+librarians[x].size)
    //console.log('librarian Y (TOP): ',librarians[x].yPos)
    //console.log('librarian Y (BOTTOM): ',librarians[x].yPos+librarians[x].size)
  }
}