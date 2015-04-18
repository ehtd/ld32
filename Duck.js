/**
 * Created by ehtd on 4/18/15.
 */

// Follower constructor
var Duck = function(game, target, optionalX, optionalY) {

    if (target != null) {
        Phaser.Sprite.call(this, game, target.x - target.width/2, target.y - target.height/2, 'duck');
    } else {
        Phaser.Sprite.call(this, game, optionalX, optionalY, 'duck');
        this.zoneX = optionalX;
        this.zoneY = optionalY;
    }

    this.target = target;

    this.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.MAX_SPEED = 260; // pixels/second
    this.MIN_DISTANCE = 16; // pixels

    this.zoneAssigned = false;
    this.bread = null;

};

Duck.prototype = Object.create(Phaser.Sprite.prototype);
Duck.prototype.constructor = Duck;

Duck.prototype.update = function() {

    if (this.target != null) {
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
    } else { //A duck without owner

        this.roam();
    }

};

Duck.prototype.render = function() {
    //var circle = new Phaser.Circle(this.x, this.y, this.SEARCH_BREAD_DISTANCE*2 ) ;
    //this.game.debug.geom( circle, 'rgba(0,255,0,0.3)' );
}

Duck.prototype.roam = function() {

    if (this.zoneAssigned) {
        var distance = this.game.math.distance(this.x, this.y, this.zoneX, this.zoneY);

        //Move to zone
        if (distance > 2) {
            // Calculate the angle to the target
            var rotation = this.game.math.angleBetween(this.x, this.y, this.zoneX, this.zoneY);

            // Calculate velocity vector based on rotation and this.MAX_SPEED
            this.body.velocity.x = Math.ceil(Math.cos(rotation) * this.MAX_SPEED);
            this.body.velocity.y = Math.ceil(Math.sin(rotation) * this.MAX_SPEED);
        } else {

            this.body.velocity.setTo(0, 0);
            this.zoneX = 0;
            this.zoneY = 0;
            this.target = this.game.playerReference;
            this.zoneAssigned = false;
        }
    }
}

Duck.prototype.assignZone = function(x, y) {
    this.zoneX = x;
    this.zoneY = y;
    this.zoneAssigned = true;
}
