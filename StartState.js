/**
 * Created by ehtd on 4/19/15.
 */
/**
 * Created by ehtd on 4/19/15.
 */

var StartState = function(game){

};

StartState.prototype.preload = function(){

}

StartState.prototype.create = function(){

    this.add.sprite(0, 0, 'start');

    this.game.input.onDown.add(function() {
        this.game.state.start(CONSTANT_STATES.GAME);
    }, this);
}