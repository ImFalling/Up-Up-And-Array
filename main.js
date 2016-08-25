var debug = false;
var xLength;
var yLength;
var popcontainer;
var surfaceX = document.documentElement.clientWidth - document.documentElement.clientWidth / 50;
var surfaceY = document.documentElement.clientHeight - document.documentElement.clientHeight / 50;
var TILES;

window.addEventListener("DOMContentLoaded", function(){
  popcontainer = document.getElementById("popups");
  var welcome = document.getElementById("welcome");
  var menu = document.getElementById("menu");
  var tileContainer = document.getElementById("tileContainer");
  var dropdown = document.getElementById("dropdown");
  dropdown.addEventListener("click", function(e){
    createPopup(dropdown);
  }, false);
  welcome.addEventListener("click", function(e){
    menu.classList.add("menugone");
    window.setTimeout(function(){
      yLength = document.getElementById("yin");
      xLength = document.getElementById("xin");
      console.log(yLength.value, xLength.value);
      tileContainer.style.width = "" + (64 * xLength.value) + "px";
      tileContainer.style.height = "" + (64 * yLength.value) + "px";
      generateMap();
    }, 2500)
  }, false);

//EOD
}, false);

function generateMap(){
  createPopup("welcomemsg")
  console.log("Generating Map...")
  for(var i = 0; i < yLength.value; i++){
    var parentemp = document.createElement("div");
    parentemp.setAttribute("id", "Y-Level: " + i.toString() + "");
    parentemp.style.height = "64px";
    tileContainer.appendChild(parentemp);
    for(var j = 0; j < xLength.value; j++){
      var temp = document.createElement("div");
      temp.setAttribute("data-id", 0);
      temp.classList.add("tile");
      temp.setAttribute("id", "y-"+i.toString()+", x-" + j.toString() + "");
      temp.style.width = "64px";
      temp.style.height = "64px";
      temp.style.float = "left";
      parentemp.appendChild(temp);
    }
  }

  TILES = document.getElementsByClassName("tile");
  for(var it = 0; it < TILES.length; it++){
    TILES[it].addEventListener("click", function(){
      var tileID = prompt("Select ID");
      this.setAttribute("data-id", tileID);
      this.style.backgroundImage = 'url("img/tile_' + tileID +' ")';
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
  popX.innerHTML = '<h3 style="color: red !important; text-align: right; padding-right: 10px;">&#10060</h3>';
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
        return "<h4>Hello, and welcome to this 2D Array Generator made by Jakob Frick. <br><br> For more information, visit my <a href='http://www.github.com'>GitHub</a> page</h4>"
    break;

    case "helpmsg":
        return
    break;

    default:
    "no string found"
  }
}
