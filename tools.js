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
    new Popup(350, 280, newMarkup);
}

function fillAction(){

}