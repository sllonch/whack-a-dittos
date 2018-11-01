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
      <h1>Whack-a-dittos</h1>
      <header>
        <p>Countdown: <span class="time"></span></p>
        <p>Lives: <span class="lives"></span></p>
        <p>Score: <span class="score"></span></p>
      </header>
      <section class="grid">
      </section>
      <footer>
        <p> Level <span class="level"></span></p>
      </footer>
    </main>
  `);

  document.body.prepend(this.gameScreen);

  this.timeElement = this.gameScreen.querySelector('.time');
  this.timeElement.innerText = 0;

  this.livesElement = this.gameScreen.querySelector('.lives');
  this.livesElement.innerText = this.lives;

  this.scoreElement = this.gameScreen.querySelector('.score');
  this.scoreElement.innerText = this.score;

  this.gridElement = this.gameScreen.querySelector('.grid');
  this.gridElement = this.grid;

  this.levelElement = this.gameScreen.querySelector('.level');
  this.levelElement.innerText = this.level;

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
