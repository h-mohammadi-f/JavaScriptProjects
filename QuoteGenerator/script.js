const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnSend = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


//loader

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

//Get quote from API
async function getQuote() {
    loading();
    // Pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        getQuote();
    } catch (error) {
        // Catch Error Here
    }
}

function funBtnSend() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const destAddress = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(destAddress, '_blank');
}

//Event Listeners

btnSend.addEventListener('click', funBtnSend);
btnNewQuote.addEventListener('click', getQuote);

// On Load

getQuotes();
