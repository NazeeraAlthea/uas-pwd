export async function displayItems(type) {
  const response = await fetch('./data/data.json');
  const data = await response.json();

  const container = document.querySelector('.container');
  container.innerHTML = '';  

  data[type].map(e => {
    let card = document.createElement('div');

    card.innerHTML = `
    <div class="flex flex-col border shadow rounded w-60">
      <img class="w-60 h-40 object-cover p-2" src="assets/pngtree-illustration-of-delicious-spicy-mortar-geprek-chicken-png-image_6564528 2.png" alt="">
      <div class="flex flex-col items-center">
        <div class="font-semibold text-lg">${e.name}</div>
        <div class="text-red-700 font-bold">${e.price}</div>
      </div>

      <button class="orderButton bg-red-900 text-white p-1 m-2 rounded">Order</button>
    </div>
    `;
    
    container.appendChild(card);

    let orderButton = card.querySelector('.orderButton')
    orderButton.addEventListener('click', () => orderItems(e.price));
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
} 
