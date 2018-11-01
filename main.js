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

  var startButton;
  var restartButton;

  var livesElement;
  
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <h1>Whack-a-dittos</h1>
        <ul>Instructions:</ul>
        <li>Hit all the Dittos that are impersonating our beloved Diglett</li>
        <li>If you hit a Diglett by mistake, you lose one live!</li>
        <button>Start</button>
      </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('button');

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
        <h1>Game Over</h1>
        <p>Your final score: </p><span class="score"></span>
        <button>Restart</button>
      </main>  
    `);

    document.body.prepend(gameOverScreen);

    restartButton = document.querySelector('button');

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