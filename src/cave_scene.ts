import "phaser";
import * as Globals from "./globals";
export const menuSceneKey = "MenuScene";

let wall: Phaser.GameObjects.Image;

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

            //cave walls/floors
            wall = this.add.image(
                Globals.WIDTH / 2,
                Globals.HEIGHT / 2,
                "walls"
            );

            //player drawing from atlas
            this.add.image(30, 105, "sloth", "jump1");
        },

        update() {
            //detects keyboard inputs
            let cursors = this.input.keyboard?.createCursorKeys();
            if (cursors) {
                // do stuff with cursors here
            }
        },
    };
}
