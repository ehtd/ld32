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
    this.MAX_HP = 100000;
    this.HP = this.MAX_HP;

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

    if (this.target != null) {

        // Calculate distance to target
        var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);

        // If the distance > MIN_DISTANCE then move
        if (distance > Math.ceil(this.MIN_DISTANCE)) {
            // Calculate the angle to the target
            var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);

            // Calculate velocity vector based on rotation and this.MAX_SPEED
            this.body.velocity.x = Math.ceil(Math.cos(rotation) * this.MAX_SPEED);
            this.body.velocity.y = Math.ceil(Math.sin(rotation) * this.MAX_SPEED);
        } else {
            this.body.velocity.setTo(0, 0);
        }
    } else {

        //this.roam();
    }

};

Enemy.prototype.render = function() {

    var maxSize = 100;
    var barWidth = (this.HP*maxSize)/(this.MAX_HP);
    var hpBar = new Phaser.Rectangle(this.x - this.width, this.y + this.height/2 + 10 , barWidth, 4);
    //var circle = new Phaser.Circle(this.x, this.y, this.SEARCH_BREAD_DISTANCE*2 ) ;
    this.game.debug.geom( hpBar, 'rgba(0,255,0,0.3)' );
}
