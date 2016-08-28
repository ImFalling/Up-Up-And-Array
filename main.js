var debug = false;
var xLength;
var yLength;
var popcontainer;
var surfaceX = document.documentElement.clientWidth - document.documentElement.clientWidth / 50;
var surfaceY = document.documentElement.clientHeight - document.documentElement.clientHeight / 50;
var interval;
var TILES;
var CURRENTTILE;
var TILESIZE;
var FINALSTRING;
var grid = true;

window.addEventListener("DOMContentLoaded", function(){
  CURRENTTILE = 0;
  popcontainer = document.getElementById("popups");
  var welcome = document.getElementById("welcome");
  var menu = document.getElementById("menu");
  var tileContainer = document.getElementById("tileContainer");
  var tileContainerPadder = document.getElementById("tileContainerPadder");

  //Creates Buttons and adds event listeners
  var helpbutton = document.getElementById("helpbutton");
  helpbutton.addEventListener("click", function(e){
    createPopup("helpmsg");
  }, false);

  var palletbutton = document.getElementById("palletbutton");
  palletbutton.addEventListener("click", function(e){
    createPopup("palletmsg");
    tilein.value = CURRENTTILE;
    tileDisplay.innerHTML = "" + CURRENTTILE.toString() + "";
  }, false);

  var fillbutton = document.getElementById("fillbutton");
  fillbutton.addEventListener("click", function(e){
    var fillID = prompt("What ID should fill the entire grid?");
    for(var i = 0; i < TILES.length; i++){
      TILES[i].dataset.id = fillID;
      TILES[i].style.backgroundImage = "url('img/tile_" + fillID + ".png')"
    }
  }, false);

  var generatebutton = document.getElementById("generatebutton");
  generatebutton.addEventListener("click", function(e){
    createPopup("genmsg");
    var finaloutput = document.getElementById("finaloutput");
    generateArray();
    finaloutput.innerHTML = FINALSTRING;
  }, false);

  var gridbutton = document.getElementById("gridbutton");
  gridbutton.addEventListener("click", function(e){
    if(grid){
      grid = false;
      for(var i = 0; i < TILES.length; i++){
        TILES[i].classList.add("noGrid");
      }
    }
    else{
      grid = true;
      for(var i = 0; i < TILES.length; i++){
        TILES[i].classList.remove("noGrid");
      }
    }
  }, false);

  var backgroundbutton = document.getElementById("backgroundbutton");
  backgroundbutton.addEventListener("click", function(e){
    var bgimg = prompt("Enter Background Image Path (Relative to Project Root) (demo: img/bg.png [5x5 size])");
    tileContainer.style.backgroundImage = "url('" + bgimg + "')";
  }, false);

  welcome.addEventListener("click", function(e){
    menu.classList.add("menugone");
    yLength = document.getElementById("yin");
    xLength = document.getElementById("xin");
    TILESIZE = document.getElementById("sizein").value;
    tileContainer.style.width = "" + (TILESIZE * xLength.value) + "px";
    tileContainer.style.height = "" + (TILESIZE * yLength.value) + "px";
    tileContainerPadder.style.width = "" + (TILESIZE * xLength.value) + "px";
    tileContainerPadder.style.height = "" + (TILESIZE * yLength.value) + "px";
    generateMap();
  }, false);

//EOD
}, false);

function generateMap(){
  tileContainer.style.display = "block";
  window.scrollTo(0,0);
  createPopup("welcomemsg")
  console.log("Generating Map...")
  for(var i = 0; i < yLength.value; i++){
    var parentemp = document.createElement("div");
    parentemp.setAttribute("id", "Y-Level: " + i.toString() + "");
    parentemp.style.height = "" + TILESIZE.toString() + "px";
    tileContainer.appendChild(parentemp);
    for(var j = 0; j < xLength.value; j++){
      var temp = document.createElement("div");
      temp.setAttribute("data-id", 0);
      temp.classList.add("tile");
      temp.setAttribute("id", "y-"+i.toString()+", x-" + j.toString() + "");
      temp.style.width = "" + TILESIZE.toString() + "px";
      temp.style.height = "" + TILESIZE.toString() + "px";
      temp.style.float = "left";
      parentemp.appendChild(temp);
    }
  }

  TILES = document.getElementsByClassName("tile");
  for(var it = 0; it < TILES.length; it++){
    TILES[it].addEventListener("click", function(){
      this.dataset.id = CURRENTTILE;
      this.style.backgroundImage = 'url("img/tile_' + CURRENTTILE  +'.png")';
    }, false);
  }

}

function createPopup(id){
  //Creates first div, the background layer and appends it to DOM
  var pop = document.createElement("div");
  pop.classList.add("popupouter");
  pop.setAttribute("id", id);
  popcontainer.appendChild(pop);

  //Creates inner div, which is where all the content is
  var popinner = document.createElement("div");
  popinner.classList.add("popupinner");
  pop.appendChild(popinner);

  //Creates X mark to close and remove popup
  var popX = document.createElement("div");
  popX.innerHTML = '<h3>&#10060</h3>';
  popX.setAttribute("class", "cross");
  popX.addEventListener("click", function close(){
    pop.parentNode.removeChild(document.getElementById(id));
    popX.removeEventListener("click", close, false);
  }, false);
  popinner.appendChild(popX);

  var innerText = document.createElement("div");
  innerText.innerHTML = "" + getString(id);
  popinner.appendChild(innerText);

}


//STRING FINDER FOR STORING STRINGS, IGNORE

function getString(id){
  switch (id) {
    case "welcomemsg":
        return "<h4>Hello, and welcome to this 2D Array Generator made by Jakob Frick. <br><br> For more information, visit my <a href='https://github.com/ImFalling/Up-Up-And-Array'>GitHub</a> page</h4>"
    break;

    case "helpmsg":
        return "<h4>If you need help, please visit my <a href='https://github.com/ImFalling/Up-Up-And-Array'>GitHub</a> page, <br> and read the documentation.</h4>"
    break;

    case "palletmsg":
        return "<h4>Choose your Tile. <br> Current Tile is: <span id='tileDisplay'>" + CURRENTTILE + "</span><br>Preview<br><img id='preview' style='transform: scale(0.7)' src='img/tile_" + CURRENTTILE + ".png'><br><input onclick='updateCurTile()' type='number' name='name' value='0' id='tilein'></h4>"
    break;

    case "genmsg":
        return "<h5>Your Array Has Been Generated Successfully:</h5><textarea id='finaloutput'>[&#10[1,2,3,4,5],/n[5,4,3,2,1]/n]</textarea>"

    default:
    "no string found"
  }
}

function updateCurTile(){
  var preview = document.getElementById("preview");
  var submitID = document.getElementById('submitID');
  var tilein = document.getElementById('tilein');
  var tileDisplay = document.getElementById("tileDisplay");
  CURRENTTILE = tilein.value;
  tileDisplay.innerHTML = "" + CURRENTTILE.toString() + "";
  preview.setAttribute("src", "img/tile_" + CURRENTTILE + ".png")
}

//Horrendously written function created while intoxicated. Too lazy to fix.
function generateArray(){
  FINALSTRING = "{&#10";
  var tempresult = "";
  var idselection;
  var i = 0;
  var j = 0;

  for(i = 0; i <= yLength.value - 2 ; i++){
    tempresult += "{";
    for(j = 0; j <= xLength.value - 2; j++){
      idselection = document.getElementById("y-"+i.toString()+", x-"+j.toString()+"");
      tempresult += "" + idselection.dataset.id + ",";
    }
    idselection = document.getElementById("y-" + i.toString() + ", x-" + (xLength.value - 1).toString() + "");
    tempresult += "" + idselection.dataset.id + "},&#10";
  }
  tempresult += "{"
  for(j = 0; j <= xLength.value - 2; j++){
    idselection = document.getElementById("y-"+i.toString()+", x-"+j.toString()+"");
    tempresult += "" + idselection.dataset.id + ",";
  }
  idselection = document.getElementById("y-" + i.toString() + ", x-" + (xLength.value - 1).toString() + "");
  tempresult += "" + idselection.dataset.id + "}&#10";

  tempresult += "}";
  FINALSTRING += tempresult;
}
