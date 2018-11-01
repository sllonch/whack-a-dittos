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
      <img class="gameLogo" src="images/logo.png" alt="Whack-a-ditto logo">
      <header>
        <p class="countdown">Countdown: <span class="time"></span></p>
        <p class="lives">Lives: <span class="livesNumber"></span></p>
        <p class="score">Score: <span class="scoreNumber"></span></p>
      </header>
      <section class="grid">
      </section>
      <footer>
        <p class="level"> Level <span class="levelNumber"></span></p>
      </footer>
    </main>
  `);

  document.body.prepend(this.gameScreen);

  this.logoElement = this.gameScreen.querySelector('.gameLogo');
  this.logoElement.classList.add('logo');

  this.countdownElement = this.gameScreen.querySelector('.countdown');
  this.countdownElement.classList.add('text');

  this.timeElement = this.gameScreen.querySelector('.time');
  this.timeElement.classList.add('text');
  this.timeElement.innerText = 0;

  this.livesElement = this.gameScreen.querySelector('.lives');
  this.livesElement.classList.add('text');

  this.livesNoElement = this.gameScreen.querySelector('.livesNumber');
  this.livesNoElement.innerText = this.lives;

  this.scoreElement = this.gameScreen.querySelector('.score');
  this.scoreElement.classList.add('text');

  this.scoreNoElement = this.gameScreen.querySelector('.scoreNumber');
  this.scoreNoElement.innerText = this.score;

  this.gridElement = this.gameScreen.querySelector('.grid');
  this.gridElement = this.grid;

  this.levelElement = this.gameScreen.querySelector('.level');
  this.levelElement.classList.add('text');

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
