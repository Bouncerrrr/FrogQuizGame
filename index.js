var config = {
	width: 960,
	height: 640,
	scale: {
	  mode: Phaser.Scale.FIT,
	},
	physics: {
	  default: 'arcade',
	  arcade: { debug: false },
	},
	scene: [preloader, menu, main],
	pixelArt: true,
  };

const game = new Phaser.Game(config)
