import 'Phaser';
import { executeAnimation } from './main.menu';

export class GameOver extends Phaser.Scene {

    planeNumber: number;
    scoreCoin: number = 0;

    constructor() {
        super({
            key: "GameOver"
        });
    }

    init(data: any) {
        this.planeNumber = data.planeNumber;
        this.scoreCoin = data.scoreCoin;
    }

    create() {

        this.add.sprite(320, 160, 'game-over-title');
        this.add.sprite(320, 460, 'background-gameover');

        this.add.sprite(245, 390, 'coin-score');
        this.add.sprite(280, 390, 'x');
        const fontStyle = {font: '36px Arial', fill: '#FFFFFF', stroke: '#FFCC00', strokeThickness: 2, align: 'center'};
        this.add.text(295, 368, this.scoreCoin.toString(), fontStyle);

        const x = 320;
        const y = 460;

        let plane: Phaser.GameObjects.Sprite = this.add.sprite(x, y, 'plane-green');

        if ( this.planeNumber === 1 )
            plane = this.add.sprite(x, y, 'plane-blue');
        else if ( this.planeNumber === 2 )
            plane = this.add.sprite(x, y, 'plane-green');
        else if ( this.planeNumber === 3 )
            plane = this.add.sprite(x, y, 'plane-red');
        else if ( this.planeNumber === 4 )
            plane = this.add.sprite(x, y, 'plane-yellow');

        executeAnimation(this.planeNumber, plane);
        const play = this.add.sprite(320, 550, 'button-again').setInteractive({ useHandCursor: true });
        play.on('pointerdown', this.startGame, this);
    }

    startGame() {
        this.scene.start('GetReady', { planeNumber: this.planeNumber })
    }

}
