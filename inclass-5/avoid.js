window.onload = function (){
    let btn = document.getElementById("click_btn");

    let movebtn = function (){
        console.log("mouse approaching");
        let direction = ["left","right","top", "bottom"];
        const dir = Math.floor((Math.random() * 4));
        const dist = Math.floor((Math.random() * 50) + 8);
        const move = "padding-"+ direction[dir]+":"+dist+"em;";
        document.getElementById("btn_box").style = move;
        console.log(move);
    }
    btn.addEventListener("mouseover", movebtn);
}
