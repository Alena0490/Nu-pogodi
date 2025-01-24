let score = 0; // Bodové skóre

let soundEnabled = false;
const soundToggle = document.getElementById("sound-toggle");
const backgroundSound = document.getElementById("background-sound");
    
    // Přepínání zvuku
    soundToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
  
// Nastavení hlasitosti
backgroundSound.volume = 1.0; // Maximum

        if (soundEnabled) {
            backgroundSound.play();
            soundToggle.textContent = "🔉";
        } else {
            backgroundSound.pause();
            soundToggle.textContent = "🔇";
        }
    });

// Funkce pro vytvoření vajíčka
function createEgg(rowId) {
    const gameField = document.getElementById("game-container");
    const egg = document.createElement("div");
    egg.classList.add("egg");
    egg.textContent = "🥚";

    // Nastavíme startovací pozici vajíčka podle řádku
    switch (rowId) {
        case "row1":
            egg.style.top = "20%";
            egg.style.left = "5%";
            break;
        case "row2":
            egg.style.top = "20%";
            egg.style.left = "95%";
            break;
        case "row3":
            egg.style.top = "63%";
            egg.style.left = "5%";
            break;
        case "row4":
            egg.style.top = "63%";
            egg.style.left = "95%";
            break;
    }

    gameField.appendChild(egg); // Přidáme vajíčko do herního pole
    moveEggOnPlank(egg, rowId); // Spustíme pohyb vajíčka
}

// Funkce pro pohyb vajíčka po prkně
function moveEggOnPlank(egg, rowId) {
    let positionX = parseFloat(egg.style.left);
    let positionY = parseFloat(egg.style.top);
    const isLeftToRight = rowId === "row1" || rowId === "row3"; // Rozlišení směru pohybu

    const interval = setInterval(() => {
        if (isLeftToRight) {
            positionX += 0.5; // Posun doprava
            positionY += 0.27; // Posun dolů (šikmý pohyb)
        } else {
            positionX -= 0.5; // Posun doleva
            positionY += 0.27; // Posun dolů (šikmý pohyb)
        }

        egg.style.left = positionX + "%";
        egg.style.top = positionY + "%";

        // Když vajíčko dosáhne konce prkna
        if ((isLeftToRight && positionX >= 35) || (!isLeftToRight && positionX <= 65)) {
            clearInterval(interval);

            // Kontrola, zda vlk je na správném prkně
            if (currentWolfPosition === rowId) {
                catchEgg(egg);
            } else {
                fallToGround(egg);
            }
        }
    }, 50);
}

// Funkce pro chycení vajíčka
function catchEgg(egg) {
    egg.textContent = "✅";
    setTimeout(() => egg.remove(), 500);
    increaseScore();
}

// Funkce pro zvýšení skóre
function increaseScore() {
    score++;
    document.querySelector(".points").textContent = `Eggs: ${score}`;
}

let lives = 0; // Počáteční počet životů
const maxLives = 3; // Maximální počet životů
const livesElement = document.querySelector(".lives"); // Element pro zobrazení životů

// Funkce pro ztrátu života
function loseLife() {
    lives++; // Zvýšíme počet životů
    livesElement.textContent = "🐣".repeat(lives); // Aktualizujeme zobrazení životů

    // Kontrola, zda hra končí
    if (lives >= maxLives) {
        endGame();
    }
}

// Funkce pro ukončení hry
function endGame() {
    alert("Hra skončila! Ztratili jste všechny životy."); // Zpráva o konci hry
    location.reload(); // Obnovíme stránku, aby hra začala znovu
}

// Funkce pro pád vajíčka
function fallToGround(egg) {
    let positionY = parseFloat(egg.style.top);

    const interval = setInterval(() => {
        positionY += 2; // Pád dolů
        egg.style.top = positionY + "%";

        // Pokud vajíčko dosáhne spodní části herního pole
        if (positionY >= 90) {
            clearInterval(interval);
            egg.textContent = "🐣"; // Změní se na kuřátko
            setTimeout(() => egg.remove(), 2000); // Kuřátko zmizí po 2 sekundách

            // Ztráta života
            loseLife();
        }
    }, 50);
}

// Automatické generování vajíček
setInterval(() => {
    const rows = ["row1", "row2", "row3", "row4"];
    const randomRow = rows[Math.floor(Math.random() * rows.length)];
    createEgg(randomRow);
}, 2000);

// Funkce pro zobrazení správného vlka
function showWolf(wolfId, rowId) {
    currentWolfPosition = rowId;

    const wolves = document.querySelectorAll(".wolf img");
    wolves.forEach((wolf) => {
        wolf.style.display = "none";
    });

    const selectedWolf = document.getElementById(wolfId);
    if (selectedWolf) {
        selectedWolf.style.display = "block";
    }
}

// Událost pro stisk klávesy
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "1":
            showWolf("wolf1", "row3");
            break;
        case "3":
            showWolf("wolf3", "row4");
            break;
        case "7":
            showWolf("wolf7", "row1");
            break;
        case "9":
            showWolf("wolf9", "row2");
            break;
    }
});

// Výchozí zobrazení vlka
document.addEventListener("DOMContentLoaded", () => {
    showWolf("wolf7", "row3");
});
