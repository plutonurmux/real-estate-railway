


var numFourRigh = document.getElementById("numberFourRight")
var numFourLeft = document.getElementById("numberFourLeft")



setTimeout(function(){
    numFourRigh.style.transform = "translateY(60px)"
    numFourLeft.style.transform = "translateY(-60px)"
    numFourRigh.style.transition = ".5s"
    numFourLeft.style.transition = ".5s"
    setTimeout(function(){
        numFourRigh.style.transform = "translateY(0px)"
        numFourLeft.style.transform = "translateY(0px)"
        numFourRigh.style.transition = ".5s"
        numFourLeft.style.transition = ".5s" 
    },1000)
},1200)