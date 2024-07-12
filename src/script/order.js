export async function displayItems(type) {
  const response = await fetch('./data/data.json');
  const data = await response.json();

  const container = document.querySelector('.container');
  container.innerHTML = '';  

  data[type].map(e => {
    let card = document.createElement('div');

    card.innerHTML = `
    <div class="flex flex-col border shadow rounded h-72 relative">
      <img class="object-cover" src="assets/pngtree-illustration-of-delicious-spicy-mortar-geprek-chicken-png-image_6564528 2.png" alt="">
      <div class="flex flex-col items-center">
        <div class="font-semibold text-lg">${e.name}</div>
        <div class="text-red-700 font-bold">${e.price}</div>
      </div>

      <button class="orderButton bg-white text-red-950 border border-red-950 hover:bg-red-950 hover:text-white p-1 rounded absolute bottom-0 left-1/2 -translate-x-1/2 mb-4 w-10/12 font-semibold">Order</button>

      <div class="displayProductOrder hidden items-center justify-center gap-4 absolute bottom-0 left-1/2 -translate-x-1/2 mb-4">
        <button class="reduceOrder flex border px-2 py-1 rounded border-black">-</button>
        <span class="totalOrder">1</span>
        <button class="addOrder flex border px-2 py-1 rounded border-black">+</button>
      </div>
    </div>
    `;
    
    container.appendChild(card);

    let buyOrder = document.getElementById('buyOrder')
    let orderButton = card.querySelector('.orderButton')
    let displayProductOrder = card.querySelector('.displayProductOrder')
    let totalOrder = card.querySelector('.totalOrder')
    let addOrder = card.querySelector('.addOrder')
    let reduceOrder = card.querySelector('.reduceOrder')

    orderButton.addEventListener('click', () => {
      orderItems(e.price)
      buyOrder.classList.remove('hidden')
      displayProductOrder.classList.remove('hidden')
      displayProductOrder.classList.add('flex')
      orderButton.classList.add('hidden')
    })

    addOrder.addEventListener('click', () => {
      orderItems(e.price)
      let x = parseInt(totalOrder.innerHTML) 
      x++
      totalOrder.innerHTML = x
    });

    reduceOrder.addEventListener('click', () => {
      deleteItems(e.price)
      let x = parseInt(totalOrder.innerHTML) 
      x--
      totalOrder.innerHTML = x
    });

    if(totalOrder.innerHTML == 0 ) {
      displayProductOrder.classList.add('hidden')
      alert(totalOrder.innerHTML)
    }
  });

  function orderItems(price) {
    let displayPrice = document.getElementById('displayPrice')
    if (displayPrice) {
      let currentPrice = parseFloat(displayPrice.innerText.replace(/[^0-9.-]+/g,"")) || 0;
      let newPrice = parseFloat(price);
      displayPrice.innerText = `Rp ${currentPrice + newPrice}`;
      localStorage.setItem("total price", displayPrice.innerText)
    }
  }

  function deleteItems(price) {
    let displayPrice = document.getElementById('displayPrice')
    if(displayPrice) {
      let currentPrice = parseFloat(displayPrice.innerText.replace(/[^0-9.-]+/g,""));
      let newPrice = parseFloat(price);
      displayPrice.innerText = `Rp ${currentPrice - newPrice}`;
    }
  }
} 
