'use strict'

function buildDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}
// Clean commented code
function main() {
  var splashScreen;
  var gameOverScreen;
  //var highscoresScreen;
  var startButton;
  //var highscoresButton;
  var soundGameOver;
  var scoreNoElement;
  var restartButton;
  var gobackButton;
  //var backButton;
  var rank;
  //var scores = [];
  //var scoresObj = {
  //  name: null,
  //  rank: null,
  //  score: null,
  //};
  var gameOverContainer;
  
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <img class="logo" alt="Whack-a-ditto logo">
        <div class="center">
        <img id="game-gif" class="hammer" alt="ditto-gif">
        </div>
        <div id="instructions">
        <p class="text title">Instructions:</p>
        <div class="text-container">
          <li class="text left">Get the max score hitting as many diglett-shaped dittos as possible avoiding hitting any diglett</li>
          <li class="text left">You start with 2 lives. If you hit a diglett by mistake you lose one live</li>
          <li class="text left">Watch out! Dittos and digletts look identical</li>
          <li class="text left">There is only ONE diglett in each level</li>
        </div>
        <img class="game-elements" alt="Game elements">
        </div>
        <div class="center">
          <input class="button start" type="button" value="Start">
          <input class="button" id="instructionsbtn" type="button" value="Show/Hide instructions"> 
        </div>
      </main>
    `)
//<input class="button highscores" type="button" value="Highscores">
    document.body.prepend(splashScreen);

    var instructionsButton  = document.getElementById('instructionsbtn');
    var instructions = document.getElementById('instructions');
    var gif = document.getElementById('game-gif');

    instructionsButton.addEventListener('click', function() {
      instructions.classList.toggle('show');
      gif.classList.toggle('hide');
    });

    startButton = document.querySelector('.start');
    startButton.addEventListener('click', destroySplash);

    //highscoresButton = document.querySelector('.highscores');
    //highscoresButton.addEventListener('click', destroySplash2);
  }

  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    buildGameScreen();
  }

  //function destroySplash2() {
  //  splashScreen.remove();
  //  highscoresButton.removeEventListener('click', destroySplash2);
  //  buildHighscoresScreen();
  //}

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
        <audio id="audio" src="sounds/gameover.mp3"></audio>
        <p class="text">Your final score: <span class="scoreNumber"></span></p>
        <p class="text">RANK: <span class="rank"></span></p>
        <div class="game-over-container">
        </div>
        <div class="center">
          <input class="button restart" type="button" value="Play again">
          <input class="button go-main" type="button" value="Go to main page"> 
        </div>
      </main>  
    `);

    //<div class="center">
    //  <label for="name" class="text">Name initials (3 characters):</label>
    //  <input class="input" type="text" id="name" name="name" required minlength="3" maxlength="3" size="3">
    //</div>

    document.body.prepend(gameOverScreen);

    soundGameOver = document.getElementById("audio");
    soundGameOver.play();
    
    scoreNoElement = document.querySelector('.scoreNumber');
    scoreNoElement.innerText = score;
    //scoresObj.score = score;

    gameOverContainer = document.querySelector('.game-over-container');
    rank = document.querySelector('.rank');

    if(score < 7000) {
      rank.innerText = 'MAGIKARP';
      //scoresObj.rank = 'MAGIKARP';
      gameOverContainer.classList.add('magikarp');
    } else if(score < 9000) {
      rank.innerText = 'PSYDUCK';
      //scoresObj.rank = 'PSYDUCK';
      gameOverContainer.classList.add('psyduck');
    } else if(score < 11000) {
      rank.innerText = 'KADABRA';
      //scoresObj.rank = 'KADABRA';
      gameOverContainer.classList.add('kadabra');
    } else if(score < 13000) {
      rank.innerText = 'GENGAR';
      //scoresObj.rank = 'GENGAR';
      gameOverContainer.classList.add('gengar');
    } else if(score < 15000) {
      rank.innerText = 'MEWTWO';
      //scoresObj.rank = 'MEWTWO';
      gameOverContainer.classList.add('mewtwo');
    } else {
      rank.innerText = 'MEW';
      //scoresObj.rank = 'MEW';
      gameOverContainer.classList.add('mew');
    }

    //scoresObj.name = document.querySelector('.input').value;
    //scores.push(scoresObj);
    //localStorage.setItem('score', JSON.stringify(scores[scores.length -1]));

    restartButton = document.querySelector('.restart');
    restartButton.addEventListener('click', destroyGameOverScreen);

    gobackButton = document.querySelector('.go-main');
    gobackButton.addEventListener('click', destroyGameOverScreen2);
  }


  //function buildHighscoresScreen() {

  //  highscoresScreen = buildDOM(`
  //  <main>
  //    <img class="logo" alt="Whack-a-ditto logo">
  //    <p class="text title">Highscores:</p>
  //    <ol class="highscores-container">
  //      <li class="text left"></li>
  //      <li class="text left"></li>
  //      <li class="text left"></li>
  //      <li class="text left"></li>
  //      <li class="text left"></li>
  //      <li class="text left"></li>
  //      <li class="text left"></li>
  //      <li class="text left"></li>
  //      <li class="text left"></li>
  //      <li class="text left"></li>
  //    </ol>
  //    <div class="center">
  //      <input class="button back" type="button" value="Back">
  //    </div>
  //  </main>
  //`)

  //  document.body.prepend(highscoresScreen);

  //  scoresParsed = JSON.parse(localStorage.getItem('scores'));
  
  //  backButton = document.querySelector('.back');
  //  backButton.addEventListener('click', destroyHighscoresScreen);
  //}

  //function destroyHighscoresScreen() {
  //  highscoresScreen.remove();
  //  backButton.removeEventListener('click', destroyHighscoresScreen);
  //  buildSplash();
  //}

  function destroyGameOverScreen() {
    gameOverScreen.remove();
    restartButton.removeEventListener('click', destroyGameOverScreen)
    buildGameScreen();
  }

  function destroyGameOverScreen2() {
    gameOverScreen.remove();
    restartButton.removeEventListener('click', destroyGameOverScreen2)
    buildSplash();
  }

  buildSplash();
}

window.addEventListener('load', main);