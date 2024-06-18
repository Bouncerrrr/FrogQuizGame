class menu extends Phaser.Scene {
	constructor() {
		super('menu')
	}

	//Creating the menu screen with title, rules and play button
	create() {

		this.background = this.add.tileSprite(0, 0, config.width, config.height, "bg");
        this.background.setOrigin(0, 0);

		const titleText = this.add.text(config.width / 2, 50, "Space Among Letters", {

			fontSize: "50px",
			fontStyle: "bold",
			color: "#ffffff",

		  });

		  titleText.setOrigin(0.5);

		  const rulesText = this.add.text(
			config.width / 2,
			200,
			"Rules of the Game:\n\nIn the bottom right screen you will see an image.\nYou must fill in the name of the object shown in the image\nby shooting the spaceships with letters in the correct order.",
			{
			  fontSize: "18px",
			  color: "#ffffff",
			  align: "center",
			}
		  );
		  rulesText.setOrigin(0.5);


		this.playBut = this.add
			.sprite(480, 300, 'playBut')
			.setScale(8)
			.setOrigin(0.5, 0)
			.setInteractive()
		this.playBut.on('pointerdown', () => {
			this.scene.start('main')
		})
	}
}