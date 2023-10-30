import "phaser";

export const menuSceneKey = "MenuScene";

export function menu():
    | Phaser.Types.Scenes.SettingsConfig
    | Phaser.Types.Scenes.CreateSceneFromObjectConfig {
    let startKey: Phaser.Input.Keyboard.Key;
    let sprites: { s: Phaser.GameObjects.Image; r: number }[];

    return {
        key: menuSceneKey,
        preload() {
            sprites = [];
            if (this.input.keyboard) {
                startKey = this.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.S
                );
                startKey.isDown = false;
            }
            this.load.image("particle", "/img/sloth.png");
            this.load.audio("gasp", "/snd/gasp.mp3");
        },
        create() {
            this.add.text(0, 0, "Press S to restart scene", {
                fontSize: "60px",
                fontFamily: "Helvetica",
            });

            this.add.image(100, 100, "particle");

            for (let i = 0; i < 300; i++) {
                const x = Phaser.Math.Between(-64, 800);
                const y = Phaser.Math.Between(-64, 600);

                const image = this.add.image(x, y, "particle");
                image.setBlendMode(Phaser.BlendModes.ADD);
                sprites.push({ s: image, r: 2 + Math.random() * 6 });
            }
        },
        update() {
            if (startKey.isDown) {
                this.sound.play("gasp");
                this.scene.start(menuSceneKey);
            }

            for (let i = 0; i < sprites.length; i++) {
                const sprite = sprites[i].s;

                sprite.y -= sprites[i].r;

                if (sprite.y < -256) {
                    sprite.y = 700;
                }
            }
        },
    };
}
