class preloader extends Phaser.Scene {
	constructor() {
		super('boot')
	}

	preload() {
		this.load.image('ffBlue', 'assets/firefly_blue.png')
		this.load.image('ffGreen', 'assets/firefly_green.png')
		this.load.image('ffRed', 'assets/firefly_red.png')
		this.load.image('ffYellow', 'assets/firefly_yellow.png')
		this.load.image('playBut', 'assets/playBut.png')
		this.load.image('empty', 'assets/null.png')
		this.load.image('frog', 'assets/frog.png')
		this.load.image('orange', 'assets/orange.png')
		this.load.image('tomato', 'assets/tomato.png')
		this.load.image('horse', 'assets/horse.png')
		this.load.image('bullet', 'assets/bullet.png')
		this.load.image('bg', 'assets/sky.png')
		this.load.image('hearth1', 'assets/hearth1.png')
		this.load.image('hearth2', 'assets/hearth2.png')
		this.load.image('hearth3', 'assets/hearth3.png')
		this.load.image('hearth4', 'assets/hearth4.png')
		this.load.image('hearth5', 'assets/hearth5.png')
		this.load.image('hearth6', 'assets/hearth6.png')
		this.load.image('hearth7', 'assets/hearth7.png')
		this.load.image('companion', 'assets/companion.png')
		this.load.image('dash', 'assets/dash.png')
		
	}

	create() {
		this.scene.start('menu')
	}
}
