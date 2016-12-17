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
var a = 0;

window.addEventListener("DOMContentLoaded", function(){
  CURRENTTILE = 0;
  popcontainer = document.getElementById("popups");
  var welcome = document.getElementById("welcome");
  var menu = document.getElementById("menu");
  var tileContainer = document.getElementById("tileContainer");
  var tileContainerPadder = document.getElementById("tileContainerPadder");
  var tilein = document.getElementById("tilein");
  tilein.addEventListener("input", function(e){
    console.log("Hello");
    updateCurTile();
  }, false);

  //Creates Buttons and adds event listeners
  var helpbutton = document.getElementById("helpbutton");
  helpbutton.addEventListener("click", function(e){
    createPopup("helpmsg");
  }, false);

  var fillbutton = document.getElementById("fillbutton");
  fillbutton.addEventListener("click", function(e){
    var fillID = prompt("What ID should fill the entire grid?");
    if(!(fillID == null)){
      for(var i = 0; i < TILES.length; i++){
          TILES[i].dataset.id = fillID;
          TILES[i].style.backgroundImage = "url('img/tile_" + fillID + ".png')"
      }
    }
    else{
      alert("** You have to enter an id to fill the grid **");
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
    var bgimg = prompt("Enter Background Image Path (Relative to Project Root)");
    tileContainer.style.backgroundImage = "url('" + bgimg + "')";
  }, false);

  var loadbutton = document.getElementById("loadbutton");
  loadbutton.addEventListener("click", function(e){
    createPopup("loadmsg");
  }, false);

  var zoomButton = document.getElementById("zoombutton");
  zoomButton.addEventListener("click", function(e){
    var scale = prompt("Input zoom factor");
    if(!(scale == null) && !(scale <= 0)){
      var tileArray = document.getElementsByClassName("tile");
      for(var i = 0; i < tileArray.length; i++){
        var e = tileArray[i];
        e.style.width = "" + (TILESIZE * scale).toString() + "px";
        e.style.height = "" + (TILESIZE * scale).toString() + "px";
        tileContainer.style.width = "" + (TILESIZE * scale * xLength.value) + "px";
        tileContainer.style.height = "" + (TILESIZE * scale * yLength.value) + "px";
        var ylevels = document.getElementsByClassName("ylevel");
        for(var xi = 0; xi < ylevels.length; xi++){
          ylevels.item(xi).style.height =  "" + (TILESIZE * scale).toString() + "px"
        }
      }
    }
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
    var scrollX = tileContainer.clientWidth / 4;
    window.scrollTo(scrollX,0);
  }, false);

//EOD
}, false);

function generateMap(){
  tileContainer.style.display = "block";
  createPopup("welcomemsg")
  console.log("Generating Map...")
  for(var i = 0; i < yLength.value; i++){
    var parentemp = document.createElement("div");
    parentemp.setAttribute("id", "Y-Level: " + i.toString() + "");
    parentemp.classList.add("ylevel");
    parentemp.style.height = "" + TILESIZE.toString() + "px";
    tileContainer.appendChild(parentemp);
    for(var j = 0; j < xLength.value; j++){
      var temp = document.createElement("div");
      var random = Math.floor(Math.random() * (15 - 0) + 0);
      temp.setAttribute("data-id", i);
      temp.classList.add("tile");
      temp.setAttribute("id", "y-"+i.toString()+", x-" + j.toString() + "");
      temp.style.width = "" + TILESIZE.toString() + "px";
      temp.style.height = "" + TILESIZE.toString() + "px";
      temp.style.float = "left";
      temp.style.backgroundImage = "url('img/tile_" + i + ".png')";
      temp.style.backgroundSize = "cover";
      parentemp.appendChild(temp);
    }
  }

  TILES = document.getElementsByClassName("tile");
  for(var it = 0; it < TILES.length; it++){
    TILES[it].addEventListener("click", function(e){
      console.log("Clicked");
      if(a === 0){
        a = 1;
      }
      else if(a == 1){
        a = 0;
      }
      this.dataset.id = CURRENTTILE;
      this.style.backgroundImage = 'url("img/tile_' + CURRENTTILE  +'.png")';
      console.log("A = " +a);
    }, false);

    TILES[it].addEventListener("mouseover", function(){
      console.log("YOOOOOO");
      if(a == 1){
        this.dataset.id = CURRENTTILE;
        this.style.backgroundImage = 'url("img/tile_' + CURRENTTILE  +'.png")';
      }
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
  if(id == "genmsg")
    popinner.classList.add("popupinnerbigger");
  else if (id == "loadmsg") {
    popinner.classList.add("popupinnerbiggest");
  }

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
    case "helpmsg":
        return "<h4>If you need help, please visit my <a href='https://github.com/ImFalling/Up-Up-And-Array'>GitHub</a> page, <br> and read the documentation.</h4>"
    case "genmsg":
        return "<h5>Your Array Has Been Generated Successfully:</h5><textarea id='finaloutput'>[&#10[1,2,3,4,5],/n[5,4,3,2,1]/n]</textarea>"
    case "loadmsg":
        return "<h6>Note, the syntax of your array needs to be very specific. <br> It needs to contain the enclosing brackets, but no semi-colon at the end. eg: <br>{<br>{1,2,3},<br>{1,2,3},<br>{1,2,3}<br>}<br></h6><textarea class='loading' id='loadfield'></textarea><input style='position: absolute; right: 30px; bottom: 30px;' value='Submit' type='button' onclick='loadArrayFromString()'></input>"
    default:
    "no string found"
  }
}

function loadArrayFromString(arrayString){
  var loadfield = document.getElementById("loadfield");
  var firstString = loadfield.value;
  firstString = firstString.substring(0, firstString.length - 1);
  firstString = firstString.split("{").join("");
  firstString = firstString.split("\n").join("");

  //Gets the number of rows
  var rowCount = firstString.split("}").length - 1;

  firstString = firstString.split("}").join("");

  //At this point, firstString is the raw unformatted array without the containing brackets.

  //Splits string after every line and pushes into array
  var stringArray = firstString.split(",").map(function(item) {
    return parseInt(item, 10);
  });

  var columnCount = stringArray.length / rowCount;

  console.log(rowCount, columnCount);
  console.log(stringArray);

  //Core functionality
  var kek = 0;
  for(var i = 0; i < rowCount; i++){
    for(var j = 0; j < columnCount; j++){
      var tempSelector = document.getElementById("y-"+i+", x-"+j);
      var currentID = stringArray[kek]
      tempSelector.dataset.id = currentID;
      tempSelector.style.backgroundImage = "url('img/tile_" + currentID + ".png')";
      kek++;
    }
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
