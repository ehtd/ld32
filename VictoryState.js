/**
 * Created by ehtd on 4/19/15.
 */
/**
 * Created by ehtd on 4/19/15.
 */

var VictoryState = function(game){

};

VictoryState.prototype.preload = function(){

}

VictoryState.prototype.create = function(){

    this.add.sprite(0, 0, 'victory');

    this.game.input.onDown.add(function() {
        this.game.state.start(CONSTANT_STATES.START);
    }, this);

}