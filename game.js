/**
* Title: Game
* Author: casper
* Date: 29/08/2023
* Version: 1
* Purpose: make game
**/

function startGame() {

    //constants
    const WIDTH = 1380;
    const HEIGHT = 800;

    var ctx;

    //player variables
    // -1 if left, 0 is forward, 1 is right

    var numberOfImages = PLAYER_SPRITE_LEFT.length +
        PLAYER_SPRITE_JUMP_RIGHT.length +
        PLAYER_SPRITE_JUMP.length +
        PLAYER_SPRITE_CROUCH.length +
        PLAYER_SPRITE_JUMP_LEFT.length +
        PLAYER_SPRITE_JUMP_RIGHT.length;
    var imagesToLoad = numberOfImages;

    var jumping = false;
    var momentum = 0;
    var xMomentum = 0;
    var unCrouching = false;
    var sprinting = false;
    var onGround = true;
    var crouching = false;
    var faceingX = 0;
    var faceingY = 0; // for the future
    var playerXPosition = 30;
    var playerYPosition = 500;
    var playerSpeed = 3;
    var playerJumpHeight = 7;
    var playerJumpSpeed = 5;
    var playerSprite = PLAYER_SPRITE_RIGHT[5];

    //frame variables
    var frameRight = 0;
    var frameLeft = 0;
    var frameJump = 0;
    var frameJumpRight = 1;
    var frameJumpLeft = 1;
    var frameCrouch = 0;

    //movement flags
    var leftKey = false;
    var rightKey = false;
    var jumpKey = false;
    var horizontalKey = false;
    var upPressed = false;
    var downPressed = false;
    var leftPressed = false;
    var rightPressed = false;


    window.onload = startCanvas;


    console.log("go");
    function startCanvas() {
        // The startCanvas() function sets up the game. 
        // This is where all of the once off startup stuff should go
        ctx = document.getElementById("myCanvas").getContext("2d");

        // note for future casper: this disables pixel smoothing
        ctx.imageSmoothingEnabled = false;

        // This timer sets the framerate.
        // 10 means 10 milliseconds between frames (100 frames per second)
        timer = setInterval(gravity, 15);
        timer = setInterval(updateCanvas, 30);
        timer = setInterval(() => {
            console.log("frameJunmpRight", frameJumpRight, "fraemCeoch", frameCrouch, "onGround", onGround, "unCrouching", unCrouching);
            setSpeed();
            frameUpdate();
            directionCheck();
        }, 100);
    }

    function updateCanvas() {
        //this function is run every frame. most of the code goes here

        // Clear the frame
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);



        // move the playerXPosition
        movePlayer();


        //check the collisions
        bordercheck();

        //draw the player
        ctx.drawImage(playerSprite.img, playerXPosition, playerYPosition, playerSprite.width, playerSprite.height);

    }

    function setSpeed() {
        if (crouching == false && sprinting == false) {
            playerSpeed = 3;
        } else if (crouching == true) {
            playerSpeed = 1;
        }
    }
    function gravity() {
        if (playerYPosition > HEIGHT - playerSprite.height) {
            onGround = true;
            jumpKey = false;
            horizontalKey = false;
            jumping = false;
        }
        if (onGround == true) {
            playerYPosition = HEIGHT - playerSprite.height;
        }
        if (jumpKey && !(leftKey || rightKey)) {
            if (momentum > 0) {
                momentum -= 10;
                onGround = false;
                playerYPosition -= 5;
            } else if (momentum <= 0 && jumping) {
                onGround = false;
                playerYPosition += 15;
            }
        }
        if (jumpKey && (leftKey || rightKey)) {
            if (xMomentum < 0) {
                xMomentum += 20;
                onGround = false;
                playerXPosition += 15;
            } else if (xMomentum => 0) {
                xMomentum -= 20;
                onGround = false;
                playerXPosition -= 15;
            }
        }
    }
    function movePlayer() {
        //slide and mantle code for later
        //else if(upPressed && canMantle){
        //mantle()
        //}
        // }else if(downPressed && rightPressed){
        //    slideRight()
        // }else if(downPressed && leftPressed){
        //    slideLeft()
        /// }
        if (rightPressed) {
            playerXPosition += playerSpeed;
        } else if (leftPressed) {
            playerXPosition -= playerSpeed;
        }
        if (jumpKey && !rightKey && !leftKey) {
            jump();
        } else if (jumpKey && rightKey) {
            jumpRight();
        } else if (jumpKey && leftKey) {
            jumpLeft();
        }
        else if (downPressed) {

        }
    }

    function animatePlayerRight() {
        if (jumpKey == false) {
            playerSprite = PLAYER_SPRITE_RIGHT[frameRight - 1];

        }
    }

    function animatePlayerLeft() {
        if (jumpKey == false) {
            playerSprite = PLAYER_SPRITE_LEFT[frameLeft - 1];
        }
    }
    function animatePlayerCrouch() {
        playerSprite = PLAYER_SPRITE_CROUCH[frameCrouch - 1];
    }

    function animatePlayerJump() {
        if (jumpKey == true) {
            playerSprite = PLAYER_SPRITE_JUMP[frameJump - 1];
        }
    }

    function animatePlayerJumpRight() {
        if (horizontalKey == true)
            playerSprite = PLAYER_SPRITE_JUMP_RIGHT[frameJumpRight - 1];
    }

    function animatePlayerJumpLeft() {
        playerSprite = PLAYER_SPRITE_JUMP_LEFT[frameJumpLeft - 1];
    }

    function shouldIncrementFrameLeft() {
        return leftPressed || (faceingX == 0 && frameLeft > 0 && frameLeft <= 6 && crouching == false);
    }
    function shouldIncrementFrameRight() {
        return rightPressed || (faceingX == 0 && frameRight > 0 && frameRight <= 6 && crouching == false);
    }
    function shouldIncrementFrameCrouch() {
        return downPressed || (rightPressed && crouching == true) || (leftPressed && crouching == true) || (upPressed && unCrouching == true);
    }

    function shouldIncrementFrameJump() {
        return jumpKey && !crouching && faceingX == 0;
    }

    function shouldIncrementFrameJumpRight() {
        return jumpKey && horizontalKey && !crouching && faceingX == 1;
    }

    function shouldIncrementFrameJumpLeft() {
        return jumpKey && horizontalKey && !crouching && faceingX == -1;
    }
    function directionCheck() {
        if (rightPressed && faceingX == 0) {
            // start right animation from faceing forward
            frameRight = 7;
            faceingX = 1;
        } else if (rightPressed && faceingX < 0) {
            //start right animation from faceing left
            frameRight = 1;
            faceingX = 1;
        } else if (leftPressed && faceingX == 0) {
            frameLeft = 7;
            faceingX = -1;
        } else if (leftPressed && faceingX > 0) {
            frameLeft = 1;
            faceingX = -1;
        } else if (!rightPressed && !leftPressed && faceingX > 0) {
            faceingX = 0;
            frameLeft = 1;
        } else if (!rightPressed && !leftPressed && faceingX < 0) {
            faceingX = 0;
            frameRight = 1;
        }
        if (downPressed && !crouching) {
            crouching = true;
            frameCrouch = 1;
        } else if (upPressed && crouching) {
            crouching = false;
            unCrouching = true;
            frameCrouch = 17;
        } else if (upPressed && !crouching && !jumping) {
            frameJump = 1;
        }
        if (shouldIncrementFrameRight()) {
            animatePlayerRight();
        } else if (shouldIncrementFrameLeft()) {
            animatePlayerLeft();
        }
        if (shouldIncrementFrameCrouch()) {
            animatePlayerCrouch();
        } else if (shouldIncrementFrameJump()) {
            animatePlayerJump();
        } else if (shouldIncrementFrameJumpRight()) {
            animatePlayerJumpRight();
        } else if (shouldIncrementFrameJumpRight()) {
            animatePlayerJumpRight();
        } else if (shouldIncrementFrameJumpLeft()) {
            animatePlayerJumpLeft();
        }
    }
    function frameUpdate() {
        if (shouldIncrementFrameRight()) {
            frameRight++;
            if (frameRight >= PLAYER_SPRITE_RIGHT.length) {
                frameRight = 11;
            }
        } else if (shouldIncrementFrameLeft()) {
            frameLeft++;
            if (frameLeft >= PLAYER_SPRITE_LEFT.length) {
                frameLeft = 11;
            }
        }
        if (shouldIncrementFrameCrouch()) {
            frameCrouch++;
            if (frameCrouch == 16) {
                frameCrouch = 8;
            } else if (frameCrouch >= PLAYER_SPRITE_CROUCH.length) {
                frameCrouch = 23;
            }
            if (frameCrouch == 22) {
                unCrouching = false;
            }
        }
        if (shouldIncrementFrameJump()) {
            frameJump++;
            if (frameJump == PLAYER_SPRITE_JUMP.length) {
                if (!onGround) {
                    frameJump = 8;
                } else if (onGround) {
                    frameJump = 1;
                }
            }

        } else if (shouldIncrementFrameJumpRight() && horizontalKey == true) {
            frameJumpRight++;
            if (frameJumpRight >= PLAYER_SPRITE_JUMP_RIGHT.length) {
                frameJumpRight = 1;
            }
        } else if (shouldIncrementFrameJumpLeft() && horizontalKey == true) {
            frameJumpLeft++;
            if (frameJumpLeft >= PLAYER_SPRITE_JUMP_LEFT.length) {
                frameJumpLeft = 1;
            }
        }

    }
    function jump() {
        if (!jumping) {
            momentum = 300;
        }
        jumping = true;
    }
    function jumpLeft() {
        if (!jumping) {
            momentum = 150;
            xMomentum = -150;
        }
        jumping = true;
        playerSpeed = 6;
    }
    function jumpRight() {
        if (!jumping) {
            momentum = 150;
            xMomentum = 150;
        }
        jumping = true;
    }
    function bordercheck() {
        if (leftPressed && playerXPosition < 0) {
            playerSpeed = 0;
        } else if (rightPressed && playerXPosition + playerSprite.width > WIDTH) {
            playerSpeed = 0;
        } else {
            playerSpeed = 3;
        }
    }

    window.addEventListener('keydown', (keyboardEvent) => {
        var keyDown = keyboardEvent.key;
        //console.log("You just pressed", keyDown)

        if (keyDown == "w") {
            jumpKey = true;
        }
        if (keyDown == "a" || keyDown == "d") {
            horizontalKey = true;
        }

        if (keyDown == "w") {
            upPressed = true;
        }
        if (keyDown == "a") {
            leftPressed = true;
        }
        if (keyDown == "s") {
            downPressed = true;
        }
        if (keyDown == "d") {
            rightPressed = true;
        }
    });



    window.addEventListener('keyup', (keyboardEvent) => {
        var keyUp = keyboardEvent.key;
        //console.log("You just released", keyUp)

        if (keyUp == "w" && onGround == true) {
            jumpKey = false;
        }
        if (keyUp == "a" || keyUp == "d") {
            horizontalKey = false;
        }

        if (keyUp == "w") {
            upPressed = false;
        }
        if (keyUp == "a") {
            leftPressed = false;
        }
        if (keyUp == "s") {
            downPressed = false;
        }
        if (keyUp == "d") {
            rightPressed = false;
        }
    });
}