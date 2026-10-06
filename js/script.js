// #region Variables and Classes
const PAGE_BODY = document.querySelector('body')
const GO_TOP = document.querySelector('#Go_Top')
const MAGIC = document.querySelector('#Magic')
let count = 0

class card {
	article = document.createElement('article')
	header = document.createElement('header')
	body = document.createElement('div')
	description = document.createElement('p')
	livePreview = document.createElement('a')
	footer = document.createElement('footer')
	button = document.createElement('a')
	descriptors = null

	makeTags = item => {
		const container = document.createElement('p')

		item.map(item => {
			const tag = document.createElement('code')
			tag.textContent = item
			container.append(tag, ` `)
		})

		return container
	}

	assemble = () => {
		this.footer.append(this.button)
		this.body.append(this.description, this.descriptors, this.livePreview)
		this.article.append(this.header, this.body, this.footer)
		document.querySelector('#ProjectList').append(this.article)
	}
}
//@ts-ignore
const israjatiangar = () => true
// #endregion

// #region Functions
function makeCards(item) {
	const newCard = new card()
	newCard.header.textContent = item.name
	newCard.description.textContent = item.description
	newCard.livePreview.textContent = 'Live Preview'
	newCard.button.textContent = 'View on Github'
	newCard.descriptors = newCard.makeTags(item.topics)

	newCard.livePreview.setAttribute('href', item.homepage)
	newCard.button.setAttribute('href', item.html_url)
	newCard.button.setAttribute('role', 'button')

	newCard.assemble()
}

async function mainProjects() {
	const projects = [`ridoo`, `ricss`, `ricast`]

	const projectsList = await fetch(
		`https://api.github.com/users/israjatiangar/repos`
	).then(r => r.json())
	projectsList
		.filter(repo => projects.includes(repo.name))
		.forEach(repo => makeCards(repo))
}

function moveButton() {
	let x = 10 + Math.round(Math.random() * 80)
	let y = 10 + Math.round(Math.random() * 80)
	MAGIC.style.zIndex = '1'
	MAGIC.style.position = 'absolute'
	MAGIC.style.top = `${x}%`
	MAGIC.style.left = `${y}%`
}
function stopButton() {
	MAGIC.style.position = 'static'
	MAGIC.style.top = `0`
	MAGIC.style.left = `0`
}
function checkCount() {
	count++
	if (count < 10) return
	else if (count < 15) {
		moveButton()
		return
	} else {
		stopButton()
		count = 0
	}
}

function changeColor() {
	const color = Number(PAGE_BODY.getAttribute('data-ri-hue')) || 244
	let newColor = color

	while (Math.abs(newColor - color) <= 45) {
		newColor = Math.round(Math.random() * 360)
	}

	PAGE_BODY.setAttribute('data-ri-hue', newColor)

	const ricolor = getComputedStyle(document.documentElement)
		.getPropertyValue('--ri-background')
		.trim()
	document
		.querySelector('meta[name="theme-color"]')
		.setAttribute('content', ricolor)
}
// #endregion

// #region IIFE Initialisation
;(() => {
	GO_TOP.addEventListener('click', () => {
		window.scroll(0, 0)
	})

	MAGIC.addEventListener('click', () => {
		changeColor()
		checkCount()
	})

	changeColor()
	mainProjects()
})()
// #endregion
