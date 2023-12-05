import "phaser";
import * as Globals from "./globals";
export const menuSceneKey = "MenuScene";

let platforms: Phaser.Physics.Arcade.StaticGroup;
let sloth: Phaser.Physics.Arcade.Sprite;
let faceingLeft: boolean = false;
let faceingRight: boolean = false;
let crouching: boolean = false;
let cursors: Globals.GameKeys;
let touchingGround: boolean = true;

export function cave():
    | Phaser.Types.Scenes.SettingsConfig
    | Phaser.Types.Scenes.CreateSceneFromObjectConfig {
    return {
        preload() {
            this.load.atlas(
                "walls",
                "/img/backrounds/walls.png",
                "/img/backrounds/walls.json"
            );


            this.load.atlas(
                "sloth",
                "/img/sloth/spritesheet.png",
                "/img/sloth/spritesheet.json"
            );
        },
        create() {
            platforms = this.physics.add.staticGroup();

            platforms.create(Globals.WIDTH/2, 130, "walls", "ground").refreshBody();
            platforms.create(Globals.WIDTH/2, 10, "walls", "roof").refreshBody();
            platforms.create(150, 95, "walls", "spike1").refreshBody();
            platforms.create(82, 42, "walls", "spike2").refreshBody();

            //strech without distortion to fit screen
            this.scale.displaySize.setAspectRatio(
                Globals.WIDTH / Globals.HEIGHT
            );
            this.scale.refresh();
           
            //player drawing from atlas
            sloth = this.add.sprite(30, 85, "sloth", "jump1").setTint(0x36454f)

            this.physics.add.collider(sloth, platforms);

            //detects keyboard inputs
            cursors = this.input.keyboard?.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
            }) as Globals.GameKeys;

            //idle
            this.anims.create({
                key: "idle",
                frameRate: 4,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "idle",
                    start: 1,
                    end: 2,
                    zeroPad: 1,
                }),
                repeat: -1,
            });
            //make play idle at startgame
            sloth.anims.play("idle", true);

            //walk right
            this.anims.create({
                key: "walk_right",
                frameRate: 6,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "walk_right",
                    start: 1,
                    end: 6,
                    zeroPad: 1,
                }),
                repeat: -1,
            });

            //walk left
            this.anims.create({
                key: "walk_left",
                frameRate: 6,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "walk_left",
                    start: 1,
                    end: 6,
                    zeroPad: 1,
                }),
                repeat: -1,
            });

            //turn right
            this.anims.create({
                key: "turn_right",
                frameRate: 20,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "turn_right",
                    start: 1,
                    end: 6,
                    zeroPad: 1,
                }),
                repeat: 0,
            });

            //turn left
            this.anims.create({
                key: "turn_left",
                frameRate: 20,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "turn_left",
                    start: 1,
                    end: 6,
                    zeroPad: 1,
                }),
                repeat: 0,
            });

            //crouch
            this.anims.create({
                key: "crouch",
                frameRate: 20,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "crouch",
                    start: 1,
                    end: 7,
                    zeroPad: 1,
                }),
                repeat: 0,
            });

            //crouch walk
            this.anims.create({
                key: "crouch_walk",
                frameRate: 8,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "crouch",
                    start: 8,
                    end: 16,
                    zeroPad: 1,
                }),
                repeat: -1,
            });

            //jump
            this.anims.create({
                key: "jump",
                frameRate: 20,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "jump",
                    start: 1,
                    end: 9,
                    zeroPad: 1,
                }),
                repeat: 0,
            });

            //jump left
            this.anims.create({
                key: "jump_left",
                frameRate: 20,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "jump_left",
                    start: 1,
                    end: 9,
                    zeroPad: 1,
                }),
                repeat: 0,
            });

            //jump right
            this.anims.create({
                key: "jump_right",
                frameRate: 20,
                frames: this.anims.generateFrameNames("sloth", {
                    prefix: "jump_right",
                    start: 1,
                    end: 9,
                    zeroPad: 1,
                }),
                repeat: 0,
            });

            
        },

        update() {
            //detect faceing left/right
            if (cursors?.right.isDown) {
                faceingRight = true;
                faceingLeft = false;
            } else if (cursors?.left.isDown) {
                faceingLeft = true;
                faceingRight = false;
            }

            //right walk
            if (cursors?.right.isDown && touchingGround) {
                sloth.setVelocityX(1);
                if (!crouching) {
                    sloth.anims.play("walk_right", true);
                }
            }

            //left walk
            if (cursors?.left.isDown && touchingGround) {
                sloth.setVelocityX(-1);
                if (!crouching) {
                    sloth.anims.play("walk_left", true);
                }
            }

            //idle animation / turn to centre
            if (cursors?.right.isUp && cursors?.left.isUp) {
                //sloth.setVelocityX(0);
                //turn to centre
                if (faceingRight && !crouching) {
                    sloth.anims
                        .playReverse("turn_right", true)
                        .on("animationcomplete", () => {
                            sloth.anims.play("idle", true);
                        });
                    faceingRight = false;
                }
                if (faceingLeft && !crouching) {
                    sloth.anims
                        .playReverse("turn_left", true)
                        .on("animationcomplete", () => {
                            sloth.anims.play("idle", true);
                        });
                    faceingLeft = false;
                }
            }

            //crouch
            if (cursors?.down.isDown && !crouching) {
                crouching = true;
                faceingRight = false;
                faceingLeft = false;
                sloth.anims.play("crouch", true).on("animationcomplete", () => {
                    sloth.anims.play("crouch_walk", true);
                });
            }

            //uncrouch
            if (cursors?.down.isUp && crouching) {
                crouching = false;
                sloth.anims
                    .playReverse("crouch", true)
                    .on("animationcomplete", () => {
                        sloth.anims.play("idle", true);
                    });
            }

            //jump
            if (
                cursors?.up.isDown &&
                cursors?.left.isUp &&
                cursors?.right.isUp &&
                touchingGround
            ) {
                sloth.setVelocityY(-4);
                sloth.setVelocityX(0);
                sloth.anims.play("jump", true);
            }

            //jump left
            else if (
                cursors?.up.isDown &&
                cursors?.left.isDown &&
                touchingGround
            ) {
                sloth.setVelocityY(-4);
                sloth.setVelocityX(-1);
                sloth.anims.play("jump_left", true);
            }

            //jump right
            else if (
                cursors?.up.isDown &&
                cursors?.right.isDown &&
                touchingGround
            ) {
                sloth.setVelocityY(-4);
                sloth.setVelocityX(1);
                sloth.anims.play("jump_right", true);
            }
        },
    };
}
