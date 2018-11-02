import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

export class Preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;

    preload() {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 200, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('background-menu', 'assets/img/background-menu.png');
        this.load.image('title', 'assets/img/title.png');
        this.load.image('title-select', 'assets/img/title-select.png');
        this.load.image('arrow-right', 'assets/img/arrow-right.png');
        this.load.image('arrow-left', 'assets/img/arrow-left.png');
        this.load.image('button-play', 'assets/img/button-play.png');

        this.load.image('background-plane', 'assets/img/background-plane.png');
        this.load.image('land', 'assets/img/land.png');
        this.load.image('pipe', 'assets/img/pipe.png');
        this.load.atlasJSONHash('coin', 'assets/img/coin.png', 'assets/img/coin.json');
        this.load.image('coin-score', 'assets/img/coin-score.png');
        this.load.image('x', 'assets/img/x.png');
        this.load.image('tap-right', 'assets/img/tap-right.png');
        this.load.image('tap-left', 'assets/img/tap-left.png');
        this.load.atlasJSONHash('tap-tick', 'assets/img/tap-tick.png', 'assets/img/tap-tick.json');
        this.load.audio('point', 'assets/sounds/sfx_point.ogg');
        this.load.audio('die', 'assets/sounds/sfx_die.ogg');

        this.load.atlasJSONHash('plane-green', 'assets/img/plane-green.png', 'assets/img/plane-green.json');
        this.load.atlasJSONHash('plane-blue', 'assets/img/plane-blue.png', 'assets/img/plane-blue.json');
        this.load.atlasJSONHash('plane-red', 'assets/img/plane-red.png', 'assets/img/plane-red.json');
        this.load.atlasJSONHash('plane-yellow', 'assets/img/plane-yellow.png', 'assets/img/plane-yellow.json');

        this.load.image('background-gameover', 'assets/img/background-gameover.png');
        this.load.image('game-over-title', 'assets/img/game-over.png');
        this.load.image('button-again', 'assets/img/button-again.png');

    }

    create() {
        this.state.start('MainMenu', true, false);
    }

}
