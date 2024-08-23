let deck = [];
let symbolDeck = ['C', 'D', 'H', 'S'];
let specials = ['J', 'Q', 'K', 'A'];
let pointsPlayer = 0, pointsComputer = 0;

const $btnGetCard = document.getElementById('btn-get-card');
const $btnNewGame = document.getElementById('btn-new-game');
const $btnStopGame = document.getElementById('btn-stop-game');


const divCardsPlayer     = document.querySelector('#player-cards');
const divCardsComputer = document.querySelector('#computer-cards');

const $pointsHTML = document.querySelectorAll('small');

const createDeck = () => {
    for(let symbol of symbolDeck) {
        for (let i = 2; i <= 10; i++) {
            deck.push(i + symbol);    
        }
        for (let special of specials) {
            deck.push(special + symbol);
        }
    }
    return _.shuffle(deck);
}

createDeck();

const getCard = () => {
    if (deck.length === 0) throw 'Baraja Vacia';
    const numberCustom = Math.round(Math.random());
    return numberCustom ? deck.pop() : deck.shift();
}

const valueCard = ( card ) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : parseInt(value);
}

const turnComputer = ( minimumPoints ) => {
    do {
        const card = getCard();
        pointsComputer += valueCard( card );
        $pointsHTML[1].innerText = pointsComputer;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('game-card');
        divCardsComputer.append( imgCard );

        if ( minimumPoints > 21 ) break;

    } while((pointsComputer < minimumPoints) && (minimumPoints <= 21));

    setTimeout(() => {
        if( pointsComputer === minimumPoints ) {
            alert('Lo siento, nadie gana :(');
        } else if ( minimumPoints > 21 ) {
            alert('La computadora gana')
        } else if( pointsComputer > 21 ) {
            alert('El jugador gana');
        } else {
            alert('La computadora gana')
        }
    }, 100 );
}

$btnGetCard.addEventListener('click', () => {
    const card = getCard();
    pointsPlayer += valueCard(card);
    $pointsHTML[0].innerText = pointsPlayer;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add('game-card');
    divCardsPlayer.append( imgCard );

    if ( pointsPlayer > 21 ) {
        $btnGetCard.disabled  = true;
        $btnStopGame.disabled = true;
        turnComputer( pointsPlayer );

    } else if ( pointsPlayer === 21 ) {
        $btnGetCard.disabled   = true;
        $btnStopGame.disabled = true;
        turnComputer( pointsPlayer );
    }
});

$btnStopGame.addEventListener('click', () => {
    $btnGetCard.disabled = true;
    $btnStopGame.disabled = true;

    turnComputer( pointsPlayer );
});

$btnNewGame.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = createDeck();

    pointsPlayer = 0;
    pointsComputer = 0;

    $pointsHTML[0].innerText = 0;
    $pointsHTML[1].innerText = 0;

    divCardsComputer.innerHTML = '';
    divCardsPlayer.innerHTML = '';

    $btnGetCard.disabled = false;
    $btnStopGame.disabled = false;
});