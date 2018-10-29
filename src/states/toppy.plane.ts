import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import { Config } from './../config';

export class ToppyPlane extends Phaser.State {

    plane: Phaser.Sprite;
    pipes: Phaser.Group;
    coins: Phaser.Group;
    timer: Phaser.TimerEvent;
    scoreText: Phaser.Text;
    highScoreText: Phaser.Text;
    pointAudio: Phaser.Sound;
    dieAudio: Phaser.Sound;

    planeNumber: number = 2;
    fontStyle: any = {};
    scoreCoin: number = 0;
    highScore: number = 0;

    init(position: number) {
        this.planeNumber = position;
    }

    preload() {

        if ( localStorage.getItem('highScore') !== undefined )
            this.highScore = parseInt(localStorage.getItem('highScore'));
        else
            localStorage.setItem('highScore', this.highScore.toString());

    }

    create() {

        this.add.sprite(0, 0, 'background-plane');

        this.add.sprite(-30, Config.gameHeight - 180, 'land');

        if ( this.planeNumber === 1 )
            this.plane = this.add.sprite(100, 245, 'plane-blue');
        else if ( this.planeNumber === 2 )
            this.plane = this.add.sprite(100, 245, 'plane-green');
        else if ( this.planeNumber === 3 )
            this.plane = this.add.sprite(100, 245, 'plane-red');
        else if ( this.planeNumber === 4 )
            this.plane = this.add.sprite(100, 245, 'plane-yellow');

        // Needed for: movements, gravity, collisions, etc.
        this.physics.arcade.enable(this.plane);

        this.plane.body.gravity.y = 800;

        const spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.input.onDown.add(this.jump, this);

        this.pipes = this.add.group();
        this.coins = this.add.group();

        this.plane.anchor.setTo(-0.2, 0.5);

        this.timer = this.time.events.loop(1400, this.addRowOfPipes, this);

        this.add.sprite(10, Config.gameHeight - 120, 'coin-score');
        this.add.sprite(60, Config.gameHeight - 96, 'x');

        this.fontStyle = {font: '36px Arial', fill: '#FFCC00', stroke: '#FFCC00', strokeThickness: 5, align: 'center'};

        this.scoreText = this.add.text(85, Config.gameHeight - 115, this.scoreCoin.toString(), this.fontStyle);

        this.fontStyle = {font: '28px Arial', fill: '#ffffff', strokeThickness: 5, align: 'center'};
        this.highScoreText = this.add.text(10, Config.gameHeight - 60, 'High score: ' + this.highScore, this.fontStyle);

        this.pointAudio = this.add.audio('point');
        this.dieAudio = this.add.audio('die');

        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    update() {

        if ( this.plane.y < 0 || this.plane.y > Config.gameHeight - 240 ) {
            this.restartGame();
        }

        if ( this.plane.angle < 20 ) {
            this.plane.angle += 1;
        }

        this.physics.arcade.overlap(this.plane, this.pipes, this.hitPipe, null, this);
        this.physics.arcade.overlap(this.plane, this.coins, this.hitCoin, null, this);

    }

    jump() {

        if ( this.game.paused === true ) {
            this.game.paused = false;
        }

        if ( this.plane.alive === false ) {
            return;
        }

        this.plane.body.velocity.y = -350;

        this.plane.animations.add('plane');
        this.plane.animations.play('plane', 10, true);

        this.game.add.tween(this.plane).to({angle: -20}, 100).start();
    }

    restartGame() {

        localStorage.setItem('highScore', localStorage.getItem('highScore') !== undefined &&
            parseInt(localStorage.getItem('highScore')) < this.scoreCoin ?
            this.scoreCoin.toString() : localStorage.getItem('highScore'));

        this.scoreCoin = 0;
        this.scoreText.setText(this.scoreCoin.toString());
        this.highScoreText.setText('High score: ' + localStorage.getItem('highScore'));

        this.state.start('GetReady', false, false, this.planeNumber);
    }

    hitPipe() {

        if ( this.plane.alive === false )
            return;

        this.plane.alive = false;
        this.dieAudio.play();
        this.time.events.remove(this.timer);

        this.pipes.forEach((p) => { p.body.velocity.x = 0; });
        this.coins.forEach((c) => { c.body.velocity.x = 0; });
    }

    hitCoin(plane, coin) {

        if ( plane.alive === false )
            return;

        this.pointAudio.play();
        coin.kill();

        this.scoreText.setText((++this.scoreCoin).toString());

    }

    addRowOfPipes() {

        let hole = Math.floor(Math.random() * 7) + 1;

        for (let i = 0; i < 13; i++) {
            if ( i !== hole && i !== hole + 1 && i !== hole + 2 && i !== hole + 3 )
                this.addOnePipe(500, i * 60 + 10, 0);
        }

        this.addOnePipe(500, this.randomIntFromInterval(hole + 1, hole + 2) * 60 + 10, 1);
    }

    addOnePipe(x, y, type) {

        if ( type === 0 ) {
            const pipe = this.add.sprite(x, y, 'pipe');
            this.pipes.add(pipe);
            this.physics.arcade.enable(pipe);

            pipe.body.velocity.x = -200;
            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;

        } else {

            let coin = this.add.sprite(x, y, 'coin');
            this.coins.add(coin);
            this.physics.arcade.enable(coin);

            coin.body.velocity.x = -200;
            coin.animations.add('loop');
            coin.animations.play('loop', 5, true);
        }

    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
