import 'Phaser';

let plane: Phaser.GameObjects.Sprite;
let position: number = 2;

export class MainMenu extends Phaser.Scene {

    arrowLeft: Phaser.GameObjects.Sprite;
    arrowRight: Phaser.GameObjects.Sprite;
    play: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "MainMenu"
        });
        Phaser.Scene.call;
    }

    create() {
        this.add.sprite(0, 0, 'background-menu').setOrigin(0, 0);
        const titleSprite = this.add.sprite(325, 120, 'title');
        titleSprite.scale = 1.0;
        this.add.sprite(320, 550, 'title-select');
        this.arrowLeft = this.add.sprite(180, 465, 'arrow-left').setInteractive({ useHandCursor: true });
        this.arrowLeft.on('pointerdown', this.leftSelectPlane);
        this.arrowRight = this.add.sprite(460, 465, 'arrow-right').setInteractive({ useHandCursor: true });
        this.arrowRight.on('pointerdown', this.rightSelectPlane);

        plane = this.add.sprite(320, 465, 'plane-green');
        plane.scale = 1.2;
        this.anims.on(Phaser.Animations.Events.ADD_ANIMATION, this.addAnimation, plane);

        plane.anims.create({
            key: 'plane-green',
            frames: this.anims.generateFrameNames('plane-green', {
                start: 1,
                end: 3,
                zeroPad: 1,
                prefix: 'planeGreen',
                suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });
        plane.play('plane-green', true);

        this.play = this.add.sprite(320, 800, 'button-play').setInteractive({ useHandCursor: true });
        this.play.on('pointerdown', () => this.scene.start('GetReady', { planeNumber: position }));
    }

    leftSelectPlane() {
        if ( position > 1 )
            position--;
        else
            position = 4;

        executeAnimation(position, plane);
    }

    rightSelectPlane() {
        if ( position < 4 )
            position++;
        else
            position = 1;

        executeAnimation(position, plane);
    }

    addAnimation(key: string) {
        plane.anims.play(key);
    }

}

export function createAnimation(key: string, frameName: string, sprite: Phaser.GameObjects.Sprite) {
    sprite.anims.create({
        key: key,
        frames: sprite.anims.generateFrameNames(frameName, {
            start: 1,
            end: 3,
            zeroPad: 1,
            prefix: key,
            suffix: '.png'
        }),
        frameRate: 8,
        repeat: -1
    });
}

export function executeAnimation(position: number, sprite: Phaser.GameObjects.Sprite) {
    switch (position) {
        case 1:
            sprite.setTexture('plane-blue');
            createAnimation('planeBlue', 'plane-blue', sprite);
            sprite.anims.play('planeBlue', true);
            break;
        case 2:
            sprite.setTexture('plane-green');
            createAnimation('planeGreen', 'plane-green', sprite);
            sprite.anims.play('planeGreen', true);
            break;
        case 3:
            sprite.setTexture('plane-red');
            createAnimation('planeRed', 'plane-red', sprite);
            sprite.anims.play('planeRed', true);
            break;
        case 4:
            sprite.setTexture('plane-yellow');
            createAnimation('planeYellow', 'plane-yellow', sprite);
            sprite.anims.play('planeYellow', true);
            break;
    }
}
