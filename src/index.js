import meme from './images/programming-meme.jpg'
import svg from './images/black-swan.svg'
import './styles/main.scss'
import { initServiceWorker } from './utils/initSW'

initServiceWorker()

const imgContainer = document.getElementById('container')
const img = document.createElement('img')
img.src = meme
const svgImg = document.createElement('img')
svgImg.src = svg
imgContainer.append(img)
imgContainer.append(svgImg)
