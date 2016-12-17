//Up Up and Array 2.0
//Written by Jakob Frick in December 2016
//Visit GitHub.com/ImFalling/Up-Up-And-Array for more information
// --- Markup Document

var newMarkup = `
<h2 class='horicentered'> New Tilegrid </h2>
<input class="horicentered newinputs" type="text" id="x" placeholder="X-Tiles"/>
<input class="horicentered newinputs" type="text" id="y" placeholder="Y-Tiles"/>
<input class="horicentered newinputs" type="text" id="sz" placeholder="Tile Size (px)"/>
<button class="horicentered newinputs" onclick="submitGridSize()">Submit</button>
`;

function submitGridSize(){
    var inputs = document.getElementsByClassName("newinputs");
    if(!(inputs[0].value == "" || inputs[1].value == "" || inputs[2].value == "")){
        CreateTileGrid(inputs[0].value, inputs[1].value, inputs[2].value);
        inputs[0].parentNode.parentNode.parentNode.removeChild(inputs[0].parentNode.parentNode);
    }
    else
        alert("Invalid Measurements");
}