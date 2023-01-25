import 'Phaser';

export class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: "Boot"
        });
    }

    preload() {
        this.load.image('preloadBar', 'assets/img/loading-bar.png');
    }

    create() {
        this.scale.scaleMode = Phaser.Scale.FIT;
        this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;

        this.scene.start('Preloader');
    }
}