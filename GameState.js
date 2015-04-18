var GameState = function(game){

};

GameState.prototype.preload = function(){


}


GameState.prototype.create = function(){
    console.log("Finish game");

    this.MAX_SPEED = 120;

    this.game.add.tileSprite(0,0,3000,2000, 'background');
    this.game.world.setBounds(0,0,3000,2000);

    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.immovable = false;
    this.player.body.collideWorldBounds = true;

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


