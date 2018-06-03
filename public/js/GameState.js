
let GameState = {
  create : function(){

    this.levelData = JSON.parse(this.game.cache.getText("level_01Data"));

    this.ninja = this.game.add.sprite(this.levelData.playerStartPosition.x,this.levelData.playerStartPosition.y,"ninja",0);
    this.ninja.anchor.setTo(0.5);
    this.ninja.inputEnabled = true;
    this.ninja.input.pixelPerfectClick = true;
    this.ninja.input.enableDrag();
    this.ninja.animations.add("walk",[1,2,3,2],6,true);
    this.ninja.customParams = {
      speed : 250
    }
    this.game.physics.arcade.enable(this.ninja);
    this.ninja.body.collideWorldBounds = true;
    this.ninja.body.width = 16;
    this.ninja.body.offset.x = 8;


    this.ground = this.game.add.sprite(0,840,"ground");
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;


    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    let platformsData = this.levelData.platformsData;
    platformsData.forEach(platform => {
      this.platforms.create(platform.x,platform.y,"platform");
    });
    // this.platforms.
    this.platforms.setAll("body.immovable",true);
    this.platforms.setAll("body.allowGravity",false);
    this.platforms.setAll("body.offset.y",26);
    this.platforms.setAll("body.height",39);

    this.fires = this.add.group();
    this.fires.enableBody = true;
    let firesData = this.levelData.firesData;
    firesData.forEach(fire => {
      let concreteFire = this.fires.create(fire.x,fire.y,"fire",0);
      concreteFire.animations.add("burn",[0,1,2,3],6,true);
      concreteFire.play("burn");
    });
    // this.platforms.
    this.fires.setAll("body.immovable",true);
    this.fires.setAll("body.allowGravity",false);

    this.balls = this.add.group();
    this.balls.enableBody = true;
    this.ballsData = this.levelData.ballsData;



    this.queen = this.game.add.sprite(60, 90, "queen");
    this.queen.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.queen);
    this.queen.body.allowGravity = false;
    this.queen.body.immovable = true;


    // ninja movement :
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.createOnScreenControls();

    // camera work
    this.game.camera.follow(this.ninja);
    this.ballCreater = this.game.time.events.loop(Phaser.Timer.SECOND*6, this.createBall,this);
    this.createBall();
  },
  update : function(){

    this.game.physics.arcade.collide(this.ninja, this.ground);
    this.game.physics.arcade.collide(this.ninja, this.platforms);
    this.game.physics.arcade.collide(this.balls, this.platforms);
    this.game.physics.arcade.collide(this.balls, this.ground);
    this.game.physics.arcade.overlap(this.ninja, this.fires, this.handleDeath);
    this.game.physics.arcade.overlap(this.ninja, this.balls, this.handleDeath);
    this.game.physics.arcade.overlap(this.ninja, this.queen, this.handleWin);

    if(this.cursors.left.isDown || this.ninja.customParams.goLeft) {
      this.ninja.body.velocity.x = -this.ninja.customParams.speed;
      this.ninja.scale.setTo(-1,1);

      if (this.ninja.body.touching.down) {
        this.ninja.animations.play("walk");
      } else {
        this.ninja.frame = 1;
      }
    } else if(this.cursors.right.isDown || this.ninja.customParams.goRight) {
      this.ninja.body.velocity.x = this.ninja.customParams.speed;
      this.ninja.scale.setTo(1,1);

      if (this.ninja.body.touching.down) {
        this.ninja.animations.play("walk");
      } else {
        this.ninja.frame = 1;
      }
    } else {
      this.ninja.animations.stop();
      this.ninja.frame = 0;
      this.ninja.body.velocity.x = 0;
    }

    if((this.cursors.up.isDown || this.ninja.customParams.mustJump) && this.ninja.body.touching.down) {
      this.ninja.body.velocity.y = -this.ninja.customParams.speed * 2.2;
    }


    this.balls.forEach(ball => {
      if(ball.x < 30 && ball.y > 760){
        ball.kill();
      }
    })
  },
  handleDeath(){
    game.state.start("HomeState");
  },
  handleWin(ninja,queen){
    game.state.start("WinState");
  },
  createOnScreenControls(){
    this.leftArrow = this.add.button(10,585,"moveBox");
    this.rightArrow = this.add.button(100,585,"moveBox");
    this.actionButton = this.add.button(270,585,"jumpBox");

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;

    this.actionButton.events.onInputDown.add(() => {
      this.ninja.customParams.mustJump = true;
    });
    this.actionButton.events.onInputOver.add(() => {
      this.ninja.customParams.mustJump = true;
    });

    this.actionButton.events.onInputUp.add(() => {
      this.ninja.customParams.mustJump = false;
    });
    this.actionButton.events.onInputOut.add(() => {
      this.ninja.customParams.mustJump = false;
    });

    this.leftArrow.events.onInputDown.add(() => {
      this.ninja.customParams.goLeft = true;
    });
    this.leftArrow.events.onInputOver.add(() => {
      this.ninja.customParams.goLeft = true;
    });

    this.leftArrow.events.onInputUp.add(() => {
      this.ninja.customParams.goLeft = false;
    });
    this.leftArrow.events.onInputOut.add(() => {
      this.ninja.customParams.goLeft = false;
    });

    this.rightArrow.events.onInputDown.add(() => {
      this.ninja.customParams.goRight = true;
    });
    this.rightArrow.events.onInputOver.add(() => {
      this.ninja.customParams.goRight = true;
    });

    this.rightArrow.events.onInputUp.add(() => {
      this.ninja.customParams.goRight = false;
    });
    this.rightArrow.events.onInputOut.add(() => {
      this.ninja.customParams.goRight = false;
    });
  }, createBall(){
    let ball = this.balls.getFirstExists(false);
    if(!ball){
      ball = this.balls.create(-100, -100,"ball" ,0);
      ball.anchor.setTo(0.5);
      ball.animations.add("roll",[0,1,2,3], 12, true);
      ball.play("roll");
    };
    ball.body.bounce.set(1,0);
    ball.reset(this.ballsData.x, this.ballsData.y);
    ball.body.velocity.x = this.ballsData.speed;
    ball.body.collideWorldBounds = true;
    // ball.body.onWorldBounds = new Phaser.Signal();
  }
};
