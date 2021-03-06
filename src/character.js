class Character {

  constructor (GRID_SIZE) {
    this.horizontalMaxSpeed = 10;
    this.verticalMaxSpeed = 10;
    this.gravity = 30;

    //Velocity = Length moved/game loop length
    this.velocity = {
      x: 0,
      y: 0
    }

    //Pixel coordinates
    this.position = {
      x: 60,
      y: 60
    }

    this.hp = 500;
    this.hpBuffer = 150;

    this.GRID_SIZE = GRID_SIZE;

    this.height = this.GRID_SIZE * 2;
    this.width = this.GRID_SIZE;

    this.mask = null;
    this.img = document.createElement("img");
    this.img.src = "textures/Bob.png";
  }

  //Game loops every 0.1 secs
  //Accelerates to full speed from nothing in 1 seconds
  updatePosition(keyTracker, level) {

    if (keyTracker.left) {
        if (!keyTracker.shift) {
            if (this.velocity.x > -this.horizontalMaxSpeed) {
                this.velocity.x--;
            }
        } else {
            if (this.velocity.x > -this.horizontalMaxSpeed - 2) {
                this.velocity.x -= 0.5;
            }
        }
    }

    if (keyTracker.right) {
        if (!keyTracker.shift) {
            if (this.velocity.x < this.horizontalMaxSpeed) {
                this.velocity.x++;
            }
        } else {
            if (this.velocity.x < this.horizontalMaxSpeed + 2) {
            this.velocity.x += 0.5;
            }
        }
    }

    if (!keyTracker.left && !keyTracker.right) {
        this.velocity.x *= 0.7;
    }

    if (keyTracker.up) {
        if (this.gravity > 0) {
            if (!keyTracker.down) {
                if (isObstructed(level, this.position.x, this.position.y + this.height + 0.1) || isObstructed(level, this.position.x + this.width, this.position.y + this.height + 0.1)) {
                    this.velocity.y = -this.verticalMaxSpeed;
                } else {
                    this.velocity.y += (this.gravity - this.velocity.y) * 0.0075;
                }
            }
        } else {
            if (!keyTracker.down) {
                if (isObstructed(level, this.position.x, this.position.y - 0.1) || isObstructed(level, this.position.x + this.width, this.position.y - 0.1)) {
                    this.velocity.y = this.verticalMaxSpeed;
                } else {
                    this.velocity.y += (this.gravity - this.velocity.y) * 0.0075;
                }
            }
        }
    }

    if (keyTracker.down) {
        this.velocity.y += (this.gravity - this.velocity.y) * 0.02;

    }

    if (!keyTracker.up && !keyTracker.down) {
        this.velocity.y += (this.gravity - this.velocity.y) * 0.015;
    }

    if (isHurt(level, this.position.x + 10, this.position.y + this.height - 10) || isHurt(level, this.position.x + this.width - 10, this.position.y + this.height - 10)) {
        this.hp -= 3;
        this.hpBuffer = 0;
    } else if (this.hp < 500) {
        this.hp += 1;
    } else if (this.hpBuffer < 150) {
        this.hpBuffer += 1;
    }

}

    drawHUD(ctx, level) {
        if (this.hp < 500 || this.hpBuffer < 150) {
            if (this.hp > 250) {
              ctx.fillStyle = "#ADFF2F";
            } else if (this.hp > 100) {
              ctx.fillStyle = "#FF4500";
            } else {
              ctx.fillStyle = "#000000";
            }
            ctx.fillRect(this.position.x, this.position.y - 10, level.GRID_SIZE * (this.hp / 500), 5);
        }
    }

  //move adds velocity to the character in the given direction
  move(level) {
      //this.position.x += this.velocity.x;

      let x = this.position.x + ((this.velocity.x / 5) * this.GRID_SIZE) / 20;
      let y = this.position.y + ((this.velocity.y / 6) * this.GRID_SIZE) / 20;

      if (!isObstructed(level, x + (this.width / 2), y) && !isObstructed(level, x + (this.width / 2), y + this.height)) {
          this.position.y = y;
      } else {
          this.position.y = Math.round(y/this.GRID_SIZE) * this.GRID_SIZE;
          this.velocity.y = 0;
      }

      if (!isObstructed(level, x, y + (3 * this.height / 4)) && !isObstructed(level, x + this.width, y + (3 * this.height / 4))
        && !isObstructed(level, x, y + (this.height / 4)) && !isObstructed(level, x + this.width, y + (this.height / 4))) {
          this.position.x = x;
      } else {
          this.position.x = Math.round(x/this.GRID_SIZE) * this.GRID_SIZE;
          this.velocity.x = 0;
      }
  }

  //draw the character
  draw(ctx) {
      if (this.img.src) {
          ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
      } else {
        //draw the character
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  action() {
      //there is no action
  }
}
