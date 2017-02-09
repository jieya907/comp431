'use strict'
const RAW = 0;
const FLIPPED = 1;
const DONE = 2;
const OVER = 3;
const cookingtime = 7;

var createApp = function(canvas) {
    var c = canvas.getContext("2d")

    const off_grill = '#333300'
    const on_grill = 'maroon'
    let chosen = 0;
    const size = 50
    let item;
    let n = 15;
    let countdownTimer = undefined;
    let game_on = 0;
    let foods = []
    let score = 0;
    let item_remain;
    let level_select = 0;

    // The class for the food on the grill
    function food (type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        let time_remain = 5;
        this.numFlipped = 0;
        this.state = RAW;
        this.decrement = function () {
            return --time_remain;
        }
        this.reset = function () {
            time_remain = 5;
            draw_food(x, y, type, "yellow");

            this.state = RAW;
            return time_remain;
        }
       

    }

    const draw_grill = function (base_color) {
        //Create the grill
        // fill the color 
        // draw the boundaries 
        // draw the bars
        const x = 5
        const y = 25
        const gwidth = 500
        const gheight = 300
        const barw = 8;
        const bar_dist = 15
        c.fillStyle = base_color;
        c.fillRect(x, y, gwidth, gheight)
        c.rect(x, y, gwidth, gheight)
        c.stroke()

        const numbars = Math.ceil(gwidth/ (bar_dist+ barw))
        // draw bars 
        Array(numbars).fill().map((_, i) => {
            c.fillStyle = 'silver'
            c.fillRect(x + i * (bar_dist + barw), y, barw, gheight);
        })
    }

    // Selecting the food item to grill.
    const all_img = document.getElementsByTagName("img");
    [].forEach.call(all_img, function (img) {
        img.addEventListener("click", () => {
            item = img.id;
            if (!chosen) {
                chosen = 1;
            }
        })
    })

    function redraw() {
        if (game_on) {
            draw_grill(on_grill);
            foods.forEach( (fd)=>{
                if (fd.state === RAW) {
                    draw_food(fd.x, fd.y, fd.type, "yellow");
                } else if (fd.state === OVER) {
                    c.fillStyle = "black";
                    c.fillRect(fd.x - size/2, fd.y - size/2, size, size);

                } else if (fd.state === DONE){

                    draw_food(fd.x, fd.y, fd.type, "red");
                }
            })
        }
    }

    // x, y are the center for each food. Each food item is encapsulated in
    // a size * size square.
    const draw_food = function(x, y, type, color) {
        if (game_on) {
            const patty = document.getElementById(type);

            console.log(patty);
            c.fillStyle = color;
            c.fillRect(x - size/2, y - size/2, size, size);
            c.drawImage(patty, x - size/2, y - size/2, size, size);
            chosen = 0;
        }
    }

    function end_game() {
        n = 0;
        window.stopCountdown();
        level_select = 0;
        document.getElementById('light').style.display='block';
        document.getElementById('fade').style.display='block';
        document.getElementById("endmsg").innerHTML = 
            "Game over, your score is " + score;
        document.getElementById("restart").addEventListener("click", ()=> {
            document.getElementById('light').style.display='none';
            document.getElementById('fade').style.display='none';
            score = 0;
            document.getElementById("score").innerHTML = score; 
        })
    }
    // Update on the game every second
    const count = function() {
        let indicator = document.getElementById("indicator");
        indicator.innerHTML = n;
        foods.forEach((fd)=> {
            const time = fd.decrement();
            if (time == 0) {
                // Set the state to to-be-flipped
                fd.state = DONE;
                // Redraw the food item;
                draw_food(fd.x, fd.y, fd.type, "Red");
            } else if (time < -2) {
                // Overcooked, penalty
                c.fillStyle = "black"
                c.fillRect(fd.x - size/2, fd.y - size/2, size, size);
                fd.state = OVER;
            }
        })
        if (n <= 0) {
            end_game();
        }
        n--;
    }

    window.stopCountdown = function() {
        clearInterval(countdownTimer);
        countdownTimer = undefined;
        draw_grill(off_grill);
        game_on = 0;
    }

    draw_grill(off_grill)

    const start_game = function () {
        if (level_select) {
            foods = [];
            [].forEach.call(document.getElementsByClassName("col-xs-4"), (d)=> {
                d.style.visibility = 'visible';
            })
            draw_grill(on_grill)
            if (!countdownTimer) {
                countdownTimer = setInterval(count,1000)
                game_on = 1;
            }
        }
    }

    // base on user's selection of difficulty, set difficulty.
    const set_level = function () {
        const level = document.getElementById("droplist");
        level_select = 1;
        switch (level.value) {
            case "l1":
                n = 20;
                set_items(1);
                break;
            case "l2":
                n = 25;
                set_items(2);
                break;
            case "l3":
                n = 30;
                set_items(3);
                break;
            case "l4":
                n = 40;
                set_items(4);
                break;
        }
    }

    const set_items = function (n) {
        let items = document.getElementsByClassName("item_count") ;
        //console.log(items)
        item_remain = [].slice.call(items).reduce((o, v) => {
            //   console.log(v);
            //  console.log(v.previousElementSibling.id);
            o[v.previousElementSibling.id] = n;
            v.innerHTML = n;
            return o;
        }, {})
        //console.log(item_remain)
        return item_remain;
    }

    let toAdd = false;
    // Return the list of food that needs to be remained.
    function onFood(e) {
        return foods.filter(function (f) {
            const left = f.x - size/2;
            const right = f.x + size/2;
            const ftop = f.y - size/2;
            const fbot = f.y + size/2;

            const x = e.offsetX;
            const y = e.offsetY;

            // v.innerHTML = n;
            // Clicked on the food item
            //console.log(left + " " + right + " " + ftop + " " + fbot);
            if (right > x && left <= x && fbot > y && ftop <= y) {
                console.log (f.state)
                if (f.state === DONE) {
                    f.numFlipped++;
                    if (f.numFlipped == 2) {
                        // Update the player's score. 
                        score++;
                        document.getElementById("score").innerHTML = score;

                        return false
                    } else {
                        f.reset();
                    }
                }
                toAdd = false;
            }  
            return true;

        })
    }

    document.getElementById("showinst").addEventListener("mousedown", ()=>{
        document.getElementById("instruction").style.display = "block";
    })

    document.getElementById("showinst").addEventListener("mouseup", ()=>{
        document.getElementById("instruction").style.display = "none";
    })
    canvas.addEventListener("click", function(e) {
        // check if the food is clicking on existing food. 
        toAdd = true;
        const clked = onFood(e);
        if (clked.length == foods.length && toAdd && chosen&&game_on) {
            // If nothing is clicked, draw the food and add it to existing.
            // Update the remaining food count
            const foodElement = document.getElementById(item);
            foodElement.nextElementSibling.innerHTML--;
            //console.log(item_remain);
            if (--item_remain[item] == 0 ) {

                //console.log(foodElement.parentElement);
                foodElement.parentElement.style.visibility = 'hidden';
            }
            draw_food(e.offsetX, e.offsetY, item, "yellow");
            foods.push(new food(item, e.offsetX, e.offsetY));
        } else if (clked.length !== foods.length) {
            foods = clked;
            redraw();
        }

    })

    return {
        on: start_game,
        level: set_level
    }

}
window.onload = function() {
    var app = createApp(document.querySelector("canvas"))
    document.getElementById("start").onclick = app.on
    document.getElementById("level").onclick = app.level
}
