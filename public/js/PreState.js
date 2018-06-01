let PreState = {
  init : function (){
    this.game.stage.backgroundColor = "#fff";
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.refresh();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    this.game.world.setBounds(0,0,360,900);
  },
  preload(){
    this.load.image("progressBar","assets/progresBar.png");
    this.load.spritesheet("ninja", "assets/ninja.png",32,36,5);
  },
  create(){
    this.game.state.start("LoadState");
  }
}
