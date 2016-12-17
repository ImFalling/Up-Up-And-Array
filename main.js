//Up Up and Array 2.0
//Written by Jakob Frick in December 2016
//Visit GitHub.com/ImFalling/Up-Up-And-Array for more information
// ---

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

//EOS
}, false)

//Tile Constructor
function Tile(width, height, initval){

    //Markup Logic
    var temp = document.createElement("div");
    temp.height = height + "px";
    temp.width = width + "px";
    temp.classList.add("Tile");

    //Object Logic
    this.enableBorder = function(state){
        if(state)
            temp.classList.add("hasBorder");
        else
            temp.classList.remove("hasBorder");
    }
    this.enableBorder(true);
}