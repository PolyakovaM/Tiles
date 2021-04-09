const colors = [
  'green',
  'pink',
  'orange',
  'yellow',
  'purple',
  'red',
  'blue',
  'black',
  'brown',
  'aqua'
]

const button = document.querySelector('button')
const tiles = document.querySelectorAll('.tile_elem')
const clickLimit = tiles.length / colors.length
let colorCopies = [...colors]
let selectedColors = []
let repeatingTiles = []
let activeColors = []

function setColors() {
  tiles.forEach((tile) => {
    const randomColor = colorCopies[Math.floor(Math.random() * colorCopies.length)]
    tile.dataset.mainColor = randomColor 
    selectedColors.push(randomColor)
    const reduceArray = (selectedColors.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {}))
    checkColors(reduceArray)
  })
}

setColors()

function checkColors(reduceArray) {
  colorCopies.forEach((elem, index) => {
    for (let key in reduceArray) {
      if (key === elem && reduceArray[key] === clickLimit) {
        colorCopies.splice(index, 1)
      } 
    }
  })
}

function activeTiles() {
  tiles.forEach(tile => {
    tile.onclick = function() {
      if (activeColors.length === 2 
        || activeColors.includes(this) 
        || repeatingTiles.includes(this)
      ) return
      this.style.backgroundColor = this.dataset.mainColor
      activeColors.push(this)
      checkingPairOfTiles(this)
    }
  })
}
activeTiles()

function checkingPairOfTiles(tile) {
  if (activeColors.length === 2 && (
      activeColors[0].style.backgroundColor === tile.dataset.mainColor
  )) {
      repeatingTiles.push(...activeColors)
      activeColors = []
      buttonActive()
      return
  } else if (activeColors.length === 2 && (
      activeColors[0].style.backgroundColor !== tile.dataset.mainColor
    ))  {
    setTimeout(() => {
      activeColors.forEach(elem => elem.style.backgroundColor = 'grey')
      activeColors = []
      return
    }, 1000)
  }
}

function buttonActive() {
  if (repeatingTiles.length === tiles.length) button.style.display = 'flex'
  button.onclick = () => {
    tiles.forEach(tile => tile.style.backgroundColor = 'grey')
    colorCopies = [...colors]
    selectedColors = []
    repeatingTiles = []
    setColors()
    activeTiles()
    button.style.display = 'none'
  }
}
