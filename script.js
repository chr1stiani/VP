// Nastavení kategorie pro citáty
var category = 'money'

// AJAX požadavek pro získání citátu
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: { 'X-Api-Key': 'C5XSUFp0Z9UFltRSGp4YqA==uqKTooZfgBpwi4cE'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
        // Zobrazení citátu na stránce
        $('.quote').html(result[0].quote);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

// Pole pro uchovávání historie hodů
let rollHistory = [];

// Funkce pro aktualizaci historie
function updateHistory(value, type) {
    const historyElement = document.getElementById('history');
    const roll = { value, type };
    rollHistory.unshift(roll);

    // Udržování pouze posledních 8 hodů
    if (rollHistory.length > 7) {
        rollHistory.pop();
    }

    // Aktualizace zobrazení historie - napsáno pomocí ai
    historyElement.textContent = rollHistory.map(roll => roll.value > 0 ? `+${roll.value}${roll.type}` : `${roll.value}${roll.type}`).join(', ');
}

// Event listener pro tlačítko "Hodit" kostkou
document.getElementById('rollDiceButton').addEventListener('click', function() {
    const diceNumberElement = document.getElementById('diceNumber');
    const dcoinsElement = document.getElementById('dcoins');
    const historyElement = document.getElementById('history');

    // Generování náhodného čísla od 1 do 6
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // Přidání animace
    diceNumberElement.classList.add('animate');

    // Po dokončení animace aktualizace hodnot
    setTimeout(() => {
        diceNumberElement.classList.remove('animate');
        diceNumberElement.textContent = diceRoll;

        // Aktualizace DCoins
        const currentDCoins = parseInt(dcoinsElement.textContent);
        const newDCoins = currentDCoins + diceRoll;
        dcoinsElement.textContent = newDCoins;

        // Aktualizace historie
        updateHistory(diceRoll, 'D');
    }, 1000);
});

// Event listener pro tlačítko "Potvrdit" pro tipování čísla
document.getElementById('guessButton').addEventListener('click', function() {
    const guessInput = parseInt(document.querySelector('.guessNumberInput').value);
    const guessNumberElement = document.querySelector('.guessNumberText');
    const gcoinsElement = document.querySelector('.gcoins');
    const historyElement = document.getElementById('history');

    // Validace vstupu uživatele
    if (isNaN(guessInput) || guessInput < 1 || guessInput > 10) {
        alert('Prosím zadejte číslo od 1 do 10');
        return;
    }

    // Generování náhodného čísla od 1 do 10
    const guessRoll = Math.floor(Math.random() * 10) + 1;
    guessNumberElement.classList.add('animate');

    // Po dokončení animace aktualizace hodnot
    setTimeout(() => {
        guessNumberElement.classList.remove('animate');
        guessNumberElement.textContent = guessRoll;

        // Aktualizace GCoins
        const currentGCoins = parseInt(gcoinsElement.textContent);
        let points = 0;
        if (guessInput === guessRoll) {
            points = 20;
        } else {
            points = -5;
        }
        gcoinsElement.textContent = currentGCoins + points;

        // Aktualizace historie
        updateHistory(points, 'G');
    }, 1000);
});

// Inicializace particles.js
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});