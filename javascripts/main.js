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
        <img src="images/logo.png" alt="Whack-a-ditto logo">
        <ul>Instructions:</ul>
        <li>Hit all the Dittos that are impersonating our beloved Diglett</li>
        <li>If you hit a Diglett by mistake, you lose one live!</li>
        <div>
          <input class="button type="button" value="Start">
        </div>
      </main>
    `)

    document.body.prepend(splashScreen);

    logoElement = document.querySelector('img');
    logoElement.classList.add('logo');

    ulElement = document.querySelector('ul');
    ulElement.classList.add('text');

    liElement = document.querySelectorAll('li');
    liElement[0].classList.add('text');
    liElement[1].classList.add('text');

    divElement = document.querySelector('div');
    divElement.classList.add('center');

    startButton = document.querySelector('input');
    startButton.classList.add('button');

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
        <img src="images/gameOver.png" alt="Whack-a-ditto logo">
        <p>Your final score: </p><span class="score"></span>
        <div>
          <input class="button type="button" value="Start">
        </div>
      </main>  
    `);

    document.body.prepend(gameOverScreen);

    logoElement = document.querySelector('img');
    logoElement.classList.add('logo');

    pElement = document.querySelector('p');
    pElement.classList.add('text');

    div2Element = document.querySelector('div');
    div2Element.classList.add('center');

    restartButton = document.querySelector('input');
    restartButton.classList.add('button');

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