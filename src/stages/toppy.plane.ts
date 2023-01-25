import 'Phaser';

import { Config } from '../config';
import { createAnimation, executeAnimation } from './main.menu';

export class ToppyPlane extends Phaser.Scene {

    plane: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    pipes: Phaser.GameObjects.Group;
    coins: Phaser.GameObjects.Group;
    timer: Phaser.Time.TimerEvent;
    scoreText: Phaser.GameObjects.Text;
    highScoreText: Phaser.GameObjects.Text;
    pointAudio: Phaser.Sound.BaseSound;
    dieAudio: Phaser.Sound.BaseSound;
    downKey: Phaser.Input.Keyboard.Key;
    spaceKey: Phaser.Input.Keyboard.Key;

    planeNumber: number = 2;
    fontStyle: any = {};
    scoreCoin: number = 0;
    highScore: number = 0;
    gameOver: boolean = false;

    constructor() {
        super({
            key: "ToppyPlane"
        });
    }

    init(data: any) {
        this.planeNumber = data.planeNumber;
        this.gameOver = false;
    }

    preload() {

        if ( localStorage.getItem('highScore') !== null )
            this.highScore = parseInt(localStorage.getItem('highScore'));
        else
            localStorage.setItem('highScore', this.highScore.toString());
    }

    create() {
        this.add.sprite(320, 480, 'background-plane');

        this.add.sprite(320, 855, 'land');

        if ( this.planeNumber === 1 ) {
            this.plane = this.physics.add.sprite(110, 215, 'plane-blue');
            createAnimation('planeBlue', 'plane-blue', this.plane);
        } else if ( this.planeNumber === 2 ) {
            this.plane = this.physics.add.sprite(110, 215, 'plane-green');
            createAnimation('planeGreen', 'plane-green', this.plane);
        } else if ( this.planeNumber === 3 ) {
            this.plane = this.physics.add.sprite(110, 215, 'plane-red');
            createAnimation('planeRed', 'plane-red', this.plane);
        } else if ( this.planeNumber === 4 ) {
            this.plane = this.physics.add.sprite(110, 215, 'plane-yellow');
            createAnimation('planeYellow', 'plane-yellow', this.plane);
        }

        this.plane.body.setGravity(0, 800);

        this.input.on('pointerdown', this.fly, this);
        this.input.keyboard.on('keydown-SPACE', this.fly, this);

        this.add.sprite(30, 840, 'coin-score');
        this.add.sprite(70, 840, 'x');

        this.fontStyle = { font: '36px Arial', fill: '#FFCC00', stroke: '#FFCC00', strokeThickness: 2, align: 'center' };
        this.scoreText = this.add.text(90, 815, this.scoreCoin.toString(), this.fontStyle);

        this.fontStyle = { font: '26px Arial', fill: '#ffffff', strokeThickness: 2, align: 'center' };
        this.highScoreText = this.add.text(10, 900, 'High score: ' + this.highScore, this.fontStyle);

        this.pointAudio = this.sound.add('point');
        this.dieAudio = this.sound.add('die');

        this.pipes = this.physics.add.group();
        this.coins = this.physics.add.group();

        this.timer = this.time.addEvent({ delay: 1400, callback: this.addRowOfPipes, callbackScope: this, loop: true });
    }

    update() {
        if ( this.plane.y < 0 || this.plane.y > Config.gameHeight - 204 ) {
            if ( !this.gameOver )
                this.dieAudio.play();
            this.gameOver = true;
            this.restartGame();
        }

        if ( this.plane.angle < 20 ) {
            this.plane.angle += 1;
        }

        this.physics.add.overlap(this.plane, this.pipes, this.hitPipe, null, this);
        this.physics.add.overlap(this.plane, this.coins, this.hitCoin, null, this);
    }

    fly() {
        if ( this.gameOver )
            return;

        this.plane.body.velocity.y = -350;
        executeAnimation(this.planeNumber, this.plane);
        this.plane.angle = -20;
    }

    restartGame() {

        localStorage.setItem('highScore', localStorage.getItem('highScore') !== undefined &&
            parseInt(localStorage.getItem('highScore')) < this.scoreCoin ?
            this.scoreCoin.toString() : localStorage.getItem('highScore'));

        const tempScore = this.scoreCoin;
        this.scoreCoin = 0;
        this.scoreText.setText(this.scoreCoin.toString());
        this.highScoreText.setText('High score: ' + localStorage.getItem('highScore'));

        this.scene.start('GameOver', { planeNumber: this.planeNumber, scoreCoin: tempScore });
    }

    addRowOfPipes() {

        let hole = Math.floor(Math.random() * 7) + 1;

        for (let i = 0; i < 13; i++) {
            if ( i !== hole && i !== hole + 1 && i !== hole + 2 && i !== hole + 3 )
                this.addOnePipe(500, i * 60 + 25, 0);
        }

        this.addOnePipe(500, this.randomIntFromInterval(hole + 1, hole + 2) * 60 + 25, 1);
    }

    addOnePipe(x: number, y: number, type: number) {

        if ( type === 0 ) {
            const pipe = this.physics.add.sprite(x, y, 'pipe');
            this.pipes.add(pipe);
            this.physics.world.enable(pipe);

            pipe.body.velocity.x = -200;
        } else {

            let coin = this.physics.add.sprite(x, y, 'coin');
            this.coins.add(coin);
            this.physics.world.enable(coin);

            coin.body.velocity.x = -200;
            coin.anims.create({
                key: 'coin',
                frames: this.anims.generateFrameNames('coin', {
                    start: 1,
                    end: 6,
                    zeroPad: 1,
                    prefix: 'GoldCoinSprite/coin',
                    suffix: '.png'
                }),
                frameRate: 8,
                repeat: -1
            });
            coin.play('coin', true);
        }
    }

    randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    hitCoin(plane: any, coin: any) {

        if ( this.gameOver )
            return;

        this.pointAudio.play();
        coin.destroy();
        this.scoreText.setText((++this.scoreCoin).toString());
    }

    hitPipe() {

        if ( this.gameOver )
            return;

        this.dieAudio.play();
        this.time.removeEvent(this.timer);
        this.gameOver = true;

        this.pipes.getChildren().forEach((p) => { p.body.velocity.x = 0; });
        this.coins.getChildren().forEach((c) => { c.body.velocity.x = 0; });
    }

}
