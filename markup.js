//Up Up and Array 2.0
//Written by Jakob Frick in December 2016
//Visit GitHub.com/ImFalling/Up-Up-And-Array for more information
// --- Markup Document

var newMarkup = `
<h2 class='horicentered'> New Tilegrid </h2>
<input class="horicentered newinputs" type="text" id="x" placeholder="X-Tiles"/>
<input class="horicentered newinputs" type="text" id="y" placeholder="Y-Tiles"/>
<input class="horicentered newinputs" type="text" id="sz" placeholder="Tile Size (px)"/>
<select value="png" class="horicentered newinputs" id="filext" placeholder="Tile Size (px)">
    <option value="jpeg">JPEG</option>
    <option value="jpg">JPG</option>
    <option value="png">PNG</option>
    <option value="bmp">BMP</option>
</select>
<button class="horicentered newinputs" onclick="submitGridSize()">Submit</button>
`;

function submitGridSize(){
    fileExtenstion = document.getElementById("filext").value;
    var inputs = document.getElementsByClassName("newinputs");
    if(!(inputs[0].value == "" || inputs[1].value == "" || inputs[2].value == "")){
        CreateTileGrid(inputs[0].value, inputs[1].value, inputs[2].value);
        document.getElementById("pallet").style.display = "block";
        UpdateCurrentTile(1);
        ClosePopups();
    }
    else
        alert("Invalid Measurements");
}

var fillMarkup = `
<h2 class='horicentered'> Fill Tilegrid </h2>
<div class="horicentered newinputs" style="width: 64px; height: 64px; border: 1px solid black;" id="preview"></div>
<input class="horicentered newinputs" type="number" value="0" id="previewNumber"/>
<button class="horicentered newinputs" onclick="submitFill()">Submit</button>
`;

function fillPost(){
    var preview = document.getElementById("preview");
    var previewNumber = document.getElementById("previewNumber");

    document.getElementById("preview").style.backgroundImage = "url("+CURRENT_TILE+"."+fileExtenstion+")";
    previewNumber.addEventListener("change", function(){
        preview.style.backgroundImage = "url(tiles/"+previewNumber.value+"."+fileExtenstion+")";
    }, false);
    previewNumber.value = CURRENT_TILE;
}

function submitFill(){
    if(ArrayIndex == undefined){
        alert("No Grid To Fill!")
        ClosePopups();
    }
    else{
        var x = document.getElementById("previewNumber").value;
        for(var i = 0; i < ArrayIndex.length; i++){
            var ArrayLayer = ArrayIndex[i];
            for(var j = 0; j < ArrayIndex[i].length; j++){
                ArrayLayer[j].setValue(x);
            }
        }
        ClosePopups();
    }
}

var bgMarkup = `
<h2 class='horicentered'> Select Background </h2>
<h3 style="display: block; position: relative;"class="horicentered">Enter path relative to project root</h3>
<input class="horicentered newinputs" id="path" type="text" placeholder="Path..."/>
<button class="horicentered newinputs" onclick="submitBGImage()">Submit</button>
`;

function submitBGImage(){
    document.getElementById("workspace").style.backgroundImage = "url(" + document.getElementById("path").value + ")";
    ClosePopups();
}

var helpMarkup = `
<h2 class='horicentered'> Need Help? </h2>
<h3 style="display: block; position: relative;"class="horicentered">Visit My GitHub Page Here</h3>
<a href="http://www.GitHub.com/ImFalling/Up-Up-And-Array/"><img style="width: 128px; height 128px;" src="http://flaticns.com/web-icons/github.png" class="horicentered newinputs imglink"/></a>
`;