const WINNING = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const tiles = document.querySelectorAll("div .tile")
const board = document.getElementsByClassName("board")[0]
let win = "draw"
let counter = 0
let currentClass = null

start()

document.addEventListener('dblclick', () => { 
    if(board.classList.contains("game-over")) {
        board.classList.remove("game-over")
        board.classList.remove(win)
        win = "draw"
        counter = 0
        start()
    }
})

function start() {
    tiles.forEach( tile => {
        tile.classList.remove("fill-o")
        tile.classList.remove("fill-x")
        tile.style.background = "#fff"
        tile.removeEventListener('click', handle)
        tile.addEventListener('click', handle, { once: true })
    })
}

function handle(e) {
    const tile = e.target
    if (!board.classList.contains("game-over")) {
        currentClass = counter % 2 === 0 ? "fill-x" : "fill-o"
        tile.classList.add(currentClass)
        counter ++
    }
    if (checkWin(currentClass) || isDraw()) {
        board.classList.add("game-over")
        if (checkWin(currentClass)) {
            win = currentClass === "fill-x" ? "win-x" : "win-o"
            winningHouses.forEach(house => {
                tiles[house].style.background = "#fcd9d9"
            })
        }
        board.classList.add(win)
    }
}

let winningHouses
function checkWin(currentClass) {
    return WINNING.some(subArr => {
        if (subArr.every(index => tiles[index].classList.contains(currentClass))) {
            winningHouses = subArr
            return true
        }
    })
}

function isDraw() {
    let counter = 0
    tiles.forEach(tile => {
        if (tile.classList.contains("fill-x") || tile.classList.contains("fill-o")) {
            counter ++
        }
    })
    return counter <= 8 ? false : true
}