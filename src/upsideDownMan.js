class upsideDownMan extends Character {
	constructor(oldCharacter) {
		super();
		this.position = oldCharacter.position;
		this.velocity = oldCharacter.velocity;
		this.hp = oldCharacter.hp;

		this.mask = "UDM";
		this.img.src = "textures/BobUpsideDown.png";

		this.engaged = false;
	}

	action() {
		if (!this.engaged) {
			this.gravity = -this.gravity;
		}
		this.engaged = true;

		if (this.engaged) {this.img.src = "textures/BobUpsideDownUpsideDown.png";}
		// else {this.img.src = "textures/BobUpsideDown.png";}
	}
}

class speedMan extends Character {
	constructor(oldCharacter) {
		super();
		this.position = oldCharacter.position;
		this.velocity = oldCharacter.velocity;
		this.hp = oldCharacter.hp;

		this.mask = "SM";
		this.img.src = "textures/BobSpeed.png";
		this.engaged = false;
	}

	action() {
		this.engaged = !this.engaged;

		if (this.engaged) {this.horizontalMaxSpeed = 10;}
		else {this.horizontalMaxSpeed = 5;}
	}
}
