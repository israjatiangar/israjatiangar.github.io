const pageBody = document.querySelector('body')

function changeColor() {
	const color = Number(pageBody.getAttribute('data-ri-hue')) ?? 244
	let newColor = color
	while (Math.abs(newColor - color) <= 45) {
		newColor = Math.round(Math.random() * 360)
	}
	pageBody.setAttribute('data-ri-hue', newColor)
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

function makeTags(item) {
	const para = document.createElement('p')
	item.map(item => {
		const tag = document.createElement('code')
		tag.textContent = item
		para.append(tag, ` `)
	})
	return para
}

pageBody.querySelector('#GoTop').addEventListener('click', () => {
	window.scroll(0, 0)
})
document.querySelector('#Magic').addEventListener('click', () => changeColor())

changeColor()
mainProjects()
