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
allTickets = allTickets.slice(0,5)

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return hours + 'ч. ' + minutes + 'м.';
};

const homeItems = document.querySelector('.home-items')


allTickets.forEach(item =>{

  var priceItem = item.price;
  var carrier = item.carrier;
  var carrierURL = 'pics.avs.io/99/36/' + carrier + '.png'
  var segments = item.segments;
  var dateTest = segments[0].date
  console.log(dateTest)

  
  const homeItem = document.createElement('div')
  homeItem.className = 'home-item'
  
  homeItem.innerHTML = `
    <div class="home-item__top">
      <div class="home-item__price">${priceItem} Р</div>
      <div class="home-item__logo">
        <img src="https://${carrierURL}" alt="">
      </div>
    </div>
    <div class="home-item__points">
      ${segments.map((item) => `
      
      <div class="home-point">
        <ul>
          <li><span>${item.origin} – ${item.destination}</span><span>10:45 – 08:00</span>
          </li>
          <li><span>В пути</span><span>${getTimeFromMins(item.duration)}</span>
          </li>
          <li>
            <span>1 пересадка</span>
            <span>HKG</span>
          </li>
        </ul>
      </div>
      `).join('')}
    </div>
  `;



  homeItems.appendChild(homeItem);


  
})
//pics.avs.io/99/36/{IATA_CODE_HERE}.png

