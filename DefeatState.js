/**
 * Created by ehtd on 4/19/15.
 */

var DefeatState = function(game){

};

DefeatState.prototype.preload = function(){

}

DefeatState.prototype.create = function(){

    this.add.sprite(0, 0, 'defeat');

    this.game.input.onDown.add(function() {
        this.game.state.start(CONSTANT_STATES.START);
    }, this);

}