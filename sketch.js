var x = 1;
var y = 1;
var h = w = 25;
var m = 1;
var gsx = 0;
var gsy = 0;
var block = [];
var inc = 0.05;
var gridloaded = false;
var autoMargin = {x:0, y:0};
var fontsize = 12;
var zoff = 0;


function preload(){
  font = loadFont('assets/SourceSansPro-Bold.otf');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(25);

  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  var gsx = Math.floor(windowWidth/(w+m));
  var gsy = Math.floor(windowHeight/(h+m));
  var lpx = gsx*(w+m);
  var lpy = gsy*(h+m);

  autoMargin.x = ((windowWidth-lpx)/2);
  autoMargin.y = ((windowHeight-lpy)/2);

  x = x + autoMargin.x
  y = y + autoMargin.y

  for (var i = 0; i < gsx*gsy; i++) {
    block.push({x:x, y:y, s:0, b:0});
    x += w+m;
    if (x > gsx*(w+m)) {x=((windowWidth-lpx)/2)+1; y+= h+m};
    }

  }


function draw() {

  var gsx = Math.floor(windowWidth/(w+m));
  var gsy = Math.floor(windowHeight/(h+m));

  var nx = Math.floor((mouseX+autoMargin.x)/(w+m));
  var ny = Math.floor((mouseY-autoMargin.y)/(h+m));

  var lpx = gsx*(w+m);
  var lpy = gsy*(h+m);

  if (nx>gsx) {nx=gsx};
  if (ny>gsy) {ny=gsy};

  var id = (gsx*ny)+nx-1;

  noStroke();
  colorMode(HSB, 100);

 if (true) {
    if ((gridloaded == true) && (id <= block.length) && (id >= 0)) {block[id].s ++; block[id].b += 20;}
    var xoff = 0;
    var yoff = 0;
    for (var i = 0; i < block.length; i++) {
        if (i % gsx == 0) {xoff = 0; yoff += inc;};
        var hue = noise(xoff, yoff, zoff) * 150;
        if (keyIsDown(DOWN_ARROW)) {block[i].b -= 20};
        if (keyIsDown(UP_ARROW)) {block[i].b += 20};
        fill(hue, 100, block[i].b);
        rect(block[i].x, block[i].y, w, h);
        xoff += inc;
        }
    gridloaded = true;
    drawWords(windowWidth/2, 5);
  }
  zoff += 0.01;
}

function drawWords(x, y) {
  fill(255);
  text("move your mouse", x, y)
  text("press UP and DOWN to change brightness", x, windowHeight-10)
}
