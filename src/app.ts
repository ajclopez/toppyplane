import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import { Config } from './config';

import { Boot } from './states/boot';
import { Preloader } from './states/preloader';
import { MainMenu } from './states/main.menu';
import { GetReady } from './states/get.ready';
import { ToppyPlane } from './states/toppy.plane';
class ToppyPlaneGame extends Phaser.Game {

    constructor() {
        super(Config.gameWidth, Config.gameHeight, Phaser.AUTO, 'content');

        this.state.add('Boot', Boot, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('MainMenu', MainMenu, false);
        this.state.add('GetReady', GetReady, false);
        this.state.add('ToppyPlane', ToppyPlane, false);

        this.state.start('Boot');
    }
}

window.onload = () => {
    new ToppyPlaneGame();
};
