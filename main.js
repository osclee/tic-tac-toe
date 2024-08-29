import './style.css'
import Game from './Game.js'

let difficulty = 0
let game

document.querySelector("#easy").addEventListener('click', () => {
  document.getElementById('menu').hidden = true
  document.getElementById('resetgame').hidden = false
  difficulty = 0
  game = new Game(document, difficulty)

})

document.querySelector("#hard").addEventListener('click', () => {
  document.getElementById('menu').hidden = true
  document.getElementById('resetgame').hidden = false
  difficulty = 1
  game = new Game(document, difficulty)
})


document.querySelector("#reset").addEventListener('click', () => {
  document.getElementById('menu').hidden = false
  document.getElementById('resetgame').hidden = true
  game.clearGame()
  game.gameOver = true
})