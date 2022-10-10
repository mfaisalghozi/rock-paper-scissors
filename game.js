const game = {
  yourMove: '',
  enemyMove: '',
  result: '',
  isLoading: false
}

const btns = document.querySelectorAll('.btn-text')
const questionIcon = document.querySelector('.question-icon')
const loadingIcon = document.querySelector('.loading-icon')
const resultMove = document.getElementById('result-move')
const new_img = document.createElement("img")

let timeout
let choosen_btn

function setLoading() {
  game.isLoading = true
  questionIcon.style.display = "none"
  loadingIcon.classList.toggle("show")
}

function stopLoading() {
  game.isLoading = false
  loadingIcon.classList.toggle("show")
}

function chooseMove(gesture) {
  if  (game.isLoading) {
    alert('Game is still loading!')
    return
  }

  if (game.enemyMove !== '') {
    alert('Silahkan restart permainan!')
    return
  }

  if (!game.isLoading) {
    setLoading()
    game.yourMove = gesture
  }
}

function restartGame() {
  game.yourMove = ""
  game.enemyMove = ""
  game.result = ""
  game.isLoading = false

  questionIcon.style.display = "block"
  loadingIcon.classList.remove("show")
  choosen_btn.classList.remove("active")
  new_img.remove()
  clearTimeout(timeout)
}

function generateEnemyMove() {
  const arr = ['gunting', 'kertas', 'batu']
  return arr[Math.floor(Math.random() * 3)]
}

function displayEnemyMove() {
  if (!game.isLoading) return 

  const enemyMoveResult = generateEnemyMove()
  game.enemyMove = enemyMoveResult

  new_img.classList.add("reverse-image")
  if (game.enemyMove == 'batu') {
    new_img.src = "batu.jpg"
  } else if (game.enemyMove == 'kertas') {
    new_img.src = "kertas.jpg"
  } else if (game.enemyMove == 'gunting') {
    new_img.src = "gunting.jpg"
  }

  timeout = setTimeout(() => {
    stopLoading()
    resultMove.appendChild(new_img)
    checkResultGame()
  }, 3000)
}

function assignBtnDiv(target) {
  if (target.classList.contains('hand-gunting')) {
    chooseMove('gunting')
  } else if (target.classList.contains('hand-batu')) {
    chooseMove('batu')
  } else if (target.classList.contains('hand-kertas')) {
    chooseMove('kertas')
  } else {
    restartGame()
  }
}

function assignBtnImg(target) {
  choosen_btn = target
  choosen_btn.classList.add("active")

  if (target.classList.contains('img-gunting')) {
    chooseMove('gunting')
  } else if (target.classList.contains('img-batu')) {
    chooseMove('batu')
  } else if (target.classList.contains('img-kertas')) {
    chooseMove('kertas')
  }
}

function checkResultGame() {
  if (!game.yourMove || !game.enemyMove) return
  const arrHand = ['batu', 'kertas', 'gunting']
  yourMoveIdx = arrHand.findIndex(x => x === game.yourMove)
  enemyMoveIdx = arrHand.findIndex(x => x === game.enemyMove)
  if(yourMoveIdx === enemyMoveIdx) {
    game.result = "seri"
    alert('Permainan ini seri!')
  } else if (yourMoveIdx === 0 && enemyMoveIdx === 2) {
    game.result = "menang"
    alert('Selamat!, Kamu telah memenangkan game ini :)')
  } else if (yourMoveIdx > enemyMoveIdx) {
    if (yourMoveIdx === 2 && enemyMoveIdx === 0) {
      game.result = "kalah"
      alert('Kamu Kalah')
    } else {
      game.result = "menang"
      alert('Selamat!, Kamu telah memenangkan game ini :)')
    }
  } else {
    game.result = "kalah"
    alert('Oh tidak!, kamu kalah :(')
  }
  putHistory(game)
  renderHistory()
}

function renderGame() {
  for (const btn of btns) {
    btn.addEventListener('click', function (event) {
      const target = event.target
      const nodeName = target.nodeName

      if (nodeName == "DIV") {
        assignBtnDiv(target)
      } else if (nodeName == "IMG") {
        assignBtnImg(target)
      } 

      displayEnemyMove()
    })
  }
}

renderGame()