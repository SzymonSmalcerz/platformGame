
let GameState = {
  create : function(){


    this.ninja = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,"ninja",0);
    this.ninja.anchor.setTo(0.5);
    this.ninja.inputEnabled = true;
    this.ninja.input.pixelPerfectClick = true;
    this.ninja.input.enableDrag();
    this.ninja.animations.add("walk",[1,2,3,2],6,true);
    this.ninja.customParams = {
      speed : 250
    }
    this.game.physics.arcade.enable(this.ninja);
    // this.ninja.play("walk");

    this.ground = this.game.add.sprite(0,580,"ground");
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    let platformsData = [
      {"x" : -30, "y" : 450},
      {"x" : 170, "y" : 330},
      {"x" : 80, "y" : 80},
      {"x" : 20, "y" : 200}
    ];
    this.platforms = this.add.group();
    this.platforms.enableBody = true;

    platformsData.forEach(platform => {
      this.platforms.create(platform.x,platform.y,"platform");
    });
    this.platforms.setAll("body.immovable",true);
    this.platforms.setAll("body.allowGravity",false);



    this.queen = this.game.add.sprite(this.game.world.centerX, 90, "queen");
    this.queen.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.queen);
    this.queen.body.allowGravity = false;
    this.queen.body.immovable = true;


    // ninja movement :
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.createOnScreenControls();

    // camera work
    this.game.camera.follow(this.ninja);
    // this.reducer = this.game.time.events.loop(Phaser.Timer.SECOND*10, this.reduceStats,this);
  },
  update : function(){
    this.game.physics.arcade.collide(this.ninja, this.ground);
    // this.game.physics.arcade.overlap(this.ninja, this.ground, () => {
    //   console.log("overlap");
    // });

    if(this.cursors.left.isDown || this.ninja.customParams.goLeft) {
      this.ninja.body.velocity.x = -this.ninja.customParams.speed;
    } else if(this.cursors.right.isDown || this.ninja.customParams.goRight) {
      this.ninja.body.velocity.x = this.ninja.customParams.speed;
    } else {
      this.ninja.body.velocity.x = 0;
    }

    if((this.cursors.up.isDown || this.ninja.customParams.mustJump) && this.ninja.body.touching.down) {
      this.ninja.body.velocity.y = -this.ninja.customParams.speed * 2.2;
    }
  },
  animate(){
    this.ninja.play("walk");
  },
  handleDeath(){
    this.game.state.start("HomeState");
  },
  createOnScreenControls(){
    this.leftArrow = this.add.button(10,585,"moveBox");
    this.rightArrow = this.add.button(100,585,"moveBox");
    this.actionButton = this.add.button(270,585,"jumpBox");

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

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
  }
};
