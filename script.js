const quoteContainer= document.getElementById("quot-container")
const quoteText= document.getElementById("quote")
const quoteAuthor= document.getElementById("author")
const quoteTwiterButton= document.getElementById("twiter-button")
const quoteNewQuoteButton= document.getElementById("new-quote")
const quotLoader= document.getElementById("loader")

// Get Quotes from api
let apiQuotes =[];
//Show Loading 
function loading() {
  quotLoader.hidden=false;
  quoteContainer.hidden=true;
}
//Hid Loading
function complete(params) {
  quoteContainer.hidden=false;
  quotLoader.hidden=true;
}


//Show  New quote
function newQuote() {
  loading()
  //pick a random quote from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length )];
 // console.log(quote)
  //console.log(apiQuotes.indexOf(quote))
  //Check Author quote is empty and replace it with 'Unknown'
  if (!quote.author) {
    quoteAuthor.textContent='Unknown';
  }else {
    quoteAuthor.textContent=quote.author; 
  }
  //Check Quote lenth to determine styling
  if (quote.text.length>50) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
   
  quoteText.textContent=quote.text;
complete() 
}
async  function getQuotes() {
  loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json()
      newQuote()
    }
    catch(err) {
     //Catch Error
     console.log(err)
    }
    complete()  
}

//Tweet Quote
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${ quoteAuthor.textContent}`;
  window.open(tweetUrl,'_blank')
}

//Event Listeners
quoteNewQuoteButton.addEventListener('click', newQuote)
quoteTwiterButton.addEventListener('click', tweetQuote)

//On load

getQuotes();

// function localQuote() {
//   //pick a random quote from api quotes array
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length )];
//   console.log(quote)
//   console.log(localQuotes.indexOf(quote))
// }

// localQuote()