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
  this.livesNoElement.innerText = this.lives;

  this.scoreNoElement = this.gameScreen.querySelector('.scoreNumber');
  this.scoreNoElement.innerText = this.score;

  this.gridElement = this.gameScreen.querySelectorAll('.grid-image');

  this.holePositions = [];
  debugger;
  while(this.holePositions.length < 5) {
      this.randomnumber = Math.floor(Math.random() * 24);
      if(this.holePositions.indexOf(this.randomnumber) > -1) continue;
      this.holePositions[this.holePositions.length] = this.randomnumber;
  }
  
  for(i = 0; i < 25; i++) {
    this.gridElement[i].classList.add('ground');
  }

  for(j = 0; j < 5; j++) {
    debugger;
    this.gridElement[this.holePositions[j]].classList.add('hole');
  }

  this.levelNoElement = this.gameScreen.querySelector('.levelNumber');
  this.levelNoElement.innerText = this.level;

  this.startTimer();

}

Game.prototype.startTimer = function() {
  this.timeLeft = 30;
  this.timeElement.innerText = this.timeLeft;

  this.intervalId = setInterval(function() {
    this.timeLeft--;
    this.timeElement.innerText = this.timeLeft;

    if (this.timeLeft === 0) {
      clearInterval(this.intervalId);
      this.finishGame();
    }

  }.bind(this), 1000)
}

Game.prototype.nextCard = function() {
  this.step++;

  if (this.step === this.cards.length) {
    this.finishGame();
  }
  
  this.leftNumberElement.innerText = this.cards[this.step];
  this.startTimer();
}

Game.prototype.checkAnswer = function() {

}

Game.prototype.setGameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}

Game.prototype.finishGame = function() {
  this.gameScreen.remove();
  this.gameOverCallback();
}
