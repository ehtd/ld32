/**
 * Created by ehtd on 4/18/15.
 */

// Follower constructor
var Duck = function(game,target) {
    Phaser.Sprite.call(this, game, target.x - target.width/2, target.y - target.height/2, 'duck');
    this.target = target;

    this.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.MAX_SPEED = 120; // pixels/second
    this.MIN_DISTANCE = 16; // pixels
};

Duck.prototype = Object.create(Phaser.Sprite.prototype);
Duck.prototype.constructor = Duck;

Duck.prototype.update = function() {
    // Calculate distance to target
    var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);

    // If the distance > MIN_DISTANCE then move
    if (distance > this.MIN_DISTANCE) {
        // Calculate the angle to the target
        var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);

        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.body.velocity.x = Math.ceil(Math.cos(rotation) * this.MAX_SPEED);
        this.body.velocity.y = Math.ceil(Math.sin(rotation) * this.MAX_SPEED);
    } else {
        this.body.velocity.setTo(0, 0);
    }
};