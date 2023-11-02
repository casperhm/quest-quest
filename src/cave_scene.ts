import "phaser";

export const menuSceneKey = "MenuScene";

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
            this.load.spritesheet(
                "backround",
                "/img/backrounds/backround.png",
                { frameWidth: 300, frameHeight: 168 }
            );

            // NOTE: Spritesheet only for identially-sized images; Tilemap CSV might also be
            //       Atlas JSON might be what you want to use here, e.g.
            //
            //      this.load.atlas("sloth", "/img/sloth/spritesheet.png", "/img/sloth/spritesheet.json");
            //
            // REF: https://newdocs.phaser.io/docs/3.60.0/Phaser.Loader.LoaderPlugin#atlas
            // FIXME: this.load.spritesheet("sloth", "/img/sloth/spritesheet.png");
        },
        create() {
            this.add.image(400, 300, "walls");
        },
        update() {},
    };
}
