export async function displayItems(type) {
  const response = await fetch('./data/data.json');
  const data = await response.json();

  const container = document.querySelector('.container');
  container.innerHTML = '';

  let savedOrders = JSON.parse(localStorage.getItem('orders')) || {};

  let buyOrder = document.getElementById('buyOrder');

  data[type].map(e => {
    let card = document.createElement('div');

    card.innerHTML = `
    <div class="flex flex-col items-center border shadow rounded relative gap-2 h-96 sm:w-60"> 
      <img class="object-cover h-3/5 w-full" src="${e.image}">
      <div class="flex flex-col items-center justify-center h-2/5 w-full px-2">
        <div class="font-semibold text-lg h-14">${e.name}</div>
        <div class="text-red-700 font-bold">${e.price}</div>

        <button class="orderButton bg-white text-red-950 border border-red-950 hover:bg-red-950 hover:text-white p-1 m-2 rounded font-semibold w-10/12 mb-2 mt-auto">Order</button>

        <div class="displayProductOrder ${savedOrders[e.name] ? 'flex' : 'hidden'} items-center justify-center gap-4 mb-2 mt-auto">
          <button class="reduceOrder flex border px-2 py-1 rounded border-black">-</button>
          <span class="totalOrder">${savedOrders[e.name] || 0}</span>
          <button class="addOrder flex border px-2 py-1 rounded border-black">+</button>
        </div>
      </div>
    </div>
    `;

    container.appendChild(card);

    let orderButton = card.querySelector('.orderButton');
    let displayProductOrder = card.querySelector('.displayProductOrder');
    let totalOrder = card.querySelector('.totalOrder');
    let addOrder = card.querySelector('.addOrder');
    let reduceOrder = card.querySelector('.reduceOrder');
    let displayPrice = document.getElementById('displayPrice');

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
      if (x == 0) {
        orderButton.classList.remove('hidden');
        displayProductOrder.classList.add('hidden');
      }
      if (localStorage.getItem('total') == 0) {
        buyOrder.classList.add('hidden');
        localStorage.removeItem('total');
      }
    });

    if (savedOrders[e.name] > 0) {
      orderButton.classList.add('hidden');
      buyOrder.classList.remove('hidden');
    }

    if (localStorage.getItem('total') != 0) {
      displayPrice.innerHTML = localStorage.getItem('total');
    }
  });

  buyOrder.addEventListener('click', showCart);
}

function orderItems(price, name) {
  let displayPrice = document.getElementById('displayPrice');
  let savedOrders = JSON.parse(localStorage.getItem('orders')) || {};
  if (displayPrice) {
    let currentPrice = parseFloat(localStorage.getItem('total')) || 0;
    let newPrice = currentPrice + price;
    localStorage.setItem('total', newPrice);
    displayPrice.innerHTML = localStorage.getItem('total');

    savedOrders[name] = (savedOrders[name] || 0) + 1;
    localStorage.setItem('orders', JSON.stringify(savedOrders));
  }
}

function deleteItems(price, name) {
  let displayPrice = document.getElementById('displayPrice');
  let savedOrders = JSON.parse(localStorage.getItem('orders')) || {};
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
  if (savedOrders[name] == 0) {
    delete savedOrders[name];
    localStorage.setItem('orders', JSON.stringify(savedOrders));
  }

  // Remove key orders 
  if (Object.keys(savedOrders).length === 0) {
    localStorage.removeItem('orders');
  }
}

function showCart() {
  let cart = document.querySelector('.cart');
  let cartBox = document.getElementById('cartBox');
  cart.classList.remove('hidden');
  cart.classList.add('flex');

  cartBox.innerHTML = '';

  let cartContentWrapper = document.createElement('div');
  cartContentWrapper.style.width = "100%";
  cartContentWrapper.style.height = "100%";
  cartContentWrapper.style.overflowY = "auto";
  cartContentWrapper.className = "relative";

  let cartContent = document.createElement('div');
  cartContent.style.paddingBottom = "80px";
  cartContent.className = "relative";

  let orders = JSON.parse(localStorage.getItem('orders')) || {};
  const data = JSON.parse(localStorage.getItem('data'));

  let totalPrice = 0;

  for (let itemName in orders) {
    if (orders.hasOwnProperty(itemName)) {
      let item = data.foods.find(d => d.name === itemName) || data.drinks.find(d => d.name === itemName) || data.snacks.find(d => d.name === itemName);
      if (item) {
        let orderItem = document.createElement('div');
        orderItem.className = "flex w-full flex-col items-start justify-starts p-4";

        let itemTotalPrice = item.price * orders[itemName];
        totalPrice += itemTotalPrice;

        orderItem.innerHTML = `
          <div class="flex gap-x-2 w-full border-b border-gray-700 pb-4">
            <img src="${item.image}" class="object-cover h-32 w-32 rounded">
            <div class="flex flex-col justify-center">
              <div class="font-semibold text-xl">${item.name}</div>
              <div class="text-red-700">${item.price}</div>
            </div>
            <div class="mr-0 ml-auto font-semibold">${orders[itemName]}x</div>
          </div>
        `;

        cartContent.appendChild(orderItem);
      }
    }
  }

  cartContentWrapper.appendChild(cartContent);

  function alertBuy() {
    alert('berhasil membuat pesanan')
  }

  let totalDisplay = document.createElement('div');
  totalDisplay.className = "flex flex-col w-full items-center justify-end gap-2 p-4 bg-white border-t border-gray-700 rounded-t-xl";
  totalDisplay.style.position = "sticky";
  totalDisplay.style.bottom = "0";
  totalDisplay.style.background = "white";
  totalDisplay.innerHTML = `
    <div class="flex justify-start w-full">
      <div>Total: Rp. ${totalPrice}</div>
    </div>
    <button id="bayarPesanan" class="flex w-full border border-gray-700 rounded p-2 items-center justify-center bg-red-900 text-white hover:bg-white hover:text-red-900"> Place Order </button>
  `;
  cartContentWrapper.appendChild(totalDisplay);

  cartBox.appendChild(cartContentWrapper);

  document.getElementById('bayarPesanan').addEventListener('click', () => {
    alert('pesanan telah dibuat')
    localStorage.removeItem('total')
    localStorage.removeItem('orders')
    cart.classList.add('hidden')
    cart.classList.remove('flex')
    window.location.reload()
  });

  document.addEventListener('click', (event) => {
    if (!cartBox.contains(event.target) && !buyOrder.contains(event.target) && !event.target.closest('.orderButton')) {
      cart.classList.add('hidden');
      cart.classList.remove('flex');
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('./data/data.json');
  const data = await response.json();
  localStorage.setItem('data', JSON.stringify(data));
  displayItems('foods');
});
