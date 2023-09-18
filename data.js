const PLAYER_SPRITE_RIGHT = [
    { src: "sloth/turn_left5" },
    { src: "sloth/turn_left4" },
    { src: "sloth/turn_left3" },
    { src: "sloth/turn_left2" },
    { src: "sloth/turn_left1" },

    { src: "sloth/sloth_forward1" },
    { src: "sloth/turn_right1" },
    { src: "sloth/turn_right2" },
    { src: "sloth/turn_right3" },
    { src: "sloth/turn_right4" },

    { src: "sloth/turn_right5" },
    { src: "sloth/walk_right1" },
    { src: "sloth/walk_right2" },
    { src: "sloth/walk_right3" },
    { src: "sloth/walk_right4" },

    { src: "sloth/walk_right5" },
    { src: "sloth/walk_right6" },
];

const PLAYER_SPRITE_LEFT = [
    { src: "sloth/turn_right5" },
    { src: "sloth/turn_right4" },
    { src: "sloth/turn_right3" },
    { src: "sloth/turn_right2" },
    { src: "sloth/turn_right1" },

    { src: "sloth/sloth_forward1" },
    { src: "sloth/turn_left1" },
    { src: "sloth/turn_left2" },
    { src: "sloth/turn_left3" },
    { src: "sloth/turn_left4" },

    { src: "sloth/turn_left5" },
    { src: "sloth/walk_left1" },
    { src: "sloth/walk_left2" },
    { src: "sloth/walk_left3" },
    { src: "sloth/walk_left4" },

    { src: "sloth/walk_left5" },
    { src: "sloth/walk_left6" },
];

const PLAYER_SPRITE_CROUCH = [
    { src: "sloth/crouch1" },
    { src: "sloth/crouch2" },
    { src: "sloth/crouch3" },
    { src: "sloth/crouch4" },
    { src: "sloth/crouch5" },

    { src: "sloth/crouch6" },
    { src: "sloth/crouch7" },
    { src: "sloth/crouch_walk1" },
    { src: "sloth/crouch_walk2" },
    { src: "sloth/crouch_walk3" },

    { src: "sloth/crouch_walk4" },
    { src: "sloth/crouch_walk5" },
    { src: "sloth/crouch_walk6" },
    { src: "sloth/crouch_walk7" },
    { src: "sloth/crouch_walk8" },

    { src: "sloth/crouch_walk9" },
    { src: "sloth/crouch7" },
    { src: "sloth/crouch6" },
    { src: "sloth/crouch5" },
    { src: "sloth/crouch4" },

    { src: "sloth/crouch3" },
    { src: "sloth/crouch2" },
    { src: "sloth/crouch1" },
];

const PLAYER_SPRITE_JUMP = [
    { src: "sloth/jump1" },
    { src: "sloth/jump2" },
    { src: "sloth/jump3" },
    { src: "sloth/jump4" },
    { src: "sloth/jump5" },

    { src: "sloth/jump6" },
    { src: "sloth/jump7" },
    { src: "sloth/jump8" },
    { src: "sloth/jump9" },
];

const PLAYER_SPRITE_JUMP_RIGHT = [
    { src: "sloth/jump_right1" },
    { src: "sloth/jump_right2" },
    { src: "sloth/jump_right3" },
    { src: "sloth/jump_right4" },
    { src: "sloth/jump_right5" },

    { src: "sloth/jump_right6" },
    { src: "sloth/jump_right7" },
    { src: "sloth/jump_right8" },
    { src: "sloth/jump_right9" },
    { src: "sloth/jump_right8" },

    { src: "sloth/jump_right7" },
    { src: "sloth/jump_right6" },
    { src: "sloth/jump_right5" },
    { src: "sloth/jump_right4" },
    { src: "sloth/jump_right3" },

    { src: "sloth/jump_right2" },
    { src: "sloth/jump_right1" },
];

const PLAYER_SPRITE_JUMP_LEFT = [
    { src: "sloth/jump_left1" },
    { src: "sloth/jump_left2" },
    { src: "sloth/jump_left3" },
    { src: "sloth/jump_left4" },
    { src: "sloth/jump_left5" },

    { src: "sloth/jump_left6" },
    { src: "sloth/jump_left7" },
    { src: "sloth/jump_left8" },
    { src: "sloth/jump_left9" },
    { src: "sloth/jump_left8" },

    { src: "sloth/jump_left7" },
    { src: "sloth/jump_left6" },
    { src: "sloth/jump_left5" },
    { src: "sloth/jump_left4" },
    { src: "sloth/jump_left3" },

    { src: "sloth/jump_left2" },
    { src: "sloth/jump_left1" },
];

const ALL_DATA = [PLAYER_SPRITE_LEFT, PLAYER_SPRITE_RIGHT, PLAYER_SPRITE_CROUCH, PLAYER_SPRITE_JUMP, PLAYER_SPRITE_JUMP_RIGHT, PLAYER_SPRITE_JUMP_LEFT];

var imagesToLoad = 0;

ALL_DATA.forEach(array => {
    imagesToLoad += array.length;
    array.forEach(e => {
        // create Image objects for all sprite image definitions, on an `img` property
        var img = new Image();
        e.img = img;
        img.onload = () => {
            // when image is loaded, save its width/height, scaled for game and decrease imagesToLoad by one
            imagesToLoad--;
            //console.log(imagesToLoad);
            e.width = img.naturalWidth * 6;
            e.height = img.naturalHeight * 6;
            if (imagesToLoad == 0) {
                startGame();
            }
        };
        img.src = e.src + ".png";
    });
});


//varibeale imagestoload put all of game.js in it it is equal to lenght of all arrays doint start game.js till it ready // if imagestoload > numberofimages / numberofimages = lenghts of all arays
//make all the images small becuase thing