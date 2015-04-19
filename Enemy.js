/**
 * Created by ehtd on 4/18/15.
 */

var Enemy = function(game, target, optionalX, optionalY, speed) {

    if (target != null) {
        Phaser.Sprite.call(this, game, optionalX, optionalY, 'enemy');
    } else {
        Phaser.Sprite.call(this, game, optionalX, optionalY, 'enemy');
        this.zoneX = optionalX;
        this.zoneY = optionalY;
    }

    this.target = target;

    this.anchor.setTo(0.5, 0.5);

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.MAX_SPEED = speed;
    this.MIN_DISTANCE = 4;
    this.MIN_DISTANCE_ATTACK = 200;
    this.MAX_HP = 100000;
    this.HP = this.MAX_HP;

    this.animations.add('walk', [0,1,2,3], 8, 1);
    var attackAnimation = this.animations.add('attack', [0], 8, false);

    attackAnimation.onComplete.add(function(sprite, animation){
        this.attacking = false;
        this.animations.play('walk');
    }, this);

    this.animations.play('walk');

    this.attacking = false;

    this.maxAttacks = 3;
    this.attacks = this.game.add.group();

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

    this.game.physics.arcade.overlap(this.game.playerReference, this.attacks, function(player, ball){
        ball.kill();
        this.game.playerReference.kill();
    }, null, this);

    //TODO: Reconsider if ducks can flee is hit
    //this.game.physics.arcade.overlap(this.game.ducksReference, this.attacks, function(duck, ball){
    //    duck.flee();
    //}, null, this);

    if (this.target != null) {

        // Calculate distance to target
        var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);

        // If the distance > MIN_DISTANCE then move
        if (distance > Math.ceil(this.MIN_DISTANCE)) {

            if (this.attacking == false) { // Continue chasing target
                var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);
                this.body.velocity.x = Math.ceil(Math.cos(rotation) * this.MAX_SPEED);
                this.body.velocity.y = Math.ceil(Math.sin(rotation) * this.MAX_SPEED);
                this.animations.play('walk');
            }

            if (distance < this.MIN_DISTANCE_ATTACK) {
                this.body.velocity.setTo(0, 0);
                this.attacking = true;
                this.animations.play('attack');
                this.attack();
            }

        } else {
            this.body.velocity.setTo(0, 0);
        }
    } else {

    }

};

Enemy.prototype.render = function() {

    var maxSize = 100;
    var barWidth = (this.HP*maxSize)/(this.MAX_HP);
    var hpBar = new Phaser.Rectangle(this.x - this.width +10, this.y + this.height/2 + 10 , barWidth, 4);
    //var circle = new Phaser.Circle(this.x, this.y, this.SEARCH_BREAD_DISTANCE*2 ) ;
    this.game.debug.geom( hpBar, 'rgba(255,0,0,0.3)' );

}

Enemy.prototype.attack = function() {

    if (this.attacks.countLiving() < this.maxAttacks && this.game.playerReference.alive ){
        var ball = new Ball(this.game, this.game.playerReference, this.x, this.y, 40);
        this.game.add.existing(ball);
        this.attacks.add(ball);
    }

}