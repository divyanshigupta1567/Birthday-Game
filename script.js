// ========================================
// ELEMENT REFERENCES
// ========================================

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");

const numbers = document.getElementById("numbers");
const card = document.getElementById("card");

const start = document.getElementById("start");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const again = document.getElementById("again");

const bar = document.getElementById("bar");
const pct = document.getElementById("pct");
const qtext = document.getElementById("qtext");
const badge = document.getElementById("badge");
const count = document.getElementById("count");
const answer = document.getElementById("answer");

const themeToggle = document.getElementById("themeToggle");


// ========================================
// GAME DATA
// ========================================

// These values are intentionally kept hidden
// from the player.
//
// They are used internally to calculate
// the birthday date from the YES / NO answers.

const hiddenValues = [
    1,
    2,
    4,
    8,
    16
];


// Each card gets a different accent colour.

const colors = [
    "#ff4f9a",
    "#ffb52e",
    "#65ee76",
    "#47e5ff",
    "#aa6dff"
];


// ========================================
// GAME STATE
// ========================================

let current = 0;
let guessed = 0;


// ========================================
// THEME / DARK-LIGHT MODE
// ========================================

function toggleTheme() {

    document.body.classList.toggle("light-mode");

    const isLightMode =
        document.body.classList.contains("light-mode");

    if (isLightMode) {

        themeToggle.textContent = "🌙";
        themeToggle.title = "Switch to dark mode";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        themeToggle.textContent = "☀️";
        themeToggle.title = "Switch to light mode";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    }
}

themeToggle.addEventListener(
    "click",
    toggleTheme
);


// ========================================
// GET NUMBERS FOR CURRENT CARD
// ========================================

function numbersForCard(value) {

    const list = [];

    for (let n = 1; n <= 31; n++) {

        if ((n & value) !== 0) {
            list.push(n);
        }
    }

    return list;
}


// ========================================
// SHOW CURRENT CARD
// ========================================

function showCard() {

    const cardNumbers =
        numbersForCard(hiddenValues[current]);


    // Display numbers inside the card.

    numbers.innerHTML = cardNumbers
        .map(
            (number) =>
                `<span class="num">${number}</span>`
        )
        .join("");


    // Change card accent colour.

    card.style.setProperty(
        "--accent",
        colors[current]
    );


    // Restart card entrance animation.

    card.style.animation = "none";

    void card.offsetWidth;

    card.style.animation =
        "enter 0.55s ease";


    // Update progress information.

    badge.textContent =
        `QUESTION ${current + 1}`;

    count.textContent =
        `${current + 1} / 5`;

    qtext.textContent =
        `Question ${current + 1} of 5`;

    pct.textContent =
        `${Math.round(((current + 1) / 5) * 100)}%`;

    bar.style.width =
        `${((current + 1) / 5) * 100}%`;
}


// ========================================
// START GAME
// ========================================

function startGame() {

    current = 0;
    guessed = 0;

    intro.classList.add("hidden");

    result.classList.add("hidden");

    game.classList.remove("hidden");

    showCard();
}

start.addEventListener(
    "click",
    startGame
);


// ========================================
// HANDLE YES / NO
// ========================================

function choose(isYes) {

    // Only a YES contributes to the final date.

    if (isYes) {
        guessed += hiddenValues[current];
    }


    // If this was the fifth card,
    // show the result.

    if (current === hiddenValues.length - 1) {

        game.classList.add("hidden");

        result.classList.remove("hidden");

        answer.textContent = guessed;

        return;
    }


    // Otherwise move to the next card.

    current++;

    showCard();
}


// ========================================
// YES BUTTON
// ========================================

yes.addEventListener(
    "click",
    () => choose(true)
);


// ========================================
// NO BUTTON
// ========================================

no.addEventListener(
    "click",
    () => choose(false)
);


// ========================================
// PLAY AGAIN
// ========================================

function restartGame() {

    result.classList.add("hidden");

    intro.classList.remove("hidden");
}

again.addEventListener(
    "click",
    restartGame
);
