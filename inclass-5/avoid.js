window.onload = function (){
    let shift_pressed = false;
    let btn = document.getElementById("click_btn");

    const movebtn = function (){
        console.log("mouse approaching");
        if (!shift_pressed) {
            console.log("moving");
            let direction = ["left","top"];
            const dir = Math.floor((Math.random() * 2));
            const dist = Math.floor((Math.random() * 50) + 8);
            const move = "padding-"+ direction[dir]+":"+dist+"em;";
            document.getElementById("btn_box").style = move;
        }
    };

    const showcong = function () {
        let cong = document.createElement('div');
        cong.innerHTML = "Congratulations! <br> You won!";
        cong.style.backgroundColor = "green";
        cong.style.bordeColor = "red";
        cong.style.borderWidth = "2em";
        document.getElementsByTagName("body")[0].appendChild(cong);
    };

    const stop = function (e) {
        if (e.which || e.keyCode === 65) {
            shift_pressed = true;
        }
    };

    const back = function (e) {
        if (e.which || e.keyCode === 65) {
            shift_pressed = false;
        }
    };

    btn.addEventListener("mouseover", movebtn);
    document.addEventListener("keydown", stop);
    document.addEventListener("keyup", back);

    btn.addEventListener("click", showcong);
}


