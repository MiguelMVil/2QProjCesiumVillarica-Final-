const startBtn = document.getElementById("start-btn")
const nextBtn = document.getElementById("next-btn")
const endBtn = document.getElementById("end-btn")
const scoreCount = document.getElementById("score")
const checker = document.getElementById("checker")
const startText = document.getElementById("start-text")
const quizContainer = document.getElementById("quiz-container")
const itemContainer = document.getElementById("item-container")
const questionElement = document.getElementById("question")
const ansBtns = document.getElementById("ans-btns")
const endText = document.getElementById("end-text")
const endScore = document.getElementById("final-score")

let shuffledQs, currentQIndex, score

startBtn.addEventListener("click", () => {
	startBtn.classList.add("hide")
	itemContainer.classList.remove("hide")
	startText.classList.add("hide")

	shuffledQs = questions.sort(() => Math.random() - 0.5)
	currentQIndex = 0
	score = 0

	nextQ()
})

nextBtn.addEventListener("click", () => {
	currentQIndex++
	nextQ()
})

endBtn.addEventListener("click", () => {
	endBtn.classList.add("hide")
	itemContainer.classList.add("hide")
	endText.classList.remove("hide")

	var correctCount = score
	var quesCount = shuffledQs.length

	endScore.innerHTML = `${correctCount} / ${quesCount}`

	clearStatusClass(quizContainer)
})

function nextQ() {
	resetState()
	showQuestion(shuffledQs[currentQIndex])
}

function showQuestion(question) {
	questionElement.innerText = question.question
	checker.innerText = "Checking..."
	question.answers.forEach((answer) => {
		const button = document.createElement("button")
		button.innerText = answer.text
		button.classList.add("btn")

		if (answer.correct) {
			button.dataset.correct = answer.correct
		}

		button.addEventListener("click", selectAns)
		ansBtns.appendChild(button)
	})
}

function resetState() {
	clearStatusClass(quizContainer)
	nextBtn.classList.add("hide")
	while (ansBtns.firstChild) {
		ansBtns.removeChild(ansBtns.firstChild)
	}
}

function selectAns(e) {
	const selectedBtn = e.target
	const correct = selectedBtn.dataset.correct
	setStatusClass(quizContainer, correct)
	Array.from(ansBtns.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct)
		button.disabled = true
	})
	addScore(correct)

	nextBtn.classList.add("hide")

	if (shuffledQs.length > currentQIndex + 1) {
		nextBtn.classList.remove("hide")
	} else {
		endBtn.classList.remove("hide")
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element)

	if (correct) {
		element.classList.add("correct")
	} else {
		element.classList.add("wrong")
	}
}

function clearStatusClass(element) {
	element.classList.remove("correct")
	element.classList.remove("wrong")
}

function addScore(correct) {
	if (correct) {
		score++
		scoreCount.innerText = score
		checker.innerText = "Correct!!"
	} else {
		checker.innerText = "Wrong!!"
	}
}

const questions = [
	{
		question: "People in quarantine are usually: ",
		answers: [
			{ text: "healthy", correct: true },
			{ text: "sick", correct: false },
		],
	},
	{
		question: "People who are _____ must isolate themselves",
		answers: [
			{ text: "sick", correct: true },
			{ text: "healthy", correct: false },
		],
	},
	{
		question: "quarantine = isolation",
		answers: [
			{ text: "true", correct: false },
			{ text: "false", correct: true },
		],
	},
]
