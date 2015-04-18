var PreloadState = function(game){

};

PreloadState.prototype.preload = function(){

    this.preloadBar = this.add.sprite(200, 400, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.image('background', 'assets/map.png');
    this.game.load.image('player', 'assets/player.png');
}

PreloadState.prototype.create = function(){

    this.game.stage.backgroundColor = 0x333333;

    this.preloadBar.cropEnabled = false;
    console.log("Finish preload");

    this.game.state.start(CONSTANT_STATES.GAME);
}