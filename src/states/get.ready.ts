import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import { Config } from './../config';

export class GetReady extends Phaser.State {

    plane: Phaser.Sprite;
    tapLeft: Phaser.Sprite;
    tapright: Phaser.Sprite;
    tapTick: Phaser.Sprite;

    scoreCoin: number = 0;
    planeNumber: number = 2;
    highScore: number = 0;
    fontStyle: any = {};

    init(position: number) {
        this.planeNumber = position;
    }

    preload() {
        if (localStorage.getItem('highScore') !== undefined) {
            this.highScore = parseInt(localStorage.getItem('highScore'));
        } else {
            localStorage.setItem('highScore', this.highScore.toString());
        }
    }

    create() {
        this.add.sprite(0, 0, 'background-plane');

        this.add.sprite(-30, Config.gameHeight - 180, 'land');

        if ( this.planeNumber === 1 )
            this.plane = this.add.sprite(110, 215, 'plane-blue');
        else if (this.planeNumber === 2)
            this.plane = this.add.sprite(110, 215, 'plane-green');
        else if (this.planeNumber === 3)
            this.plane = this.add.sprite(110, 215, 'plane-red');
        else if (this.planeNumber === 4)
            this.plane = this.add.sprite(110, 215, 'plane-yellow');

        this.tapLeft = this.add.sprite(35, 230, 'tap-left');
        this.tapLeft.scale.setTo(0.6, 0.6);

        this.tapright = this.add.sprite(185, 230, 'tap-right');
        this.tapright.scale.setTo(0.6, 0.6);

        this.tapTick = this.add.sprite(115, 285, 'tap-tick');
        this.tapTick.animations.add('tick');
        this.tapTick.animations.play('tick', 5, true);

        this.add.sprite(10, Config.gameHeight - 120, 'coin-score');
        this.add.sprite(60, Config.gameHeight - 96, 'x');

        this.fontStyle = { font: '36px Arial', fill: '#FFCC00', stroke: '#FFCC00', strokeThickness: 5, align: 'center' };

        this.add.text(85, Config.gameHeight - 115, this.scoreCoin.toString(), this.fontStyle);

        this.fontStyle = { font: '28px Arial', fill: '#ffffff', strokeThickness: 5, align: 'center' };

        this.add.text(10, Config.gameHeight - 60, 'High score: ' + this.highScore, this.fontStyle);

        const spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);

        this.input.onDown.add(this.startGame, this);
    }

    startGame() {
        this.state.start('ToppyPlane', true, false, this.planeNumber);
    }
}
