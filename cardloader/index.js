// Loads all the items in the card directory and adds them to the dom
// v 0.1 Does just that ^^

const DIR = './cards';

const parseCard = (text) => {
    const [title, subtitle, body] = text.split('---');
    return `<h1>${title}</h1>
        <h4>${subtitle}</h4>
        <p>${body}</p>
    `
}

const app = document.getElementById('app');

async function fetchCards() {
    const cards = await fetch('/cards/files.json');
    const cardsList= await cards.json();
    cardsList.forEach(async (filename) => {
        const cardFile = await fetch(`/cards/${filename}`);
        const cardFileText = await cardFile.text();
        const cardBody = parseCard(cardFileText);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = cardBody;
        app.append(card);

    })
    console.log(cardsList);
}   

fetchCards();