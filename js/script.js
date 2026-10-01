const PAGE_BODY = document.querySelector('body')
const GO_TOP = document.querySelector('#Go_Top')
const MAGIC = document.querySelector('#Magic')

function makeTags(item) {
	const para = document.createElement('p')

	item.map(item => {
		const tag = document.createElement('code')
		tag.textContent = item
		para.append(tag, ` `)
	})

	return para
}

function makeCards(item) {
	const article = document.createElement('article')
	const header = document.createElement('header')
	const div = document.createElement('div')
	const description = document.createElement('p')
	const livePreview = document.createElement('a')
	const footer = document.createElement('footer')
	const button = document.createElement('a')
	const descriptors = makeTags(item.topics)

	header.textContent = item.name
	description.textContent = item.description
	livePreview.textContent = 'Live Preview'
	button.textContent = 'View on Github'

	livePreview.setAttribute('href', item.homepage)
	button.setAttribute('href', item.html_url)
	button.setAttribute('role', 'button')

	footer.append(button)
	div.append(description, descriptors, livePreview)
	article.append(header, div, footer)
	document.querySelector('#ProjectList').append(article)
}

async function mainProjects() {
	const projects = [`ridoo`, `ricss`, `ricast`]

	projects.map(async project => {
		const data = await fetch(
			`https://api.github.com/repos/israjatiangar/${project}`
		).then(response => response.json())

		makeCards(data)
	})
}

function changeColor() {
	const color = Number(PAGE_BODY.getAttribute('data-ri-hue')) ?? 244
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

GO_TOP.addEventListener('click', () => {
	window.scroll(0, 0)
})
MAGIC.addEventListener('click', () => changeColor())
MAGIC.addEventListener('click', () => checkCount())

changeColor()
// mainProjects()

let count = 0

function checkCount() {
	count++
	if (count <= 10) return
	else if (count <= 15) {
		moveButton()
		return
	} else {
		stopButton()
		count = 0
	}
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
