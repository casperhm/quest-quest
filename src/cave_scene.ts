import "phaser";

export const menuSceneKey = "MenuScene";

export function cave():
    | Phaser.Types.Scenes.SettingsConfig
    | Phaser.Types.Scenes.CreateSceneFromObjectConfig {


    return {

        preload() {
            this.load.image('walls', 'backrounds/walls.png');
            this.load.spritesheet('backround', 'backrounds/backround.png',
                { frameWidth: 300, frameHeight: 168 }
            );
            this.load.spritesheet('sloth', 'sloth/spritesheet.png')
        },
        create() {
            this.add.image(400, 300, 'walls');
        },
        update() {

        },
    };
}
