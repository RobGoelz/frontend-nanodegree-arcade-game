// Enemies our player must avoid
// added an additional input, speed, per the advice of Matthew Cranford
// see: https://matthewcranford.com/arcade-game-walkthrough-part-5-adding-enemies/
const Enemy = function (xPos, yPos, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = xPos;
  this.y = yPos;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < 500) {
    this.x += this.speed * dt;
  } else {
    this.x = -100;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
// This class requires an update(), render() and
// a handleInput() method.
// added a reset function, per advice of Matthew Cranford
// see: https://matthewcranford.com/arcade-game-walkthrough-part-6-collisions-win-conditions-and-game-resets/
const Player = function () {
  this.sprite = 'images/char-horn-girl.png';
  this.xPos = 200;
  this.yPos = 400;

// found the advice from Peter (solittletime) to be most effective for this
// see: https://discussions.udacity.com/t/i-dont-understand-how-to-code-classic-arcade-game/527836
  this.update = function (dt) {
    for (let enemy of allEnemies) {
      let dtx = this.xPos - enemy.x - 15;
      let dty = this.yPos - enemy.y - 20;
      let distance = Math.sqrt(dtx * dtx + dty * dty);

      if (distance < 56) {
        alert('Ouchie! Play again?');
        this.reset();
      }
    }
    if (this.yPos === -15) {
      alert('You Win! Play again?');
      this.reset();
    }
  };

  this.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
  };

  this.reset = function () {
    this.xPos = 200;
    this.yPos = 400;
  };

  this.handleInput = function (input) {
    switch (input) {
      case 'up':
        if (this.yPos > -15) {
          this.yPos -= 83;
        }
        break;
      case 'left':
        if (this.xPos > 0) {
          this.xPos -= 101;
        }
        break;
      case 'right':
        if (this.xPos < 400) {
          this.xPos += 101;
        }
        break;
      case 'down':
        if (this.yPos < 400) {
          this.yPos += 83;
        }
        break;
    }
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Created multiple enemies for an additional challenge

const player = new Player();

const beetle1 = new Enemy(-150, 65, 300);
const beetle2 = new Enemy(-150, 65, 100);
const beetle3 = new Enemy(-200, 145, 75);
const beetle4 = new Enemy(-400, 145, 150);
const beetle5 = new Enemy(-100, 230, 75);
const beetle6 = new Enemy(-250, 230, 50);

const allEnemies = [];
allEnemies.push(beetle1, beetle2, beetle3, beetle4, beetle5, beetle6);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. DO NOT MODIFY
document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
