import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

export class Boot extends Phaser.State {

    preload() {
        this.load.image('preloadBar', 'assets/img/loading-bar.png');
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.stage.disableVisibilityChange = true;

        this.state.start('Preloader', true, false);
    }
}