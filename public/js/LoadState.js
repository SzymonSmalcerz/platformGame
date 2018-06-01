let LoadState = {

  preload : function(){
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY,"ninja",0);
    this.logo.anchor.setTo(0.5);

    this.progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, "progressBar");
    this.progressBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.progressBar);

    this.load.image("ground", "assets/ground.png");
    this.load.spritesheet("fire", "assets/fire.png",32,32,5);
    this.load.image("ball", "assets/ball.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("queen", "assets/queen.png");
    this.load.image("moveBox", "assets/moveBox.png");
    this.load.image("jumpBox", "assets/jumpBox.png");
  },
  create(){
    this.game.state.start("HomeState");
  }
}
