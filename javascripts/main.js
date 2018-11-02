'use strict'

function buildDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var splashScreen;
  var gameScreen;
  var gameOverScreen;

  var logoElement;
  var ulElement;
  var liElement;
  var divElement;
  var startButton;

  var pElement;
  var div2Element;
  var restartButton;

  var livesElement;
  
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
      <img class="logo" alt="Whack-a-ditto logo">
        <ul>Instructions:</ul>
        <li>Hit all the Dittos that are impersonating our beloved Diglett</li>
        <li>If you hit a Diglett by mistake, you lose one live!</li>
        <div class="center">
          <input class="button" type="button" value="Start">
        </div>
      </main>
    `)

    document.body.prepend(splashScreen);

    ulElement = document.querySelector('ul');
    ulElement.classList.add('text');

    liElement = document.querySelectorAll('li');
    liElement[0].classList.add('text');
    liElement[1].classList.add('text');

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

    game.setGameOverCallback(destroyGameScreen);

  }

  function updateLives(lives) {
    livesElement.innerText = lives;
  }

  function destroyGameScreen() {
    buildGameOverScreen();
  }

  function buildGameOverScreen() {
    gameOverScreen = buildDOM(`
      <main>
        <img class="logo" alt="Game Over logo">
        <p class="text">Your final score: </p><span class="score"></span>
        <div class="center">
          <input class="button" type="button" value="Start">
        </div>
      </main>  
    `);

    document.body.prepend(gameOverScreen);

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