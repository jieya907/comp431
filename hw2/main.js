
window.onload = function () {

    const img_rotate = [
        {"id": "img1", "backup":["http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-17.jpg","http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-18.jpg","http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-19.jpg", "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-20.jpg"]},
        {"id": "img2", "backup":["http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg","http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-3.jpg","http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-4.jpg", "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-5.jpg"]},
        {"id": "img3", "backup":["http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-7.jpg","http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg","http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-9.jpg", "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-10.jpg"]},
        {"id": "img4", "backup":["http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-12.jpg","http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-13.jpg","http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-14.jpg", "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-15.jpg"]},
    ]

    // Setting the image rotation, stop and restart interval
    // button for each image
    img_rotate.forEach(function(item) {
        let idx = 0;
        const imageUpdateRate = (0.5*Math.random()+1) * 500; 
        
        //cache the images for rotating
        let imgList = item.backup.map(function (src) {
            let img = new Image();
            img.src = src;
            img.id = item.id;
            return img;
        });

        let img_obj = document.getElementById(item.id);
        const rotate = function() {
            idx = (idx+1) % item.backup.length;
            document.getElementById(item.id).src = imgList[idx].src; 
        };

        let interval = setInterval(rotate, imageUpdateRate);
        // so that we can access the bottons in the same cell of the table
        const cell = img_obj.parentNode.parentNode;

        const stop_btn = cell.getElementsByClassName("stop")[0];
        stop_btn.addEventListener("click", function () {
            clearInterval(interval);
            interval = undefined;
        });

        const start_btn = cell.getElementsByClassName("start")[0];
        start_btn.addEventListener("click", function () {
            if (!interval){
                interval = setInterval(rotate, imageUpdateRate);
            }
        });

    });

}
