'use strict'

function buildDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {
  var splashScreen;
  var gameOverScreen;
  var startButton;
  var scoreNoElement;
  var restartButton;
  
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <img class="logo" alt="Whack-a-ditto logo">
        <p class="text title">Instructions:</p>
        <div class="text-container">
          <li class="text left">Get the max score hitting as many diglett-shaped dittos as possible avoiding hitting any diglett</li>
          <li class="text left">You start with 2 lives. If you hit a diglett by mistake you lose one live</li>
          <li class="text left">Watch out! Dittos and digletts look identical</li>
          <li class="text left">There is only ONE diglett in each level</li>
        </div>
        <p class="text title">Game elements:</p>
        <img class="game-elements" alt="Game elements">
        <div class="center">
          <input class="button" type="button" value="Start">
        </div>
      </main>
    `)

    document.body.prepend(splashScreen);
    startButton = document.querySelector('input');
    startButton.addEventListener('click', destroySplash);
  }

  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    buildGameScreen();
  }

  function buildGameScreen() {
    var game = new Game();

    game.start();
    game.setGameOverCallback(function () {
      destroyGameScreen(game.score);
    });

  }

  function destroyGameScreen(score) {
    buildGameOverScreen(score);
  }

  function buildGameOverScreen(score) {

    gameOverScreen = buildDOM(`
      <main>
        <img class="game-over-logo" alt="Game Over logo">
        <p class="score text">Your final score: <span class="scoreNumber"></span></p>
        <div class="center">
          <input class="button" type="button" value="Start again">
        </div>
      </main>  
    `);

    document.body.prepend(gameOverScreen);
    
    scoreNoElement = document.querySelector('.scoreNumber');
    scoreNoElement.innerText = score;

    restartButton = document.querySelector('input');
    restartButton.addEventListener('click', destroyGameOverScreen)
  }

  function destroyGameOverScreen() {
    gameOverScreen.remove();
    restartButton.removeEventListener('click', destroyGameOverScreen)
    buildGameScreen();
  }
  buildSplash();
}

window.addEventListener('load', main);