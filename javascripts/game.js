function Game() {
  this.timeLeft = null;
  this.lives = 3; 
  this.score = 0;  
  this.numberHoles = 5;
  this.level = 1;
}

Game.prototype.start = function() {
  this.gameScreen = buildDOM(`
    <main>
      <div class="whole-page">
      <img class="logo" alt="Whack-a-ditto logo">
      <audio id="audioGame" src="sounds/battle.mp3"></audio>
      <audio id="audioSmash" src="sounds/smash.mp3"></audio>
      <audio id="audioDiglett" src="sounds/diglett.m4a"></audio>
      <header>
        <p class="countdown text">Countdown: <span class="time"></span></p>
        <p class="lives text">Lives: <span class="livesNumber"></span></p>
        <p class="score text">Score: <span class="scoreNumber"></span></p>
      </header>
      <div class="grid-container hammer other">
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>  
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>  
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div> 
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>  
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>  
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div> 
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>  
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div>
        <div class="grid-item"><img class="grid-image" src="" alt=""></div> 
        <div class="grid-item"><img class="grid-image" src="" alt=""></div> 
      </div>
      <footer>
        <p class="level text"> Level <span class="levelNumber"></span></p>
      </footer>
      </div>
    </main>
  `);

  document.body.prepend(this.gameScreen);

  this.soundGame = document.getElementById("audioGame");
  this.soundSmash = document.getElementById("audioSmash");
  this.soundDiglett = document.getElementById("audioDiglett");
  this.soundGame.play();

  this.timeElement = this.gameScreen.querySelector('.time');
  this.timeLeft = 20;
  this.timeElement.innerText = this.timeLeft;

  this.livesNoElement = this.gameScreen.querySelector('.livesNumber');
  this.livesNoElement.innerText = this.lives;

  this.scoreNoElement = this.gameScreen.querySelector('.scoreNumber');
  this.scoreNoElement.innerText = this.score;

  this.page = this.gameScreen.querySelector('.whole-page');

  this.gridElement = this.gameScreen.querySelectorAll('.grid-image');

  this.holePositions = [];
  
  while(this.holePositions.length < this.numberHoles) {
      this.randomnumber = Math.floor(Math.random() * 25);
      // Not a fan of continue...
      if(this.holePositions.indexOf(this.randomnumber) > -1) continue;
      this.holePositions[this.holePositions.length] = this.randomnumber;
  }

  this.diglettPosition = Math.floor(Math.random() * this.numberHoles);
  this.diglett = this.holePositions[this.diglettPosition];

  this.timePositions = [];
  
  while(this.timePositions.length < this.numberHoles) {
      this.randomnumber = Math.floor(Math.random() * 15) + 5;
      this.timePositions[this.timePositions.length] = this.randomnumber;
  }
  // If you want to increase the grid it will likely not work. Use the length of the grid
  for(var i = 0; i < 25; i++) {
    this.gridElement[i].classList.add('ground');
  }

  for(var i = 0; i < this.numberHoles; i++) {
    this.gridElement[this.holePositions[i]].classList.add('hole');
  }

  this.levelElement = this.gameScreen.querySelector('.level');
  this.levelNoElement = this.gameScreen.querySelector('.levelNumber');
  if(this.level === 5) {
    this.levelElement.innerText = 'Final level';
  } else this.levelNoElement.innerText = this.level;

  this.handleClick = function(event){
    this.checkHit(event);
  }.bind(this)

  document.addEventListener('click', this.handleClick);
  this.startTimer();
}

Game.prototype.startTimer = function() {
  this.intervalId = setInterval(function() {
    this.timeLeft--;
    this.timeElement.innerText = this.timeLeft;
    for(var i = 0; i < this.numberHoles; i++) {
      if(this.timeLeft === this.timePositions[i]) this.createPokemon(this.holePositions[i]);
    }
    if (this.timeLeft === 0) {
      if(this.level === 5) this.finishGame();
      else {
      clearInterval(this.intervalId);
      this.numberHoles = this.numberHoles + 5;
      this.levelUp();
      }
    }
  }.bind(this), 1000);
}

Game.prototype.levelUp = function() {
  document.removeEventListener('click', this.handleClick);
  this.gameScreen.remove();
  this.level++;
  this.start();
}


Game.prototype.createPokemon = function(position) {  
  // Use the normal structure of the if when doing an else, like this, it loses readability
  if (this.diglett === position) this.gridElement[position].classList.add('diglett');
  else {
    this.gridElement[position].classList.add('ditto');
  }
}

Game.prototype.checkHit = function(event) {
  this.target = event.target;
  if (this.lives === 1 && this.target.classList.contains('diglett')) {
    this.soundDiglett.play();
    clearInterval(this.intervalId);
    this.finishGame();
  } else if(this.target.classList.contains('diglett')) { 
    this.soundDiglett.play();
    this.page.classList.add('shaky');
    this.target.classList.remove('diglett');
    this.lives--;
    this.livesNoElement.innerText = this.lives;
  } else if(this.target.classList.contains('ditto')) { 
    this.soundSmash.currentTime = 0;
    this.soundSmash.play();
    this.target.classList.remove('ditto');
    this.score += (this.timeLeft % 25)  * 25;
    this.scoreNoElement.innerText = this.score;
  }
}

Game.prototype.setGameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}

Game.prototype.finishGame = function() {
  document.removeEventListener('click', this.handleClick);
  this.gameScreen.remove();
  this.gameOverCallback();
}
