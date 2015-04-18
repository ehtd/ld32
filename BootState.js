var BootState = function(game){

};

BootState.prototype.preload = function(){
    this.load.image('preloaderBar', 'assets/preload.png');
}

BootState.prototype.create = function(){

    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;

    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    this.stage.disableVisibilityChange = true;
    console.log("Finish boot");

    this.game.state.start(CONSTANT_STATES.PRELOAD);
}
