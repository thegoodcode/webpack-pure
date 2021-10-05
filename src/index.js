const app = document.getElementById('root')
const heading = document.createElement('h1')
class Home {
	constructor(name) {
		this.name = name
	}
}
const home = new Home('OT')
heading.textContent = home.name
app.appendChild(heading)
