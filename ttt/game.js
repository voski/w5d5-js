var Board = require('./board.js');

function Game(reader) {
  this.board = new Board();
  this.reader = reader;
  this.currentPlayer = 'no one';
}

Game.prototype.switchPlayer = function() {
  if(this.currentPlayer === 'x') {
    this.currentPlayer = 'o';
  } else {
    this.currentPlayer = 'x';
  }
};

Game.prototype.run = function(completionCallback) {
  var game = this;
  this.switchPlayer();
  this.promptMove(function(pos) {
    if (!game.board.placeMark(pos, game.currentPlayer)) {
      console.log('Invalid move yo');
    }
    if (!game.board.won()) {
      game.run(completionCallback);
    } else {
      console.log('Game over!!! The winner is ' + game.board.winner);
      completionCallback();
    }
  });
};

Game.prototype.promptMove = function(callback) {
  this.board.print();
  this.reader.question('Current player is ' + this.currentPlayer +
                       '. Where do you want to place? (x,y format) ',
                       function(input) {
                        var pos = input.split(',');
                        pos[0] = parseInt(pos[0]);
                        pos[1] = parseInt(pos[1]);
                        callback(pos);
                        });
};

module.exports = Game;
