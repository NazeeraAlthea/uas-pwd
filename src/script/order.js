export async function displayItems(type) {
  const response = await fetch('./data/data.json');
  const data = await response.json();

  const container = document.querySelector('.container');
  container.innerHTML = ''; 
  
  let savedOrders = JSON.parse(localStorage.getItem('orders')) || {};

  data[type].map(e => {
    let card = document.createElement('div');

    card.innerHTML = `
    <div class="flex flex-col items-center border shadow rounded relative gap-2 h-80 sm:w-60">
      <img class="object-cover h-3/5 w-full" src="${e.image}">
        <div class="font-semibold text-lg">${e.name}</div>
        <div class="text-red-700 font-bold">${e.price}</div>

      <button class="orderButton bg-white text-red-950 border border-red-950 hover:bg-red-950 hover:text-white p-1 m-2 rounded font-semibold w-10/12">Order</button>

      <div class="displayProductOrder ${savedOrders[e.name] ? 'flex' : 'hidden'} items-center justify-center gap-4">
        <button class="reduceOrder flex border px-2 py-1 rounded border-black">-</button>
        <span class="totalOrder">${savedOrders[e.name] || 0}</span>
        <button class="addOrder flex border px-2 py-1 rounded border-black">+</button>
      </div>
    </div>
    `;
    
    container.appendChild(card);

    let buyOrder = document.getElementById('buyOrder');
    let orderButton = card.querySelector('.orderButton');
    let displayProductOrder = card.querySelector('.displayProductOrder');
    let totalOrder = card.querySelector('.totalOrder');
    let addOrder = card.querySelector('.addOrder');
    let reduceOrder = card.querySelector('.reduceOrder');
    let displayPrice = document.getElementById('displayPrice')

    orderButton.addEventListener('click', () => {
      orderItems(e.price, e.name);
      buyOrder.classList.remove('hidden');
      displayProductOrder.classList.remove('hidden');
      displayProductOrder.classList.add('flex');
      orderButton.classList.add('hidden');
      let x = parseInt(totalOrder.innerHTML) || 0;
      x++;
      totalOrder.innerHTML = x;
    });

    addOrder.addEventListener('click', () => {
      orderItems(e.price, e.name);
      let x = parseInt(totalOrder.innerHTML) || 0;
      x++;
      totalOrder.innerHTML = x;
    });

    reduceOrder.addEventListener('click', () => {
      deleteItems(e.price, e.name);
      let x = parseInt(totalOrder.innerHTML) || 0;
      if (x > 0) x--;
      totalOrder.innerHTML = x;
      if(savedOrders[e.name] == 0) {
        orderButton.classList.remove('hidden')
        displayProductOrder.classList.add('hidden')
      }
    });

    if (savedOrders[e.name] > 0) {
      orderButton.classList.add('hidden');
      buyOrder.classList.remove('hidden')
      displayPrice.classList.remove('hidden')
    }

    
  });
  
  function orderItems(price, name) {
    let displayPrice = document.getElementById('displayPrice');
    if (displayPrice) {
      let currentPrice = parseFloat(localStorage.getItem('total')) || 0;
      let newPrice = currentPrice + price
      localStorage.setItem('total', newPrice)
      displayPrice.innerHTML = localStorage.getItem('total')
      
      savedOrders[name] = (savedOrders[name] || 0) + 1;
      localStorage.setItem('orders', JSON.stringify(savedOrders));
    }
  }

  function deleteItems(price, name) {
    let displayPrice = document.getElementById('displayPrice');
    if (displayPrice) {
      let currentPrice = parseFloat(localStorage.getItem('total'));
      let newPrice = parseFloat(price);
      let updatedPrice = currentPrice - newPrice;
      localStorage.setItem("total", updatedPrice);
      displayPrice.innerText = `${localStorage.getItem('total')}`;
      
      if (savedOrders[name] > 0) {
        savedOrders[name]--;
        localStorage.setItem('orders', JSON.stringify(savedOrders));
      }
    }
  }

}
