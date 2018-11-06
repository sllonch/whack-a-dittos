function Game() {
  //this.onGameOverCallback
  this.timeLeft = null;
  this.lives = 2; 
  this.score = 0;  
  this.numberHoles = 5;
  this.grid = [];
  this.gridElementTypes = []; 
  this.level = 1;
}

Game.prototype.start = function() {

  this.gameScreen = buildDOM(`
    <main>
      <img class="logo" alt="Whack-a-ditto logo">
      <header>
        <p class="countdown text">Countdown: <span class="time"></span></p>
        <p class="lives text">Lives: <span class="livesNumber"></span></p>
        <p class="score text">Score: <span class="scoreNumber"></span></p>
      </header>
      <div class="grid-container hammer">
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
    </main>
  `);

  document.body.prepend(this.gameScreen);

  this.timeElement = this.gameScreen.querySelector('.time');
  this.timeLeft = 25;
  this.timeElement.innerText = this.timeLeft;

  this.livesNoElement = this.gameScreen.querySelector('.livesNumber');
  this.livesNoElement.innerText = this.lives;

  this.scoreNoElement = this.gameScreen.querySelector('.scoreNumber');
  this.scoreNoElement.innerText = this.score;

  this.gridElement = this.gameScreen.querySelectorAll('.grid-image');

  this.holePositions = [];
  
  while(this.holePositions.length < this.numberHoles) {
      this.randomnumber = Math.floor(Math.random() * 25);
      if(this.holePositions.indexOf(this.randomnumber) > -1) continue;
      this.holePositions[this.holePositions.length] = this.randomnumber;
  }

  this.diglettPosition = Math.floor(Math.random() * this.numberHoles);
  this.diglett = this.holePositions[this.diglettPosition];

  this.timePositions = [];
  
  while(this.timePositions.length < this.numberHoles) {
      this.randomnumber = Math.floor(Math.random() * 20) + 5;
      this.timePositions[this.timePositions.length] = this.randomnumber;
  }
  
  for(i = 0; i < 25; i++) {
    this.gridElement[i].classList.add('ground');
  }

  for(j = 0; j < this.numberHoles; j++) {
    this.gridElement[this.holePositions[j]].classList.add('hole');
  }

  this.levelNoElement = this.gameScreen.querySelector('.levelNumber');
  this.levelNoElement.innerText = this.level;

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

    for(k = 0; k < this.numberHoles; k++) {
      if(this.timeLeft === this.timePositions[k]) this.createPokemon(this.holePositions[k]);
    }

    if (this.timeLeft === 0) {
      if(this.level === 5) this.finishGame();
      else {
      clearInterval(this.intervalId);
      this.numberHoles = this.numberHoles + 5;
      this.levelUp();
      }
    }

  }.bind(this), 500);
}

Game.prototype.levelUp = function() {
  document.removeEventListener('click', this.handleClick);
  this.gameScreen.remove();
  this.level++;
  this.levelNoElement.innerText = this.level;
  this.start();
}


Game.prototype.createPokemon = function(position) {  
  if (this.diglett === position) this.gridElement[position].classList.add('diglett');
  else {
    this.gridElement[position].classList.add('ditto');
  }
}

Game.prototype.checkHit = function(event) {
  this.target = event.target;
  if (this.lives === 1 && this.target.classList.contains('diglett')) {
    clearInterval(this.intervalId);
    this.finishGame();
  } else if(this.target.classList.contains('ditto')) { 
    this.target.classList.remove('ditto');
    this.score += (this.timeLeft % 25)  * 25;
    this.scoreNoElement.innerText = this.score;
  } else if(this.target.classList.contains('diglett')) { 
    this.target.classList.remove('diglett');
    this.lives--;
    this.livesNoElement.innerText = this.lives;
  }
}

//Game.prototype.score = function() {
  //this.addScore = 25;
  //this.scoreNoElement.innerText = this.addScore;
//}

//Game.prototype.killDitto = function() {
//  this.gridElement[position].classList.add('hole');
//  this.score += 25;
//}

Game.prototype.setGameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}

Game.prototype.finishGame = function() {
  document.removeEventListener('click', this.handleClick);
  this.gameScreen.remove();
  this.gameOverCallback();
}
