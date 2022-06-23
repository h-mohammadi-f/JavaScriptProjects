const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnSend = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//loader

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function complete(){
    if (!loader.hidden) {
        loader.hidden=true;
        quoteContainer.hidden=false;
    }
}

//Get quote from API
async function getQuote() {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        loading();
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        //if the author is null we put unknown instad of blank
        if (data.quoteAuthor === '') {
            authorText.innerText = '-Unknown'
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        //if the length of the code is more than 50 we want to reduce the size of the text
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        complete()
    } catch (error) {
        console.log('Whoops, no quote', error);
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

getQuote();
