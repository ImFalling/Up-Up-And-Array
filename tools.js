//Up Up and Array 2.0
//Written by Jakob Frick in December 2016
//Visit GitHub.com/ImFalling/Up-Up-And-Array for more information
// --- Tools and Functions Document

function getActionFromName(string){
    switch(string){
        case "new":
            newAction();
            break;
        case "fill":
            fillAction();
            break;
        case "genArray":
            genAction();
            break;
        case "setBG":
            bgAction();
            break;
        case "grid":
            gridAction();
            break;
        case "load":
            loadAction();
            break;
        case "zoom":
            zoomAction();
            break;
        case "help":
            helpAction();
            break;
    }
}

function Popup(width, height, content){
    var bg = document.createElement("div");
    bg.classList.add("popupBG");
    bg.addEventListener("click", function(e){
        if(e.target == bg)
            bg.parentNode.removeChild(bg);
    }, false);

    var x = document.createElement("div");
    x.style.width = width + "px";
    x.style.height = height + "px";
    x.innerHTML = content;

    x.classList.add("centered");
    x.classList.add("popup");

    bg.appendChild(x);
    document.body.appendChild(bg);
}


//Button actions
function newAction(){
    new Popup(350, 310, newMarkup);
}

function fillAction(){
    new Popup(300, 250, fillMarkup);
    fillPost();
}

function genAction(){
    new Popup(600, 450, genMarkup)
    genPost();
}

function bgAction(){
    new Popup(350, 225, bgMarkup);
}

function gridAction(){
    for(var i = 0; i < ArrayIndex.length; i++){
        for(var j = 0; j < ArrayIndex[i].length; j++){
            ArrayIndex[i][j].toggleBorder();
        }
    }
}

function loadAction(){
    new Popup(600, 500, loadMarkup);
}

function zoomAction(){
    new Popup(300, 250, zoomMarkup);
}

function helpAction(){
    new Popup(350, 280, helpMarkup);
}

//"Zoom" function scales the workspace
function ResizeTilegrid(scalefactor){
    document.getElementById("workspace").style.transform = "scale("+scalefactor+")";
}

//Close any active popups function
function ClosePopups(){
    var popups = document.getElementsByClassName("popupBG");
    var i = 0;
    while(popups.length != 0){
        popups[i].parentNode.removeChild(popups[i]);
    }
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

//Array Parsing Function
//Horrendously written, but I can't be bothered to improve it.
function ParseArray(toParse){
    toParse = toParse.replace(/{/g, "");
    toParse = toParse.replace(/}/g, "");
    toParse = toParse.replace(/ /g, "");
    toParse = toParse.replace(/;/g, "");
    var StringArrays = toParse.split("\n");
    StringArrays.splice(0, 1);

    for(var i = 0; i < StringArrays.length; i++){
        var currentRow = StringArrays[i];
        if(currentRow[currentRow.length-1] == ','){
            console.log("Slicing");
            currentRow = currentRow.slice(0, currentRow.length-1);
        }
        StringArrays[i] = currentRow;
    }

    StringArrays.splice([StringArrays.length-1], 1);
    console.log(StringArrays);
    //At this point, the "array" is in the raw state, separated by commas. 
    
    if(!(StringArrays.length == ArrayIndex.length || StringArrays[0].length == ArrayIndex[0].length)){
        alert("- Warning, loaded array has different dimensions than current TileGrid - \n Expected Dimensions: " + ArrayIndex[0].length + " × " + ArrayIndex.length + ", got " + StringArrays[0].split(",").length + " × " + StringArrays.length);
    }

    else{
        for(var i = 0; i < ArrayIndex.length; i++){
            var ArrayLayer = StringArrays[i].split(",");
            for(var j = 0; j < ArrayLayer.length; j++){
                ArrayIndex[i][j].setValue(Number.parseInt(ArrayLayer[j]));
            }
        }
    }
}