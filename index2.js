const quote = document.querySelector(".quote");

function getQuote() {
	fetch("https://api.kanye.rest")
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Network response error!");
			}
		})
		.then((data) => {
			startCounting();
			quote.textContent = data.quote;
		});
}

// progress

let num = 1;
let intervalId;

function startCounting() {
	clearInterval(intervalId);
	num = 1;
	// Start a new interval
	intervalId = setInterval(() => {
		document.getElementById("progressBar").style.width = `${num}%`; // Update the progress bar
		num++;
		if (num > 100) {
			num = 1;
			getQuote();
		}
	}, 100);
}

function stopCounting() {
	clearInterval(intervalId);
}

document
	.getElementById("continueButton")
	.addEventListener("click", startCounting);
document.getElementById("startButton").addEventListener("click", startCounting);
document.getElementById("stopButton").addEventListener("click", stopCounting);

//Scroll Reveal
ScrollReveal({ duration: 2500, direction: "top", distance: "300px" }).reveal(
	document.body
);
