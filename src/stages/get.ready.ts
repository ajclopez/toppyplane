import 'Phaser';

export class GetReady extends Phaser.Scene {

    planeNumber: number = 2;
    highScore: number = 0;
    fontStyle: any = {};
    scoreCoin: number = 0;

    plane: Phaser.GameObjects.Sprite;
    tapLeft: Phaser.GameObjects.Sprite;
    tapright: Phaser.GameObjects.Sprite;
    tapTick: Phaser.GameObjects.Sprite;
    spaceKey: Phaser.Input.Keyboard.Key;

    constructor() {
        super({
            key: "GetReady"
        });
    }

    init(data: any) {
        this.planeNumber = data.planeNumber;
    }

    preload() {
        if (localStorage.getItem('highScore') !== null) {
            this.highScore = parseInt(localStorage.getItem('highScore'));
        } else {
            localStorage.setItem('highScore', this.highScore.toString());
        }
    }

    create() {
        this.add.sprite(320, 480, 'background-plane');

        this.add.sprite(320, 855, 'land');

        if ( this.planeNumber === 1 )
            this.plane = this.add.sprite(110, 215, 'plane-blue');
        else if (this.planeNumber === 2)
            this.plane = this.add.sprite(110, 215, 'plane-green');
        else if (this.planeNumber === 3)
            this.plane = this.add.sprite(110, 215, 'plane-red');
        else if (this.planeNumber === 4)
            this.plane = this.add.sprite(110, 215, 'plane-yellow');

        this.tapLeft = this.add.sprite(35, 230, 'tap-left');
        this.tapLeft.scaleX = 0.6;
        this.tapLeft.scaleY = 0.6;

        this.tapright = this.add.sprite(185, 230, 'tap-right');
        this.tapright.scaleX = 0.6;
        this.tapright.scaleY = 0.6;

        this.tapTick = this.add.sprite(115, 285, 'tap-tick');

        this.anims.generateFrameNames
        this.tapTick.anims.create({
            key: 'tick',
            frames: this.anims.generateFrameNames('tap-tick'),
            frameRate: 8,
            repeat: -1
        });
        this.tapTick.anims.play('tick', true);

        this.add.sprite(30, 840, 'coin-score');
        this.add.sprite(70, 840, 'x');

        this.fontStyle = { font: '36px Arial', fill: '#FFCC00', stroke: '#FFCC00', strokeThickness: 2, align: 'center' };
        this.add.text(90, 815, this.scoreCoin.toString(), this.fontStyle);

        this.fontStyle = { font: '26px Arial', fill: '#ffffff', strokeThickness: 2, align: 'center' };
        this.add.text(10, 900, 'High score: ' + this.highScore, this.fontStyle);

        this.input.on('pointerdown', this.startGame, this);
        this.input.keyboard.on('keydown-SPACE', this.startGame, this);
    }

    startGame() {
        this.scene.start('ToppyPlane', { planeNumber: this.planeNumber });
    }
}
