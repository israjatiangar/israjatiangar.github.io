//@ts-check
// #region Variables and Classes
/** @typedef Repo
 * @property {String} name
 * @property {String} description
 * @property {Array<String>} topics
 * @property {String} homepage
 * @property {String} html_url
 */
/** @typedef localData
 * @property {number} expiry
 * @property {Array<Repo>} projectsList
 */
const PAGE_BODY =
	/** @type {HTMLBodyElement} */
	(document.querySelector('body'))
const GO_TOP =
	/** @type {HTMLButtonElement} */
	(document.querySelector('#Go_Top'))
const MAGIC =
	/** @type {HTMLButtonElement} */
	(document.querySelector('#Magic'))

const PROJECT_LIST = [`nullcents`, `ricast`, `ricss`, `ridoo`, `svearch`]

let count = 0

class card {
	article = document.createElement('article')
	header = document.createElement('header')
	body = document.createElement('div')
	description = document.createElement('p')
	footer = document.createElement('footer')
	livePreview = document.createElement('a')
	button = document.createElement('a')
	/**@type {HTMLParagraphElement} */
	descriptors = document.createElement('p')

	/** @param {Array<String>} item
	 * @returns {HTMLParagraphElement}
	 */
	makeTags = item => {
		const container = document.createElement('p')

		item.map(item => {
			const tag = document.createElement('code')
			tag.classList.add('my-chips')
			tag.textContent = item
			container.append(tag, ` `)
		})

		return container
	}
	assemble = () => {
		this.button.classList.add('my-button', 'ri-button-secondary')
		this.livePreview.classList.add('my-button')
		this.footer.append(this.livePreview, this.button)
		this.body.append(this.description, this.descriptors)
		this.article.append(this.header, this.body, this.footer)
		this.article.classList.add('my-card')
		document.querySelector('#ProjectList')?.append(this.article)
	}
}
//@ts-ignore
const israjatiangar = () => true
// #endregion

// #region Functions
/** @param {Repo} item */
function makeCards(item) {
	const newCard = new card()
	newCard.header.textContent = item.name
	newCard.description.textContent = item.description
	newCard.livePreview.textContent = 'Live Preview'
	newCard.button.textContent = 'View on Github'
	newCard.descriptors = newCard.makeTags(item.topics)

	newCard.livePreview.setAttribute('href', item.homepage)
	newCard.livePreview.setAttribute('role', 'button')
	newCard.button.setAttribute('href', item.html_url)
	newCard.button.setAttribute('role', 'button')

	newCard.assemble()
}

async function mainProjects() {
	const DAYS_IN_MS = 86400000
	/** @type {Array<Repo>} */
	let projectsList = []
	/** @type {localData} */
	let localData = {
		expiry: 0,
		projectsList: [],
	}
	try {
		localData = await JSON.parse(String(localStorage.getItem('localData')))
	} catch (error) {
		console.error(error)
	} finally {
		if (
			!localData ||
			localData.projectsList.length <= 0 ||
			Date.now() >= localData.expiry
		) {
			projectsList = await fetch(
				`https://api.github.com/users/israjatiangar/repos`
			).then(response => response.json())
			const expiry = Date.now() + 10 * DAYS_IN_MS
			localStorage.setItem(
				'localData',
				JSON.stringify({ expiry: expiry, projectsList: projectsList })
			)
		} else {
			projectsList = localData.projectsList
		}
		if (projectsList.length > 0) {
			projectsList
				.filter(repo => PROJECT_LIST.includes(repo.name))
				.forEach(repo => makeCards(repo))
		}
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
	MAGIC.style.top = `0`
	MAGIC.style.left = `0`
	MAGIC.style.position = 'static'
	MAGIC.style.zIndex = '0'
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
	/** @type{Number} */
	const color = Number(PAGE_BODY.getAttribute('data-ri-hue')) || 244
	let newColor = color

	while (Math.abs(newColor - color) <= 45) {
		newColor = Math.round(Math.random() * 360)
	}

	PAGE_BODY.setAttribute('data-ri-hue', String(newColor))

	const ricolor = getComputedStyle(document.documentElement)
		.getPropertyValue('--ri-background')
		.trim()
	document
		.querySelector('meta[name="theme-color"]')
		?.setAttribute('content', ricolor)
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
