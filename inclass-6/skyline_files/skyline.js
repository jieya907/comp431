'use strict'

var createApp = function(canvas) { 
    var c = canvas.getContext("2d");

    // Create the ground
    var floor = canvas.height/2
    var grad = c.createLinearGradient(0,floor,0,canvas.height)
    grad.addColorStop(0, "green")
    grad.addColorStop(1, "black")
    c.fillStyle=grad
    c.fillRect(0, floor, canvas.width, canvas.height)

    // common size for windows
    var windowSpacing = 2, floorSpacing = 3
    var windowHeight = 5, windowWidth = 3

    // colors of buildings
    var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

    function Building (x, y, h, clr) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.clr = clr;
    }

    let all_blgs = [];

    canvas.addEventListener("click", function (e) {
        console.log(e.offsetX + " " + e.offsetY);
        all_blgs.forEach(function (item) {
            const x = e.offsetX;
            const y = e.offsetY;

            const left = item.x;
            const right = item.x + item.y;
            const btop = floor - item.h;
            console.log(right + " " + left + " " + floor + " " + btop); 
            if (right > x && left <= x && floor > y && btop <= y) {
                item.h += 5;
            }
        });
    });

    var add_building = function () {
        var x0 = Math.random()*canvas.width
        var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
        var blgHeight = Math.random()*canvas.height/2
        const blgClr = blgColors[ Math.floor(Math.random()*blgColors.length)]

        all_blgs.push(new Building(x0, blgWidth,blgHeight, blgClr));
    }
    //build a building
    var build = function(x0, blgWidth, blgHeight, blgClr) { 
        c.fillStyle= blgClr;
        c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
        // fill the windows 
        for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
            for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
                if (Math.random() > 0.5) {
                    c.fillStyle="yellow"
                } else {
                    c.fillStyle="black"

                }
                c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)

            }
        }
    }


    //draw a moving sun
    function fillCircle(x, y, r, color) {
        c.fillStyle = color;
        c.beginPath();
        c.arc(x, y, r, 0, 2 * Math.PI, false);
        c.closePath();
        c.fill();
    }

    let x = 0;

    function drawCar(x){
        c.fillStyle = "blue";
        c.fillRect(x, floor - 15, 20, 10);
        fillCircle(x+17, floor -3, 3, "red");

        fillCircle(x+2, floor -3, 3, "red");
    }

    function movingCircle () {
        c.clearRect(0,0,c.canvas.width,c.canvas.height - floor); 

        fillCircle (x, 60, 30, "yellow");
        all_blgs.forEach(function(blg) {
            build(blg.x, blg.y, blg.h, blg.clr);
        });
        drawCar(x); 
        x = (x + 5) % canvas.width;
        setTimeout(movingCircle, 40);
    }
    // TODO: add a car.
    movingCircle();
    return {
        build: add_building
    }
}

window.onload = function() {
    var app = createApp(document.querySelector("canvas"))
    document.getElementById("build").onclick = app.build
}


