const dialogue = document.getElementById("dialogue");
const controls = document.getElementById("controls");
const stageLabel = document.getElementById("stage-label");
const character = document.getElementById("character");
const mouth = document.getElementById("mouth");

let playerName = "";
let selectedColor = "";

const colors = [
    { name: "Purple", hex: "#813fbd", meaning: "mystery" },
    { name: "Green", hex: "#398b52", meaning: "ambition" },
    { name: "Blue", hex: "#367acb", meaning: "calm" },
    { name: "Red", hex: "#bd4545", meaning: "chaos" }
];

const fortunes = [
    "Someone will compliment your outfit soon. Do not let it go to your head. Actually, let it. You deserve this one.",
    "You will open your phone to check one notification and somehow lose  forty-seven minutes. The spirits are disappointed.",
    "A conversation you have been overthinking will turn out to be completely normal. Imagine that.",
    "You will suddenly become extremely productive at the most inconvenient hour. Your homework has been warned.",
    "A snack is calling your name. It is not a metaphor. Go get something to eat.",
    "Someone will ask you a question in class that you also do not know the answer to. Maintain eye contact and look confident.",
    "You are about to discover a new song and play it until everyone around you is sick of it.",
    "An opportunity will appear disguised as an inconvenience. Try not to complain for at least five minutes.",
    "You will walk into a room and forget why you went there. The spirits have also forgotten.",
    "Your future contains a suspiciously specific amount of unfinished tabs. Close some of them, please.",
    "Someone will misunderstand your text. Punctuation is apparently a dangerous game.",
    "You will make a plan, change the plan, and then miss the original plan. Classic.",
    "A small win is coming. It will probably involve finding something you thought you lost.",
    "You are entering an era of saying 'I'll do it tomorrow.' Madame recommends actually doing it today.",
    "You will encounter someone who talks for twenty minutes without saying anything. Practice your polite nod.",
    "A creative idea will arrive when you are supposed to be sleeping. Write it down before it escapes.",
    "You will impress yourself by figuring something out without asking anyone. The spirits approve.",
    "Your next minor inconvenience will feel like a personal attack. It is not. Breathe.",
    "A surprisingly good day is approaching. Do not ruin it by checking your grades every six minutes.",
    "You will have a moment where everything clicks. Unfortunately, it may happen while you are brushing your teeth."
];

const colorReadings = {
    Purple: "The purple energy suggests that your imagination is working overtime. You have ideas that deserve more attention.",
    Green: "The green energy points toward ambition. You are closer to making progress than you think, but consistency is your problem.",
    Blue: "The blue energy suggests that you need a little breathing room. Not every situation needs an immediate response.",
    Red: "The red energy is loud, dramatic, and slightly concerning. Something exciting may be around the corner. Try not to cause it yourself."
};

function setCharacterAngry(angry) {
    character.classList.toggle("angry", angry);
    mouth.classList.toggle("angry", angry);
}

function resetGame() {
    playerName = "";
    selectedColor = "";
    setCharacterAngry(false);

    dialogue.textContent = "Well hello there! What is your name?";
    stageLabel.textContent = "WELCOME, STRANGER";

    controls.innerHTML = `
        <input
            id="name-input"
            type="text"
            maxlength="20"
            placeholder="Enter your name..."
            autocomplete="off"
        >
        <button id="name-submit" class="main-button">
            THAT'S MY NAME →
        </button>
    `;
}

function askName() {
    const input = document.getElementById("name-input");
    const enteredName = input.value.trim();

    if (!enteredName) {
        dialogue.textContent = "I asked for your name, not an invisible answer.";
        input.focus();
        return;
    }

    playerName = enteredName;

    dialogue.textContent = `Ahhh, ${playerName}. Interesting name. Would you like to have your fortune read?`;
    stageLabel.textContent = "THE FIRST DECISION";

    controls.innerHTML = `
        <div class="choice-grid">
            <button id="yes-button">YES PLEASE MISS</button>
            <button id="no-button">NO U UGLY MONSTER</button>
        </div>
    `;
}

function askColor() {
    setCharacterAngry(false);

    dialogue.textContent = `Excellent, ${playerName}. Choose a color. Do not ask me why. The universe is very particular.`;
    stageLabel.textContent = "QUESTION ONE: THE COLORS";

    controls.innerHTML = `
        <div class="choice-grid four-grid">
            ${colors.map(color => `
                <button
                    class="color-choice"
                    data-color="${color.name}"
                    style="background:${color.hex}"
                >
                    ${color.name.toUpperCase()}
                </button>
            `).join("")}
        </div>
    `;
}

function askNumber() {
    dialogue.textContent = `${playerName}, now choose a number between 1 and 20. Choose wisely. I have a very busy schedule.`;
    stageLabel.textContent = "QUESTION TWO: THE NUMBERS";

    controls.innerHTML = `
        <div class="number-grid">
            ${Array.from({ length: 20 }, (_, i) => {
                const number = i + 1;
                const hue = (number * 47) % 360;
                return `
                    <button
                        class="number-choice"
                        data-number="${number}"
                        style="background:hsl(${hue}, 55%, 42%)"
                    >
                        ${number}
                    </button>
                `;
            }).join("")}
        </div>
    `;
}

function revealFortune(number) {
    const fortune = fortunes[number - 1];
    const colorReading = colorReadings[selectedColor];

    dialogue.textContent = `I see something... Oh! ${playerName}, come closer.`;
    stageLabel.textContent = "YOUR FATE HAS BEEN DECIDED";

    controls.innerHTML = `
        <div class="fortune-card">
            <h3>✦ ${playerName.toUpperCase()}'S DAILY FORTUNE ✦</h3>
            <p>${colorReading}</p>
            <br>
            <p>${fortune}</p>
            <br>
            <p><strong>Your lucky color:</strong> ${selectedColor}</p>
            <p><strong>Your lucky number:</strong> ${number}</p>
            <p class="signature">— Madame Fortune</p>
        </div>
        <button id="again-button" class="main-button">
            ASK AGAIN →
        </button>
    `;
}

// All buttons are handled here, including buttons created later.
controls.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    if (button.id === "name-submit") {
        askName();
    }

    if (button.id === "yes-button") {
        askColor();
    }

    if (button.id === "no-button") {
        setCharacterAngry(true);
        stageLabel.textContent = "UNACCEPTABLE BEHAVIOR";
        dialogue.textContent = "GET OUT OF HERE, YOU RUDE LITTLE HUMAN!";
        controls.innerHTML = `
            <p style="color:#e4b7b7; margin-bottom:15px;">
                MADAME FORTUNE HAS HAD ENOUGH.
            </p>
            <button id="again-button" class="main-button">
                START OVER
            </button>
        `;
    }

    if (button.classList.contains("color-choice")) {
        selectedColor = button.dataset.color;
        askNumber();
    }

    if (button.classList.contains("number-choice")) {
        revealFortune(Number(button.dataset.number));
    }

    if (button.id === "again-button") {
        resetGame();
    }
});

// Allow the visitor to press Enter after typing their name.
controls.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && event.target.id === "name-input") {
        askName();
    }
});