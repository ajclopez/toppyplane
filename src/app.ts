import 'Phaser';

import { Config } from './config';

import { Boot } from './stages/boot';
import { Preloader } from './stages/preloader';
import { MainMenu } from './stages/main.menu';
import { GetReady } from './stages/get.ready';
import { ToppyPlane } from './stages/toppy.plane';
import { GameOver } from './stages/game.over';

class ToppyPlaneGame extends Phaser.Game {

    constructor() {
        super({
            width: Config.gameWidth,
            height: Config.gameHeight,
            type: Phaser.AUTO,
            scene: [Boot, Preloader, MainMenu, GetReady, ToppyPlane, GameOver],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 0
                    },
                    debug: false
                }
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                parent: 'game',
                width: Config.gameWidth,
                height: Config.gameHeight
            },
            input: {
                keyboard: true
            }
        });
    }
}

window.onload = () => {
    new ToppyPlaneGame();
    window.focus();
};
