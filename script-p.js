let score = 0; // Bodové skóre
let gameOver = false; // Stav hry
let level = 1; // Aktuální úroveň
let eggSpeed = 50; // Počáteční rychlost vajíček (ms)
let eggGenerationInterval; // Proměnná pro ukládání intervalu generování vajíček

let soundEnabled = false;
const soundToggle = document.getElementById("sound-toggle");
const backgroundSound = document.getElementById("background-sound");
    
    // Přepínání zvuku
    soundToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
  
// Nastavení hlasitosti
backgroundSound.volume = 0.2; // Maximum

        if (soundEnabled) {
            backgroundSound.play();
            soundToggle.textContent = "🔉";
        } else {
            backgroundSound.pause();
            soundToggle.textContent = "🔇";
        }
    });

// Funkce pro nastavení pozice vajíčka
function setEggPosition(rowId, egg) {
    let isMobile = window.matchMedia("(max-width: 480px)").matches;

    switch (rowId) {
        case "row1":
            egg.style.top = isMobile ? "15.5%" : "19.5%";
            egg.style.left = isMobile ? "5%" : "5%";
            break;
        case "row2":
            egg.style.top = isMobile ? "14.5%" : "19.5%";
            egg.style.left = isMobile ? "95%" : "95%";
            break;
        case "row3":
            egg.style.top = isMobile ? "59%" : "63%";
            egg.style.left = isMobile ? "5%" : "5%";
            break;
        case "row4":
            egg.style.top = isMobile ? "56.5%" : "61.5%";
            egg.style.left = isMobile ? "96%" : "95%";
            break;
    }
}

// Funkce pro vytvoření vajíčka
function createEgg(rowId) {
    const gameField = document.getElementById("game-container");
    const egg = document.createElement("div");
    egg.classList.add("egg");
    egg.textContent = "🥚";

    // Použití globální funkce pro pozici vajíčka
    setEggPosition(rowId, egg);

    gameField.appendChild(egg); // Přidání vajíčka do herního pole
    moveEggOnPlank(egg, rowId); // Spustí pohyb vajíčka
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
    }, eggSpeed); // Použití aktuální rychlosti vajíček;
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

    // Zkontroluje, zda je čas zvýšit úroveň
    if (score % 20 === 0) {
        increaseLevel();
    }
}

// Funkce pro zvýšení levelu
function increaseLevel() {
    level++;
    document.querySelector(".level").textContent = `Level: ${level}`;

    // Zrychlení vajíček
    eggSpeed = Math.max(eggSpeed - 10, 10); // Minimální rychlost = 10 ms
}

let lives = 0; // Počáteční počet životů
const maxLives = 3; // Maximální počet životů
const livesElement = document.querySelector(".lives"); // Element pro zobrazení životů

// Funkce pro ztrátu života
function loseLife() {
lives++; // Zvýší počet životů
const livesElement = document.querySelector(".lives");
livesElement.textContent = "🐣".repeat(lives); // Aktualizuje zobrazení životů
}

function endGame() {
    if (gameOver) return; // Pokud už hra skončila, nic nedělej

    gameOver = true; // Nastaví stav hry na ukončený

    // Zastaví generování vajíček
    clearInterval(eggGenerationInterval);

    // Najde všechna aktuální vajíčka a odstraní je
    const eggs = document.querySelectorAll(".egg");
    eggs.forEach((egg) => egg.remove());

    // Zastaví všechny aktivní intervaly pro pohyb vajíček
    const highestIntervalId = setInterval(() => {}, 0); // Zjistí nejvyšší ID intervalu
    for (let i = 0; i < highestIntervalId; i++) {
        clearInterval(i); // Zastaví všechny intervaly
    }

    // Přehrání zvuku "Game Over"
    const gameOverSound = document.getElementById("game-over-39-199830");
    gameOverSound.play();

    // Zobrazení divu "Game Over"
    const gameOverDiv = document.querySelector(".game-over");
    gameOverDiv.style.display = "flex";
    gameOverDiv.innerHTML = `Game Over<br>Your score is: ${score}`;

    // Po krátké prodlevě zobrazí skóre
    setTimeout(() => {
        gameOverDiv.innerHTML = `Restart the game`;
    }, 4000); // Změní text po 2 s.

    // Kliknutím kamkoliv restartuje hru
    document.body.addEventListener("click", () => {
        location.reload();
    }, { once: true }); 
}

// Funkce pro ztrátu života
function loseLife() {
    if (gameOver) return; // Pokud hra skončila, neztrácíme další životy

    lives++; // Zvýší počet životů
    const livesElement = document.querySelector(".lives");
    livesElement.textContent = "🐣".repeat(lives); // Aktualizujeme zobrazení životů

    // Kontrola, zda hra končí
    if (lives >= maxLives) {
        endGame(); // Okamžité ukončení hry
    }
}

// Funkce pro pád vajíčka
// Funkce pro pád vajíčka na zem
function fallToGround(egg) {
    let positionY = parseFloat(egg.style.top);

    const interval = setInterval(() => {
        positionY += 2; // Pád dolů
        egg.style.top = positionY + "%";

        // Pokud vajíčko dosáhne spodní části herního pole
        if (positionY >= 88) {
            clearInterval(interval);
            egg.textContent = "🐣"; // Změní se na kuře

            // Po 1 sekundě kuře 🐣 změníme na kuřátko 🐤
            setTimeout(() => {
                egg.textContent = "🐤";

                // Spustíme animaci úprku doleva
                let positionX = parseFloat(egg.style.left);
                const runInterval = setInterval(() => {
                    positionX -= 1; // Pohyb doleva
                    egg.style.left = positionX + "%";

                    // Pokud kuře uteče mimo obrazovku, odstraníme ho
                    if (positionX < -10) {
                        clearInterval(runInterval);
                        egg.remove();
                    }
                }, 50); // Frekvence posunu kuřete

            }, 1000); // Po 1 sekundě

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
    showWolf("wolf7", "row1");
});

/**Zajíc */
document.addEventListener("DOMContentLoaded", () => {
    const rabbit = document.querySelector('.r3'); // Výběr zajíce .r3

    // Skrytí zajíce na začátku
    rabbit.style.display = "none";

    function showRabbit() {
        rabbit.style.display = "block"; // Zobrazí zajíce

        // Po 3 sekundách zajíce skryje
        setTimeout(() => {
            rabbit.style.display = "none";

            // Nastavení náhodného intervalu pro další zobrazení
            const randomTime = Math.random() * 10000 + 10000; // Náhodný čas mezi 5 až 15 sekundami
            setTimeout(showRabbit, randomTime);
        }, 3000); // Viditelný přesně 3 sekundy
    }

    // Spuštění zobrazení zajíce
    showRabbit();
});


/****Zvonění */
const bellSound = document.getElementById("bell"); // Element pro zvuk zvonku
let bellInterval; // Interval pro efekt zvonění

// Funkce pro spuštění efektu zvonění
function startBellEffect() {
    const bellSound = document.getElementById("bell"); // Element pro zvuk zvonku
    let bellInterval; // Interval pro efekt zvonění
    const r1 = document.querySelector('.r1');
    const r2 = document.querySelector('.r2');
    const r3 = document.querySelector('.r3');

    // Skryje .r3
    r3.style.display = 'none';

    // Ujistí se, že .r1 a .r2 jsou viditelné
    r1.style.display = 'block';
    r2.style.display = 'block';

    let toggle = false;

    bellInterval = setInterval(() => {
        if (toggle) {
            r1.style.visibility = 'visible';
            r2.style.visibility = 'hidden';
        } else {
            r1.style.visibility = 'hidden';
            r2.style.visibility = 'visible';
        }
        toggle = !toggle;

    }, 200); // Interval 200 ms pro efekt zvonění
        // Přehrání zvuku zvonku s nastavením na loop
        if (bellSound) {
            bellSound.loop = true;
            bellSound.play().catch(error => {
                console.error('Chyba při přehrávání zvuku:', error);
            });
        }
    }


function loseLife() {
    if (gameOver) return;

    lives++;
    livesElement.textContent = "🐣".repeat(lives);

    if (lives === 2) {
        startBellEffect();
    }

    if (lives >= maxLives) {
        stopBellEffect();
        endGame();
    }
}

// Funkce pro zastavení efektu zvonění
function stopBellEffect() {
    // Zastaví efekt zvonění, pokud běží
    if (bellInterval) {
        clearInterval(bellInterval);
        bellInterval = null;
    }

    // Zastavíme zvuk zvonku
    if (bellSound) {
        bellSound.pause();
        bellSound.currentTime = 0; // Nastavíme čas přehrávání na začátek
    }

    // Skryje všechny prvky zvonku
    document.querySelector('.r1').style.display = 'none';
    document.querySelector('.r2').style.display = 'none';
}

    // Zastaví efekt zvonění, pokud běží
    if (bellInterval) {
        clearInterval(bellInterval);
    }

    // Skryje všechny prvky zvonku
    document.querySelector('.r1').style.display = 'none';
    document.querySelector('.r2').style.display = 'none';

    //Hodiny
    function updateTime() {
        const timeElement = document.getElementById('time');
        const now = new Date();
      
        // Získání hodin, minut a sekund
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        // Zobrazení času ve formátu HH:MM:SS
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
      }
      
      // Aktualizace času každou sekundu
      setInterval(updateTime, 1000);
      
      // Inicializace času při načtení stránky
      updateTime();

      /***Obecné */
      /*Burger menu*/
$(document).ready(function () {
    $('.jq--nav-icon').click(function (event) {
        // Zabraň výchozímu chování odkazu
        event.preventDefault();

        // Zkontroluje aktuální hodnotu src atributu obrázku
        if ($('.jq--nav-icon').attr('src') === '/burger-barw.png') {
    $('.jq--nav-icon').attr('src', '/closew.png'); // Absolutní cesta
} else {
    $('.jq--nav-icon').attr('src', '/burger-barw.png'); // Absolutní cesta
}
        // Zobrazí/skryje mobilní pozadí a navigaci
        $('.mobile-nav-back').fadeToggle(500);
        $('.first').fadeToggle(500);
    });
});

//Cookies
document.addEventListener("DOMContentLoaded", function() {
    // Zkontroluje, zda uživatel už cookies přijal
    if (!localStorage.getItem("cookiesAccepted")) {
        // Zobrazí banner, pokud ještě nejsou cookies přijaty
        document.getElementById("cookie-banner").style.display = "block";
    }

    // Přidá posluchač události na tlačítko
    document.getElementById("accept-cookies").addEventListener("click", function() {
        // Uloží souhlas do localStorage
        localStorage.setItem("cookiesAccepted", "true");
        // Skryje banner
        document.getElementById("cookie-banner").style.display = "none";
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Zkontroluje, zda uživatel už cookies přijal
    if (!localStorage.getItem("cookiesAccepted")) {
        // Zobrazí banner, pokud ještě nejsou cookies přijaty
        document.getElementById("cookie-banner").style.display = "block";
    }

    // Přidá posluchač události na tlačítko
    document.getElementById("accept-cookies").addEventListener("click", function() {
        // Uložíme souhlas do localStorage
        localStorage.setItem("cookiesAccepted", "true");
        // Skryje banner
        document.getElementById("cookie-banner").style.display = "none";
    });
});

//Mobilní ovládání
const k1 = document.querySelector('#k1')
const k3 = document.querySelector('#k3')
const k7 = document.querySelector('#k7')
const k9 = document.querySelector('#k9')

k1.addEventListener("click", function(){
    showWolf("wolf1", "row3");
})

k3.addEventListener("click", function(){
    showWolf("wolf3", "row4");
})

k7.addEventListener("click", function(){
    showWolf("wolf7", "row1");
})

k9.addEventListener("click", function(){
    showWolf("wolf9", "row2");
})

