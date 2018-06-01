let HomeState = {
  init(){
    this.game.stage.backgroundColor = "#000";
  },
  create(){
    this.textStyle = {
      font : "20pt bold",
      fill : "#fff"
    };

    this.ground = this.game.add.sprite(0,580,"ground");
    this.ground.inputEnabled = true;
    this.ground.events.onInputDown.add(this.startGame, this);

    let tapText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "tap to start", this.textStyle);
    tapText.anchor.setTo(0.5);

  },
  create(){
    this.game.state.start("GameState");
  },
  startGame(){
    console.log("clicked");
    this.game.state.start("GameState");
  }
}
