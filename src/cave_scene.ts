import "phaser";
import * as Globals from "./globals";
export const menuSceneKey = "MenuScene";

let roof: Phaser.Physics.Matter.Sprite;
let ground: Phaser.Physics.Matter.Sprite;
let sloth: Phaser.Physics.Matter.Sprite;
let faceingLeft: boolean = false;
let faceingRight: boolean = false;
let crouching: boolean = false;
let jumping: boolean = false;
let canJump: boolean = true;
let zoneDown: Phaser.Physics.Matter.Sprite;
let zoneUp: Phaser.Physics.Matter.Sprite;
let zoneLeft: Phaser.Physics.Matter.Sprite;
let zoneRight: Phaser.Physics.Matter.Sprite;

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

            this.load.json(
                "wall_collision",
                "/img/backrounds/wall_collision.json"
            );

            this.load.atlas(
                "sloth",
                "/img/sloth/spritesheet.png",
                "/img/sloth/spritesheet.json"
            );
        },
        create() {
            this.matter.world.setBounds(0, 0, Globals.WIDTH, Globals.HEIGHT);

            let collisions = this.cache.json.get("wall_collision");

            ground = this.matter.add.sprite(183, 125, "walls", "walls_bottom", { shape: collisions.walls_bottom, })
            ground.setStatic(true);
            ground.setCollisionGroup(-1)

            roof = this.matter.add.sprite(142, 0, 'walls', 'walls_top', { shape: collisions.walls_top, });//.setAllowGravity(false);
            roof.setStatic(true);
            roof.setCollisionGroup(-1)

            //strech without distortion to fit screen
            this.scale.displaySize.setAspectRatio(
                Globals.WIDTH / Globals.HEIGHT
            );
            this.scale.refresh();


            //player drawing from atlas
            sloth = this.matter.add.sprite(30, 105, "sloth", "jump1");
            sloth.setTint(0x36454f);
            sloth.setCollisionGroup(-1)
           
            //zones for sloth collision
            //let zoneDown = this.add.zone(sloth.x + sloth.width / 2, sloth.y + sloth.height / 2, sloth.width, 1);
            //let zoneUp = this.add.zone(sloth.x + sloth.width / 2, sloth.y - sloth.height / 2, sloth.width, 1);
            //let zoneLeft = this.add.zone(sloth.x - sloth.width / 2, sloth.y, 1, sloth.height);
            //let zoneRight = this.add.zone(sloth.x + sloth.width / 2, sloth.y, 1, sloth.height);
            
            //sprites for sloth collision
            zoneDown = this.matter.add.sprite(sloth.x + sloth.width / 2, sloth.y + sloth.height / 2, "sloth", "zone");
            zoneUp = this.matter.add.sprite(sloth.x + sloth.width / 2, sloth.y - sloth.height / 2, "sloth", "zone");
            zoneLeft = this.matter.add.sprite(sloth.x - sloth.width / 2, sloth.y + sloth.height / 2, "sloth", "Left");
            zoneRight = this.matter.add.sprite(sloth.x + sloth.width / 2, sloth.y + sloth.height / 2, "sloth", "Left");

            //this.matter.world.on("collisionactive", (event, bodyA: MatterJS.BodyType, bodyB: MatterJS.BodyType) => {
                //jumping = false;
                //canJump = true;
            //});

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
            console.log(jumping, canJump,);

            //make sloth upright    
            sloth.setRotation(0)
            sloth.setBounce(0)
            zoneDown.setRotation(0)
            zoneDown.setBounce(0)
            zoneUp.setRotation(0)
            zoneUp.setBounce(0)
            zoneLeft.setRotation(0)
            zoneLeft.setBounce(0)
            zoneRight.setRotation(0)
            zoneRight.setBounce(0)
            
            //make zones invisible
            zoneDown.visible = false
            zoneUp.visible = false
            zoneLeft.visible = false
            zoneRight.visible = false

            zoneDown.setCollisionGroup(1)
            zoneUp.setCollisionGroup(1)
            zoneLeft.setCollisionGroup(1)
            zoneRight.setCollisionGroup(1)

            //when zonedown collide jump is finished
            zoneDown.setOnCollide(jumpComplete)

            function jumpComplete(){
                jumping = false
                canJump = true
            }

            //make sloth hitbox right possition
            zoneDown.setPosition(sloth.x, sloth.y + sloth.height / 2);
            zoneUp.setPosition(sloth.x, sloth.y - sloth.height / 2);
            zoneLeft.setPosition(sloth.x - sloth.width / 2, sloth.y);
            zoneRight.setPosition(sloth.x + sloth.width / 2, sloth.y);

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
            if (cursors?.right.isDown && !jumping) {
                sloth.setVelocityX(1);
                if (!crouching) {
                    sloth.anims.play("walk_right", true);
                }
            }

            //left walk
            if (cursors?.left.isDown && !jumping) {
                sloth.setVelocityX(-1);
                if (!crouching) {
                    sloth.anims.play("walk_left", true);
                }
            }

            //idle animation / turn to centre
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
                sloth.anims.playReverse("crouch", true).on("animationcomplete", () => {
                    sloth.anims.play("idle", true);
                });
            }

            //jump
            if (cursors?.up.isDown && cursors?.left.isUp && cursors?.right.isUp && !jumping && canJump) {
                jumping = true;
                canJump = false;
                sloth.setVelocityY(-4);
                sloth.setVelocityX(0);
                sloth.anims.play("jump", true);
            }

            //jump left
            if (cursors?.up.isDown && cursors?.left.isDown && !jumping && canJump) {
                jumping = true;
                canJump = false;
                sloth.setVelocityY(-4);
                sloth.setVelocityX(-1);
                sloth.anims.play("jump_left", true);
            }

            //jump right
            if (cursors?.up.isDown && cursors?.right.isDown && !jumping && canJump) {
                jumping = true;
                canJump = false;
                sloth.setVelocityY(-4);
                sloth.setVelocityX(1);
                sloth.anims.play("jump_right", true);
            }
        },
    };
}
