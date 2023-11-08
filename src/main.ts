import "./style.css";
import "phaser";
import { cave } from "./cave_scene";

const GameConfig: Phaser.Types.Core.GameConfig = {
    title: "Quest Quest",
    url: "https://github.com/casperhm/quest-quest",
    version: "2.0",
    width: 300,
    height: 168,
    type: Phaser.AUTO,
    parent: "app",
    scene: [cave()],
    input: {
        keyboard: true,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
    },

    transparent: true,

    render: { pixelArt: false, antialias: false },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // `fullscreenTarget` must be defined for phones to not have
        // a small margin during fullscreen.
        fullscreenTarget: "app",
        expandParent: false,
    },
};

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener("load", () => {
    const game = new Game(GameConfig);

    // fullscreen toggle
    document.querySelector("#fullscreen")?.addEventListener("click", () => {
        game.scale.toggleFullscreen();
    });

    // mute toggle
    document.querySelector("#mute")?.addEventListener("click", (event) => {
        game.sound.mute = !game.sound.mute;
        const btn = event.target as HTMLButtonElement;
        btn.innerText = game.sound.mute ? "Unmute" : "Mute";
    });
});
