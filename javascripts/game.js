function Game() {
  //this.onGameOverCallback
  this.timeLeft = null;
  this.lives = 0; 
  this.score = 0;  
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
  this.timeElement.innerText = 0;

  this.livesNoElement = this.gameScreen.querySelector('.livesNumber');
  this.livesNoElement.innerText = 2;

  //this.score = 0; 
  this.scoreNoElement = this.gameScreen.querySelector('.scoreNumber');
  this.scoreNoElement.innerText = 0

  this.gridElement = this.gameScreen.querySelectorAll('.grid-image');

  this.holePositions = [];
  
  while(this.holePositions.length < 5) {
      this.randomnumber = Math.floor(Math.random() * 24);
      if(this.holePositions.indexOf(this.randomnumber) > -1) continue;
      this.holePositions[this.holePositions.length] = this.randomnumber;
  }
  
  for(i = 0; i < 25; i++) {
    this.gridElement[i].classList.add('ground');
  }

  for(j = 0; j < 5; j++) {
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
  this.timeLeft = 20;
  this.timeElement.innerText = this.timeLeft;

  this.dittoPositions = this.holePositions;

  this.intervalId = setInterval(function() {
    this.timeLeft--;
    this.timeElement.innerText = this.timeLeft;

    if(this.timeLeft === 18) this.createDitto(this.dittoPositions[0]);
    if(this.timeLeft === 15) this.createDitto(this.dittoPositions[1]);
    if(this.timeLeft === 12) this.createDitto(this.dittoPositions[2]);
    if(this.timeLeft === 9) this.createDitto(this.dittoPositions[3]);
    if(this.timeLeft === 6) this.createDitto(this.dittoPositions[4]);
    if(this.timeLeft === 3) this.createDitto(this.dittoPositions[0]);

    if (this.timeLeft === 0) {
      clearInterval(this.intervalId);
      this.finishGame();
    }

  }.bind(this), 1000);
}

Game.prototype.createDitto = function(position) {  
  this.gridElement[position].classList.add('ditto');
}

Game.prototype.checkHit = function(event) {
  this.target = event.target;
  if(this.target.classList.contains('ditto')) { 
    this.target.classList.remove('ditto');
    this.score = this.score + 25;
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
  this.gameScreen.remove();
  this.gameOverCallback();
}
