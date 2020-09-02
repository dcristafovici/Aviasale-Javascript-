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

const homeItems = document.querySelector('.home-items')




function createElements(){
  
  allTickets.forEach(item =>{

    var priceItem = item.price;
    var carrier = item.carrier;
    var carrierURL = 'pics.avs.io/99/36/' + carrier + '.png'
    var segments = item.segments;
    var dateTest = segments[0].date

    
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
            <li><span>${item.origin} – ${item.destination}</span><span>${new Date(item.date).toLocaleTimeString("ru", {hour: '2-digit', minute:'2-digit'})} – 08:00</span>
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

}

createElements()
function getTimeFromMins(mins) {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return hours + 'ч. ' + minutes + 'м.';
};




const tabsItems = document.querySelectorAll('.home-tabs li')


tabsItems.forEach(item => {

  item.addEventListener('click',function(event) {

    tabsItems.forEach(tab => {

      tab.classList.remove('active')

    })

    item.classList.add('active')

    allTickets.sort(function(a, b){
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    })
    homeItems.innerHTML = '';
    createElements()
  })

})


