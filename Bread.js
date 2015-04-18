/**
 * Created by ehtd on 4/18/15.
 */

var Bread = function(game, owner, optionalX, optionalY) {

    Phaser.Sprite.call(this, game, optionalX, optionalY, 'bread');
    this.owner = owner;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
};

Bread.prototype = Object.create(Phaser.Sprite.prototype);
Bread.prototype.constructor = Bread;

Bread.prototype.update = function() {

};

