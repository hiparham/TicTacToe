const gamePlay = () => {
  let board = Array(9).fill(null)
  let currentPlayer = "O"
  let winner = ""
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ]
  //
  const resetGame = () => {
    board = Array(9).fill(null)
    currentPlayer = "O"
    winner = ""
  }
  //
  const getBoard = () => {
    return board
  }
  //
  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    return currentPlayer
  }
  //
  const markSpot = (x, y) => {
    getBoard()[x] = y
  }
  //
  const checkWinner = () => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i]
      if (board[a] && board[a] === board[c] && board[a] === board[b]) {
        winner = board[b]
        return winner
      } else if (board.every((x) => x) && !winner) {
        winner = "tie"
        return winner
      }
    }
  }
  //
  return {
    markSpot,
    switchPlayer,
    checkWinner,
    resetGame,
  }
}
//
const displayGame = (() => {
  const { markSpot, switchPlayer, checkWinner, resetGame } = gamePlay()
  let w = ""
  const submitPlayers = document.querySelector(".sub_pl")
  const mainSquare = document.querySelector("main")
  const warnText = document.querySelector(".warn")
  const resetBtn = document.querySelector(".reset")
  const winText = document.querySelector(".win")
  const pl_1_txt = document.querySelector(".pl_1_txt")
  const pl_2_txt = document.querySelector(".pl_2_txt")
  const gameStart = () => {
    const form = document.querySelector(".playa")
    const inp_1 = document.querySelector(".input-1")
    const inp_2 = document.querySelector(".input-2")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      if (inp_1.value.length > 3 && inp_2.value.length > 3) {
        pl_1_txt.textContent = inp_1.value + " | " + "X"
        pl_2_txt.textContent = inp_2.value + " | " + "O"
        inp_1.value = ""
        inp_2.value = ""
        submitPlayers.classList.add("hidden")
        warnText.textContent = ""
      } else {
        warnText.textContent =
          "both names must exist & must be 3+ characters long."
      }
    })
  }
  //
  gameStart()
  //
  function fireDisplay() {
    w = ""
    submitPlayers.classList.remove("hidden")
    winText.textContent = ""
    mainSquare
      .querySelectorAll(".aspect-square")
      .forEach((x) => (x.innerHTML = ""))
    resetGame()
    resetBtn.classList.add("hidden")
  }
  //
  mainSquare.addEventListener("click", (e) => {
    const id = e.target.dataset.id
    if (!w && id && !e.target.innerHTML) {
      const player = switchPlayer()
      const p_1 = pl_1_txt.textContent.split(" ")[0]
      const p_2 = pl_2_txt.textContent.split(" ")[0]
      e.target.innerHTML = `<p>${player}</p>`
      markSpot(+id, player)
      w = checkWinner()
      w ? resetBtn.classList.remove("hidden") : ""
      w ? (pl_1_txt.textContent = "") : ""
      w ? (pl_2_txt.textContent = "") : ""
      winText.textContent =
        w && w !== "tie"
          ? `Winner is ${w === "X" ? p_1 : p_2}`
          : w
          ? `It's a fucking tie`
          : ""
    }
  })
  //
  resetBtn.addEventListener("click", () => {
    resetGame()
    fireDisplay()
  })
  //
  fireDisplay()
})()
