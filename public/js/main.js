let game = new Phaser.Game(360,640, Phaser.CANVAS);


game.state.add("GameState", GameState);
game.state.add("PreState", PreState);
game.state.add("LoadState", LoadState);
game.state.add("HomeState", HomeState);
game.state.start("PreState");

window.addEventListener("resize", () => {
  game.scale.refresh();
});
