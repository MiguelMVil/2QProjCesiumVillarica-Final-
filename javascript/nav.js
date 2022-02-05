const navbar = document.querySelector(".navbar")
const button = document.querySelector(".nav-btn-icon")

function openNav() {
	if (navbar.className === "navbar") {
		navbar.className += " responsive"
		button.innerText = "close"
	} else {
		navbar.className = "navbar"
		button.innerText = "menu"
	}
}
