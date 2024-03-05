const Category = document.querySelector(".category");
const Type = document.querySelector(".type");
const Setup = document.querySelector(".setup");
const Delivery = document.querySelector(".delivery");
const Card = document.querySelector(".card");

function getQuote() {
    fetch("https://v2.jokeapi.dev/joke/Any")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Network Response Error.");
            }
        })
        .then((data) => {
            Category.textContent = data.category;
            if (data.type === "twopart"){
                Type.textContent = data.type;
                Delivery.textContent = data.delivery;
            }else{
                Type.textContent = "One Part"
                Delivery.textContent = data.joke
            }
            Setup.textContent = data.setup;
            startCounting();
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
    .addEventListener("click",startCounting);
document.getElementById("startButton").addEventListener("click", startCounting);
document.getElementById("stopButton").addEventListener("click", stopCounting);


//Scroll Reveal
ScrollReveal({ duration: 2500,direction: "top", distance: "300px"}).reveal(document.body)



