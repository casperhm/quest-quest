import "phaser";
import * as Globals from "./globals";
export const menuSceneKey = "MenuScene";

let wall: Phaser.Physics.Arcade.StaticGroup;
let sloth: Phaser.Physics.Arcade.Sprite;
let faceingLeft: boolean = false;
let faceingRight: boolean = false;
let crouching: boolean = false;

export function cave():
    | Phaser.Types.Scenes.SettingsConfig
    | Phaser.Types.Scenes.CreateSceneFromObjectConfig {
    return {
        preload() {
            // NOTE: assets are stored in the public/ folder; reference them with a leading / in source, e.g.
            //
            //       this.load.image("walls", "/img/backrounds/walls.png");
            this.load.image("walls", "/img/backrounds/walls.png");

            // REF: https://newdocs.phaser.io/docs/3.60.0/Phaser.Loader.LoaderPlugin#spritesheet

            // NOTE: Spritesheet only for identially-sized images; Tilemap CSV might also be
            //       Atlas JSON might be what you want to use here, e.g.
            //
            this.load.atlas(
                "sloth",
                "/img/sloth/spritesheet.png",
                "/img/sloth/spritesheet.json"
            );
            //
            // REF: https://newdocs.phaser.io/docs/3.60.0/Phaser.Loader.LoaderPlugin#atlas
        },
        create() {
            //strech without distortion to fit screen
            this.scale.displaySize.setAspectRatio(
                Globals.WIDTH / Globals.HEIGHT
            );
            this.scale.refresh();

            //cave walls / floors;

            //player drawing from atlas
            sloth = this.physics.add.sprite(30, 105, "sloth", "jump1");
            sloth.setTint(0x36454f);

            //sloth things
            sloth.setBounce(0);
            sloth.setCollideWorldBounds(true);
            sloth.setGravityY(300);

            //collision things
            wall = this.physics.add.staticGroup();
            wall.create(Globals.WIDTH / 2, Globals.HEIGHT / 2, "walls")
                .setScale(1)
                .refreshBody();
            this.physics.add.collider(sloth, wall);

            //animations for sloth

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
        },

        update() {
            console.log(crouching);
            //detects keyboard inputs
            let cursors = this.input.keyboard?.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
            }) as Globals.GameKeys;

            //detect faceing left/right
            if (cursors?.right.isDown) {
                faceingRight = true;
                faceingLeft = false;
            } else if (cursors?.left.isDown) {
                faceingLeft = true;
                faceingRight = false;
            }

            //right walk
            if (cursors?.right.isDown) {
                sloth.setVelocityX(50);
                if (!crouching) {
                    sloth.anims.play("walk_right", true);
                }
            }

            //left walk
            if (cursors?.left.isDown) {
                sloth.setVelocityX(-50);
                if (!crouching) {
                    sloth.anims.play("walk_left", true);
                }
            }

            //idle animation/ turn to centre
            if (cursors?.right.isUp && cursors?.left.isUp) {
                sloth.setVelocityX(0);
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
        },
    };
}
