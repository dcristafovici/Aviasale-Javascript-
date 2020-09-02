// Get Search ID
var x = new XMLHttpRequest()
x.open("GET", 'https://front-test.beta.aviasales.ru/search', false)
x.send( null )
var response = x.responseText;

// Parse SearchId in json
var jsonAviasale = JSON.parse(response).searchId



// Send new Request
var newRequest = new XMLHttpRequest()
var newString = 'https://front-test.beta.aviasales.ru/tickets?searchId=' + jsonAviasale;
newRequest.open("GET", newString, false);
newRequest.send(null)
var newResponse = newRequest.responseText;


var allResultJson = JSON.parse(newResponse)
var allTickets = allResultJson.tickets
console.log(allTickets)