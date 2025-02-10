
let bwLibrarian = {
sprite : null,
hitpoints : 10,
x : 150,
y : 150,
display : function(){
    imageMode(CENTER);
    image(bwLibrarian.sprite,width/2,height/2,128,128);
    textAlign(CENTER);
    textSize(20);
    text(this.hitpoints, width/2, 100);
  },

}

function preload(){
  bwLibrarian.sprite = loadImage('Resources/librarian-bw.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  bwLibrarian.display();
}

function mouseClicked(){
  console.log('Mouse X:', mouseX, '\nMouse Y:', mouseY)
  bwLibrarian.hitpoints = bwLibrarian.hitpoints-1
}