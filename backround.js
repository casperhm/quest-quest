var ctx;
var area = 1;
var backRoundFrame = 0;
var backRoundImage = SPAWN_CAVE_BACKROUND[backRoundFrame];

document.addEventListener("DOMContentLoaded", function () {
    startBackround();
});

function startBackround() {
    // The startCanvas() function sets up the game. 
    // This is where all of the once off startup stuff should go
    ctx = document.getElementById("myCanvas").getContext("2d");
    console.log("backRoundFrame", backRoundFrame, "backRoundImage", backRoundImage);

    // This timer sets the framerate.
    timer = setInterval(updateBackround, 30);

}

console.log("backround go");



function updateBackround() {

    backRoundAnimation();

    //this function is run every frame. most of the code goes here

    //draw the backround
    ctx.drawImage(backRoundImage.img, 0, 0, backRoundImage.width, backRoundImage.height);

    function backRoundAnimation() {
        if (area == 1) {
            backRoundFrame++;
            if (backRoundFrame > 7) {
                backRoundFrame = 1;
            }
        }
    }

}