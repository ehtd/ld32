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

    this.player.throwingBread = false;

    this.player.animations.add('walk', [0,1,2,3], 8, 1);
    this.player.animations.add('stop', [0], 8, 1);
    var breadAnimation = this.player.animations.add('bread', [4], 8, 0);

    breadAnimation.onComplete.add(function(sprite, animation){
        this.player.throwingBread = false;
        this.player.animations.play('stop');
    }, this);

    var breadAnimationMoving = this.player.animations.add('breadMoving', [4,5,6,7], 16, 0);

    breadAnimationMoving.onComplete.add(function(sprite, animation){
        this.player.throwingBread = false;
        this.player.animations.play('walk');
    }, this);

    this.player.animations.play('stop');

    this.game.playerReference = this.player;

    this.game.camera.follow(this.player);

    this.breads = this.game.add.group();

    this.freeDucks = this.game.add.group();
    this.game.ducksReference = this.freeDucks;
    this.player.ducks = this.freeDucks;

    this.player.gameReference = this.game;

    this.enemies = this.game.add.group();

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

    this.addDucks();
    this.addEnemies();

    this.game.input.onDown.add(this.dropBread, this);

    this.ownedDucksText = this.game.add.text(40, 110, "My Ducks: 0", {
        font: "12px Arial",
        fill: "#ff0044",
        align: "center"
    });
    this.ownedDucksText.fixedToCamera = true;

    this.otherDucksText = this.game.add.text(40, 130, "Other Ducks: 0", {
        font: "12px Arial",
        fill: "#ff0044",
        align: "center"
    });
    this.otherDucksText.fixedToCamera = true;

    this.remainingDucksText = this.game.add.text(40, 150, "Remaining Ducks: 0", {
        font: "12px Arial",
        fill: "#ff0044",
        align: "center"
    });
    this.remainingDucksText.fixedToCamera = true;

    this.player.events.onKilled.add(function(player) {
        player.ducks.forEach(function(duck){
            if (duck.hasOwner) {
                duck.flee();
            }
        });

        player.gameReference.state.start(CONSTANT_STATES.DEFEAT);
    });

    this.quackSound = this.game.add.audio('quack', 1, false);
    this.loop = this.game.add.audio('loop', 1, true);
    this.loop.play();

    versioning(this.game);
}

GameState.prototype.update = function(){

    if (this.enemies.countLiving() == 0 ){

        //TODO: may want to delay the victory
        this.game.state.start(CONSTANT_STATES.VICTORY);
        return;
    }

    this.game.physics.arcade.overlap(this.freeDucks, this.breads, function(duck, bread){
        this.breads.remove(bread);
    }, null, this);


    this.game.physics.arcade.overlap(this.freeDucks, this.enemies, function(duck, enemy){
        if (duck.target != null) {
            enemy.HP -= 1;

            enemy.overlapped = true
            if (enemy.HP <= 0) {
                this.enemies.remove(enemy);

                //TODO: WIN GAME
            }
        }
    }, null, this);


    this.game.physics.arcade.overlap(this.player, this.enemies, function(player, enemy){
        player.kill();

        //TODO: END GAME

    }, null, this);


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

    if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0){
        if (this.player.throwingBread) {
            this.player.animations.play('breadMoving');
        } else {
            this.player.animations.play('walk');
        }

    } else {
        if (this.player.throwingBread) {
            this.player.animations.play('bread');
        } else {
            this.player.animations.play('stop');
        }
    }

    this.enemies.sort('y', Phaser.Group.SORT_ASCENDING);

    this.updateDuckStatus();

}

GameState.prototype.shutdown = function(){
    this.loop.stop();
}

GameState.prototype.render = function() {

    this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.player, 32, 500);

    //var circle = new Phaser.Circle(this.player.x, this.player.y, this.CONTROL_RADIUS ) ;
    //this.game.debug.geom( circle, 'rgba(255,255,0,0.3)' ) ;

    this.freeDucks.forEach(function(duck) {
        duck.render();
    });

    this.enemies.forEach(function(enemy) {
        enemy.render();
    });

}

GameState.prototype.dropBread = function(pointer) {

    if (this.player.alive) {

        this.quackSound.play();

        var bread = new Bread(this.game, this.player, pointer.worldX, pointer.worldY);

        this.player.throwingBread = true;

        this.game.add.existing(bread);
        this.breads.add(bread);
        this.player.bringToTop();

        this.freeDucks.forEach(function(duck) {
            duck.assignZone(bread.x, bread.y);
        });
    }

}

GameState.prototype.addDucks = function() {
    var NUMBER_OF_FREE_DUCKS = 300;
    var temp = this.player;
    for(var i = 0; i < NUMBER_OF_FREE_DUCKS; i++) {

        var randomX = this.game.rnd.integerInRange(6, this.game.world.bounds.width - 6);
        var randomY = this.game.rnd.integerInRange(6, this.game.world.bounds.height - 6);

        var duck = new Duck(this.game, null, randomX, randomY);
        this.game.add.existing(duck);
        this.freeDucks.add(duck);
    }
}

GameState.prototype.addEnemies = function() {
    var NUMBER_OF_ENEMIES = 4;
    for(var i = 0; i < NUMBER_OF_ENEMIES; i++) {

        var randomX = this.game.rnd.integerInRange(6, this.game.world.bounds.width - 6);
        var randomY = this.game.rnd.integerInRange(6, this.game.world.bounds.height - 6);

        var enemy = new Enemy(this.game, this.player, randomX, randomY, 40);
        this.game.add.existing(enemy);
        this.enemies.add(enemy);
    }
}

GameState.prototype.updateDuckStatus = function() {

    var freeDucks = 0;
    var aliveDucks = 0;
    var ownedDucks = 0;

    this.freeDucks.forEach(function(duck){
        if (duck.hasOwner) {
            ownedDucks++;
        } else {
            freeDucks++;
        }

        aliveDucks++;

    });

    this.ownedDucksText.setText("My Ducks: "+ ownedDucks);
    this.otherDucksText.setText("Other Ducks: "+ freeDucks);
    this.remainingDucksText.setText("Remaining Ducks: "+ aliveDucks);
}