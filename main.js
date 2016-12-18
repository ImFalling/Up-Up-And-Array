//Up Up and Array 2.0
//Written by Jakob Frick in December 2016
//Visit GitHub.com/ImFalling/Up-Up-And-Array for more information
// --- Main Document

//When all has loaded properly
window.addEventListener("DOMContentLoaded", function(){

    //Toolbar Functionality
    var toolbarExtended = false;
    document.getElementById("toolbar-activator").addEventListener("click", function(e){
        if(!toolbarExtended){
            document.getElementById("toolbar").classList.add("extended");
            toolbarExtended = true;
        }
        else{
            document.getElementById("toolbar").classList.remove("extended");
            toolbarExtended = false;
        }
    }, false)

    var buttons = document.getElementsByClassName("toolbarButton");
    for(var i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(e){
            getActionFromName(this.dataset.action);
        }, false);
    };

//EOS
}, false)

//Tile Constructor
function Tile(width, height, initval){

    //Markup Logic
    this.element = document.createElement("div");
    this.element.style.height = height + "px";
    this.element.style.width = width + "px";
    this.element.classList.add("Tile");
    this.element.dataset.value = initval;
    this.element.style.backgroundImage = "url('tiles/"+initval+"."+fileExtenstion+"')";
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundRepeat = "no-repeat";

    //Object Logic
    var border = false;

    this.toggleBorder = function(){
        if(!border){
            this.element.classList.add("hasBorder");
            border = true;
        }
        else{
            this.element.classList.remove("hasBorder");
            border = false;
        }
    }

    this.setValue = function(val){
        this.element.dataset.value = val;
        this.element.style.background = "url('tiles/"+val+"')";
    }
}

var ArrayIndex;
var fileExtenstion = "png";

function CreateTileGrid(width, height, size){
    console.log("Creating a Tile Grid with the dimensions "+ width +" and "+ height);
    ArrayIndex = [];
    var context = document.getElementById("workspace");
    
    while (context.hasChildNodes()) {
        context.removeChild(context.lastChild);
    }

    context.style.width = width * size + "px";
    context.style.height = height * size + "px";
    context.style.display = "block";

    for(var i = 0; i < height; i++){
        var arrayLayer = [];
        var layer = document.createElement("div");
        layer.style.width = "100%";
        layer.style.height = size + "px";

        for(var j = 0; j < width; j++){
            var tile = new Tile(size, size, 0);
            tile.toggleBorder();
            arrayLayer.push(tile);
            layer.appendChild(tile.element);
        }

        ArrayIndex.push(arrayLayer);
        context.appendChild(layer);
    }

}

function ClosePopups(){
    document.getElementsByClassName("popupBG")[0].parentNode.removeChild(document.getElementsByClassName("popupBG")[0]);
}