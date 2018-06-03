let WinState = {
  create(){
    this.textStyle = {
      font : "40pt bold",
      fill : "#fff"
    };

    this.background = this.game.add.sprite(0,0,"background");
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.startGame, this);

    let tapText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "tap to try again", this.textStyle);
    tapText.anchor.setTo(0.5);
    let winText = this.game.add.text(this.game.world.centerX, this.game.world.centerY-180, "you won :3", this.textStyle);
    winText.anchor.setTo(0.5);

  },
  startGame(){
    // console.log("clicked");
    this.game.state.start("GameState");
  }
}
