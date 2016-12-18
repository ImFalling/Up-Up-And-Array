//Up Up and Array 2.0
//Written by Jakob Frick in December 2016
//Visit GitHub.com/ImFalling/Up-Up-And-Array for more information
// --- Main Document

//Global vars
var CURRENT_TILE = 1;
var BRUSH_ACTIVE = false;
var cPreview;
var cPreviewNumber;
var cController;

//When all has loaded properly
window.addEventListener("DOMContentLoaded", function(){

    //Pallet Functionality
    cPreview = document.getElementById("currentTile-preview");
    cPreviewNumber = document.getElementById("currentTile-previewNumber");
    cController = document.getElementById("currentTile-controller");

    cController.addEventListener("change", function(e){
        UpdateCurrentTile(cController.value);
    }, false);

    document.getElementById("pallet").addEventListener("mouseover", function(e){
        cPreview.classList.remove("rightHeavy");
        cPreview.classList.add("horicentered");
        cPreviewNumber.classList.remove("rightHeavy");
        cPreviewNumber.classList.add("horicentered");
    }, false);
    
    document.getElementById("pallet").addEventListener("mouseleave", function(e){
        cPreview.classList.add("rightHeavy");
        cPreview.classList.remove("horicentered");
        cPreviewNumber.classList.add("rightHeavy");
        cPreviewNumber.classList.remove("horicentered");
    }, false);

    //Toolbar Functionality
    var toolbarExtended = false;
    document.getElementById("toolbar-activator").addEventListener("click", function(e){
        if(!toolbarExtended){
            document.getElementById("toolbar-container").classList.add("extended");
            toolbarExtended = true;
        }
        else{
            document.getElementById("toolbar-container").classList.remove("extended");
            toolbarExtended = false;
        }
    }, false);

    document.getElementById("toolbar-container").addEventListener("mouseleave", function(e){
        if(toolbarExtended){
            document.getElementById("toolbar-container").classList.remove("extended");
            toolbarExtended = false;
        }
    }, false);

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
        this.element.style.background = "url('tiles/"+val+"."+fileExtenstion+"')";
    }

    var _this = this;

    //Event Listeners
    this.element.addEventListener("click", function(e){
        console.log(e.target);
        _this.setValue(CURRENT_TILE);
        if(BRUSH_ACTIVE)
            BRUSH_ACTIVE = false;
        else
            BRUSH_ACTIVE = true;
    }, false);

    this.element.addEventListener("mouseover", function(e){
        if(BRUSH_ACTIVE){
            _this.setValue(CURRENT_TILE);
        }
    }, false);
}

//Tile Grid Generation Logic
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

//Close any active popups function
function ClosePopups(){
    document.getElementsByClassName("popupBG")[0].parentNode.removeChild(document.getElementsByClassName("popupBG")[0]);
}

//Update Current Tile Function
function UpdateCurrentTile(newVal){
    cPreview.style.backgroundImage = "url('tiles/"+newVal+"."+fileExtenstion+"')";
    cPreviewNumber.innerHTML = newVal;
    cController.value = newVal;
    CURRENT_TILE = newVal;
}

//Array Generation function
function GenerateArray(){
    var returnable = "{\n";
    for(var i = 0; i < ArrayIndex.length; i++){
        returnable += "{";
        for(var j = 0; j < ArrayIndex[i].length-1; j++){
            returnable += "{"+ArrayIndex[i][j].element.dataset.value+"},"
        }
        returnable += "{"+ArrayIndex[i][ArrayIndex[i].length-1].element.dataset.value+"}";
        if(i == ArrayIndex.length-1)
            returnable += "}\n";
        else
            returnable += "},\n";
    }
    returnable += "};"
    return returnable;
}