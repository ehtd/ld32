var GameState = function(game){

};

GameState.prototype.preload = function(){


}


GameState.prototype.create = function(){
    console.log("Finish game");

    this.MAX_SPEED = 120;
    this.CONTROL_RADIUS = 200;

    this.game.add.tileSprite(0,0,3000,2000, 'background');
    this.game.world.setBounds(0,0,3000,2000);

    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.immovable = false;
    this.player.body.collideWorldBounds = true;

    this.player.ducks = this.game.add.group();
    this.player.ducks.enableBody = true;
    this.player.ducks.physicsBodyType = Phaser.Physics.ARCADE;

    this.game.camera.follow(this.player);

    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.W,
        Phaser.Keyboard.A,
        Phaser.Keyboard.S,
        Phaser.Keyboard.D,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT
    ]);

    this.duck = new Duck(this.game, null, this.player.x + 50, this.player.y + 50);
    this.game.add.existing(this.duck);

    var NUMBER_OF_DUCKS = 0;
    var temp = this.player;
    for(var i = 0; i < NUMBER_OF_DUCKS; i++) {
        var duck = new Duck(this.game, temp);
        this.player.ducks.add(duck);
        temp = duck;
        this.game.add.existing(duck);
    }

    this.game.input.onDown.add(this.dropBread, this);

    versioning(this.game);
}

GameState.prototype.update = function(){

    if (this.input.keyboard.isDown(Phaser.Keyboard.W) || this.input.keyboard.isDown(Phaser.Keyboard.UP)) {

        this.player.body.velocity.y = -this.MAX_SPEED;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.S) || this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

        this.player.body.velocity.y = this.MAX_SPEED;
    } else {
        // Stop the player from moving horizontally
        this.player.body.velocity.y = 0;
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.A) || this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

        this.player.body.velocity.x = -this.MAX_SPEED;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.D) || this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

        this.player.body.velocity.x = this.MAX_SPEED;
    } else {
        // Stop the player from moving horizontally
        this.player.body.velocity.x = 0;
    }
}

GameState.prototype.shutdown = function(){

}

GameState.prototype.render = function() {

    this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.player, 32, 500);

    var circle = new Phaser.Circle(this.player.x, this.player.y, this.CONTROL_RADIUS ) ;
    this.game.debug.geom( circle, 'rgba(255,255,0,0.3)' ) ;

    this.duck.render();

}

GameState.prototype.dropBread = function(pointer) {
    //var bread = new Bread(this.game, this.player, pointer.worldX, pointer.worldY);
    var bread = new Bread(this.game, this.player, this.player.x, this.player.y+40);
    this.game.add.existing(bread);
    this.player.bringToTop();
}