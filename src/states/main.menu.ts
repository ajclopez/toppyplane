import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

let plane: any;
let position: number = 2;

export class MainMenu extends Phaser.State {

    arrowLeft: Phaser.Button;
    arrowRight: Phaser.Button;
    play: Phaser.Button;

    create() {

        this.add.sprite(0, 0, 'background-menu');
        this.add.sprite(this.game.world.centerX - 265, 160, 'title');
        this.add.sprite(this.game.world.centerX - 75, 525, 'title-select');

        this.arrowLeft = this.add.button(this.game.world.centerX - 115, 445, 'arrow-left', this.leftSelectPlane, this, 1, 0, 2);
        this.arrowLeft.input.useHandCursor = true;

        this.arrowRight = this.add.button(this.game.world.centerX + 85, 445, 'arrow-right', this.rightSelectPlane, this, 1, 0, 2);
        this.arrowRight.input.useHandCursor = true;

        plane = this.add.sprite(this.game.world.centerX - 40, 425, 'plane-green');
        plane.animations.add('plane');
        plane.animations.play('plane', 15, true);
        plane.scale.setTo(1.8, 1.8);

        this.play = this.add.button(this.game.world.centerX - 98, 600, 'button-play', this.startGame, this, 1, 0, 2);
        this.play.input.useHandCursor = true;

    }

    leftSelectPlane() {

        if ( position > 1 )
            position--;
        else
            position = 4;

        if ( position === 1 )
            plane.loadTexture('plane-blue');
        else if ( position === 2 )
            plane.loadTexture('plane-green');
        else if ( position === 3 )
            plane.loadTexture('plane-red');
        else if ( position === 4 )
            plane.loadTexture('plane-yellow');

        plane.animations.add('plane');
        plane.animations.play('plane', 15, true);
        plane.scale.setTo(1.8, 1.8);

    }

    rightSelectPlane() {

        if ( position < 4 )
            position++;
        else
            position = 1;

        if ( position === 4 )
            plane.loadTexture('plane-yellow');
        else if ( position === 3 )
            plane.loadTexture('plane-red');
        else if ( position === 2 )
            plane.loadTexture('plane-green');
        else if ( position === 1 )
            plane.loadTexture('plane-blue');

        plane.animations.add('plane');
        plane.animations.play('plane', 15, true);

    }

    startGame() {
        this.state.start('GetReady', true, false, position);
    }
}
