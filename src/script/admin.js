const orderListAdmin = document.getElementById('orderListAdmin');

let customerList = localStorage.getItem('customerList');
let orderList = localStorage.getItem('orderList').replace(/[{"}]/g, '');
let totalList = localStorage.getItem('totalList');

// Split the order list into individual items
let orderItems = orderList.split(',');

// Create order data object
const orderData = [
    {
        name: customerList,
        order: orderItems,
        total: totalList
    }
]

orderListAdmin.innerHTML = orderData.map(order => 
`
<div class="flex items-center w-full rounded border shadow px-3 justify-between sm:justify-around">
    <div id="usernameList" class="h-full flex items-center justify-center p-4">
        ${order.name}
    </div>
    <div id="orderList" class="h-full flex flex-col items-start justify-center p-4">
        <ul>
            ${order.order.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </div>
    <div id="totalList" class="h-full flex items-center justify-center p-4">
        Rp ${order.total}
    </div>
    <div id="statusList" class="h-full flex items-center justify-center p-4">
        Pending
    </div>
</div>
`
).join('');
