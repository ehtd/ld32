var PreloadState = function(game){

};

PreloadState.prototype.preload = function(){

    this.preloadBar = this.add.sprite(200, 400, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.image('background', 'assets/map.png');
    this.game.load.spritesheet('player', 'assets/player.png', 10, 16);
    this.game.load.spritesheet('duck', 'assets/duck.png',10,10);
    this.game.load.image('bread', 'assets/bread.png');
    this.game.load.spritesheet('enemy', 'assets/enemy.png', 60, 139);
    this.game.load.spritesheet('ball', 'assets/powerBall.png', 20, 20);

    this.game.load.image('start', 'assets/start.png');
    this.game.load.image('defeat', 'assets/dead.png');
    this.game.load.image('victory', 'assets/victory.png');

}

PreloadState.prototype.create = function(){

    this.game.stage.backgroundColor = 0x333333;

    this.preloadBar.cropEnabled = false;
    console.log("Finish preload");

    this.game.state.start(CONSTANT_STATES.GAME);
}