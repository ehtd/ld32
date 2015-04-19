/**
 * Created by ehtd on 4/19/15.
 */

var Ball = function(game, target, x, y, speed) {

    Phaser.Sprite.call(this, game, x, y, 'ball');
    this.target = target;

    this.SPREAD_DISTANCE = 100;

    this.targetX = this.game.rnd.integerInRange(this.target.x - this.SPREAD_DISTANCE, this.target.x + this.SPREAD_DISTANCE);
    this.targetY = this.game.rnd.integerInRange(this.target.y - this.SPREAD_DISTANCE, this.target.y + this.SPREAD_DISTANCE);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.MIN_DISTANCE = 4;
    this.MAX_SPEED = speed;

    this.animations.add('rotate', [0,1,2,3], 16, 1);
    var explode = this.animations.add('explode', [4,5,6,7,8], 16, false);

    explode.onComplete.add(function(sprite, animation) {
        //PLay sound
        this.killed.play();
        this.kill();
    }, this);

    this.animations.play('rotate');

    this.killed = this.game.add.audio('explode', 1, false);

};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {

    var distance = this.game.math.distance(this.x, this.y, this.targetX, this.targetY);

    if (distance > Math.ceil(this.MIN_DISTANCE)) {
        var rotation = this.game.math.angleBetween(this.x, this.y, this.targetX, this.targetY);
        this.body.velocity.x = Math.ceil(Math.cos(rotation) * this.MAX_SPEED);
        this.body.velocity.y = Math.ceil(Math.sin(rotation) * this.MAX_SPEED);
    } else {
        this.body.velocity.setTo(0, 0);
        this.animations.play('explode');
    }

};
