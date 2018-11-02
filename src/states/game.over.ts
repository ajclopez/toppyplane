import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

export class GameOver extends Phaser.State {

    plane: Phaser.Sprite;
    play: Phaser.Button;
    scoreText: Phaser.Text;

    planeNumber: number;
    fontStyle: any = {};
    scoreCoin: number = 0;

    init(position: number, scoreCoin) {
        this.planeNumber = position;
        this.scoreCoin = scoreCoin;
    }

    create() {

        this.add.sprite(this.game.world.centerX - 234, 160, 'game-over-title');
        this.add.sprite(this.game.world.centerX - 132, 252, 'background-gameover');

        this.play = this.add.button(this.game.world.centerX - 98, 535, 'button-play', this.startGame, this, 1, 0, 2);
        this.play.input.useHandCursor = true;

        this.add.sprite(this.game.world.centerX - 120, 390, 'coin-score');
        this.add.sprite(this.game.world.centerX - 70, 420, 'x');

        const x = this.game.world.centerX - 25;
        const y = 290;

        if ( this.planeNumber === 1 )
            this.plane = this.add.sprite(x, y, 'plane-blue');
        else if ( this.planeNumber === 2 )
            this.plane = this.add.sprite(x, y, 'plane-green');
        else if ( this.planeNumber === 3 )
            this.plane = this.add.sprite(x, y, 'plane-red');
        else if ( this.planeNumber === 4 )
            this.plane = this.add.sprite(x, y, 'plane-yellow');

        this.fontStyle = {font: '36px Arial', fill: '#FFFFFF', stroke: '#FFCC00', strokeThickness: 5, align: 'center'};

        this.scoreText = this.add.text(this.game.world.centerX - 45, 400, this.scoreCoin.toString(), this.fontStyle);

    }

    startGame() {
        this.state.start('GetReady', true, false, this.planeNumber);
    }

}
