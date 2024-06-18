class main extends Phaser.Scene {
	constructor() {
		super('main');
	}
	
	//Important data needed for the game - lives and the question/word
	init(data) {

		this.lives = data.lives;
		this.word = data.word;

	}

	//Creating the scene parts and logic of the overall game
	create() {
		//Setting up assets:
		//background;
		this.background = this.add.tileSprite(0, 0, config.width, config.height, "bg");
        this.background.setOrigin(0, 0);

		//bullet sprite;
		this.bullet = this.physics.add.sprite(500, 500, "bullet").setScale(2);

		//dashboard of spaceship and companion frog;
		this.dash = this.add.image(480, 520, 'dash');
		this.companion = this.add.image(15, 520, 'companion').setOrigin(0).setScale(0.85);

		//health bar(hearth);
		this.hearth0 = this.add.image(15, 445, 'hearth2').setOrigin(0).setScale(0.85).setVisible(false);
		this.hearth1 = this.add.image(15, 445, 'hearth3').setOrigin(0).setScale(0.85).setVisible(false);
		this.hearth2 = this.add.image(15, 445, 'hearth4').setOrigin(0).setScale(0.85).setVisible(false);
		this.hearth3 = this.add.image(15, 445, 'hearth5').setOrigin(0).setScale(0.85).setVisible(false);
		this.hearth4 = this.add.image(15, 445, 'hearth6').setOrigin(0).setScale(0.85).setVisible(false);
		this.hearth5 = this.add.image(15, 445, 'hearth7').setOrigin(0).setScale(0.85).setVisible(false);
		this.hearths = [this.hearth0, this.hearth1, this.hearth2, this.hearth3, this.hearth4, this.hearth5];
		
		this.nextLetter = 0;

		//Setting up the question:
		//preparing array of questions;

		this.questions = [['FROG', 'frog'], ['HORSE', 'horse'], ['TOMATO', 'tomato'], ['ORANGE', 'orange']];

		//selecting random question;
		this.question = this.questions[Math.floor(Math.random() * this.questions.length)];

		//adding accompaning image to the question;
		this.image = this.add.image(730,430,this.question[1]).setOrigin(0).setScale(0.45);
		this.image.setScale(200/this.image.width);
		this.answer = this.question[0];
		this.underscores = [];
		this.letters = [];
		this.lettersText = [];

		//Setting up health machanic - each wronf hit loses a 'bar'
		if(this.lives == undefined){

			this.lives = 6;

		}

		for (let i=0; i<this.lives; i++){

			this.hearths[i].setVisible(true);

		}

		if(this.word == undefined){

			this.word = 1;

		}

		//Setting up random letter array - alphabet
		this.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

		//Setting up the answer
		for(let i=0; i<this.answer.length; i++){
			
			this.underscores.push(this.add.text(400+(i*35), 470, '_', {fontSize: '56px'}).setVisible(false));
			this.letters.push(this.add.text(400+(i*35), 470, this.answer.charAt(i), {fontSize: '56px'}).setVisible(false));
			this.lettersText.push(this.letters[i].text);
			this.alphabet.push(this.letters[i].text, this.letters[i].text, this.letters[i].text, this.letters[i].text, this.letters[i].text);

		}

		//Setting up fireflies-spaceships and how they fall down from upper screen to the bottom of it at random intervals
		//Fireflies are shortened to ff + color. Each firefly gets an individual letter
		this.flies = [];
		this.ffKeys = ["ffRed", "ffBlue", "ffYellow", "ffGreen"];

		this.time.addEvent({
			delay: 500,
			callback:() =>{

				let ff1 = [this.physics.add.sprite(Math.floor(Math.random()*1136), -1*Math.floor(Math.random()*1000), this.ffKeys[Math.floor(Math.random()*4)]).setVelocityY(100), this.add.text(0,0,this.alphabet[Math.floor(Math.random() * this.alphabet.length)], {color: "black", fontSize:"32px"}).setOrigin(0)];
				
				for (let i=0; i<this.flies.length; i++){
					this.physics.add.overlap(ff1, this.flies[i], (ff1, ff2) => {

						if(Math.abs(ff1.x - ff2.x) < 50){

							ff1.x = Math.floor(Math.random()*1136);

						}
							
					})

				}

				this.flies.push(ff1);

				this.physics.add.overlap(this.bullet, ff1[0], () => {

					ff1[0].y = 399;
					ff1[0].setVisible(false);
					ff1[1].setVisible(false);
					this.checkLetter(ff1[1].text);
					this.bullet.body.reset();
					this.bullet.x = this.bullet.y = 500;

				})

			}, loop: true

		})

		//Setting up shooting logic - bullet shot into direction where there was a mouseclick
		this.overlay = this.physics.add.sprite(0,0,"empty").setScale(1136).setOrigin(0).setDepth(999).setInteractive();

		this.overlay.on('pointerdown', () => {

			this.physics.moveTo(this.bullet, this.sys.game.input.activePointer.x, this.sys.game.input.activePointer.y, 1500);

		})
	}

	//Function to check whether the shot letter was correct
	checkLetter(letter){

		if(this.answer[this.nextLetter] == letter){

			this.letters[this.nextLetter].setVisible(true);
			this.underscores[this.nextLetter].setVisible(true);
			this.nextLetter++;

			if (this.nextLetter == this.answer.length) {
				if(this.word<3) {

					this.word++;
					this.scene.start("main", {lives: this.lives, word: this.word});
						
				}else {

					this.scene.start("menu");
						
				}

			}

		}else {

			this.lives--;
			this.hearths[this.lives].setVisible(false);
			if(this.lives<=0){

				window.location.reload();

			}
				
		}

	}

	//Setting up update to reset elements of the game - bullets and fireflies
	update() {
	
		if((this.bullet.y < 0 || this.bullet.x < 0) || (this.bullet.y > 640 || this.bullet.x > 1136)){

			this.bullet.body.reset();
			this.bullet.x = this.bullet.y = 500;

		}

		for (let i=0; i<this.flies.length; i++){

			this.flies[i][1].x = this.flies[i][0].x-10;
			this.flies[i][1].y = this.flies[i][0].y-15;

			if(this.flies[i][0].y>400){

				this.flies[i][0].destroy();
				this.flies[i][1].destroy();
				const firstHalf = this.flies.slice(0, i);
				const secondHalf = this.flies.slice(i+1);
				this.flies = firstHalf.concat(secondHalf);

			}

		}

	}

}
