import meme from './images/programming-meme.jpg'

const imgContainer = document.getElementById('container')
const img = document.createElement('img')
img.src = meme
imgContainer.append(img)
