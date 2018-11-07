# Whack-a-dittos

## Description
Whack-a-diglett is a simple click game where you have to smash the Dittos that are trying to impersonate Diglett. Every smashed Ditto adds points into your scoreboard… but careful: if you are wrong and you smash our lovely Diglett by mistake, you die.


## MVP (DOM)
*DOM*
The MVP version will be the first level of the game: with only 5 holes, a scoreboard and a countdown timer.


## Backlog
- Add up to 5 levels (level is up automatically after the countdown reaches 0)
- Add sprites effects
- Add different game over text depending on the score


## Data structure
### game.js
```javascript
Game() {
  this.timeLeft
  this.lives
  this.score 
  this.numberHoles
  this.level
}

Game.prototype.start = function () {
  this.gameScreen = buildDOM
  this.timeElement
  this.livesNoElement
  this.scoreNoElement
  this.gridElement
  this.holePositions
  this.diglettPosition
  this.diglett
  this.timePositions

  document.body.prepend(this.gameScreen)

  this.startTimer()
}

Game.prototype.startTimer = function() {

  this.timeLeft = 25;
  this.timeElement.innerText = this.timeLeft;

  this.intervalId = setInterval(function() { 
  
  },1000);
}

Game.prototype.levelUp = function() {
}

Game.prototype.createPokemon = function() {
}

Game.prototype.checkHit = function() {
}

Game.prototype.setGameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}

Game.prototype.finishGame = function() {
  this.gameScreen.remove();
  this.gameOverCallback();
}

```

## States y States Transitions
Definition of the different states and their transition (transition functions)
```javascript
- splashScreen()
  - buildSplash()
  - addEventListener(startGame)
  
  
- startGame()
  - destroySplashScreen()
  - destroyGameOverScreen()
  - create new Game()
  - game.start()
  - game.setGameOverCallback(function () {
      destroyGameScreen(game.score);
    });
  
  
- gameOver()
  - destroyGameScree()
  - buildGameOverScreen()
```



## Task
- create files javascript
- Main - buildDom
- Main - main
- Main - buildSplash
- Main - addEventListener startButton
- Main - destroySplash
- Main - buildGameScreen
- Game - start (buildDom)
- Game - startTimer
- Main - destroyGameScreen
- Main - build GameOverScreen
- Main - addEventListener restartButton
- Game - GridElements and digletts/dittos in random positions 
- Game - createPokemon
- Game - checkHit
- Game - gameOver

*Backlog*
- Game - add levelUp function
- Game - add differents GameOverScreen
- Game - add sprites



## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/sllonch/whack-a-dittos)
[Link Deploy](https://sllonch.github.io/whack-a-dittos/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
=======