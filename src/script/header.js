const header = document.querySelector('header');
let userAccount = localStorage.getItem('username');

function initializeHeader() {
    header.innerHTML = `
        <div class="wrapper flex fixed justify-between items-center p-4 bg-red-950 w-full h-16 top-0 text-white z-30">
            <div class="logo">
                <img src="" alt="">
                <a class="text-white" href="">D'Kremes</a>
            </div>

            <i id="menuButton" class="ti ti-align-justified"></i>
            <div id="navbar" class="wrapper hidden flex-col bg-white fixed top-0 right-0 px-10 py-6 justify-center items-center text-red-950 m-4 shadow rounded gap-5">
                <i class="ti ti-x absolute right-0 top-0 p-4"></i>
                <a class="hover:underline" href="index.html">Home</a>
                <a class="hover:underline" href="orderFoods.html">Order</a>
                <a class="hover:underline" href="">Contact</a>
                <a href="login.html" class="bg-red-950 text-white px-6 py-2 rounded border border-red-950 hover:bg-white hover:text-red-950">Login</a>
            </div>
        </div>
    `;

    const menuButton = document.getElementById('menuButton');
    const navbar = document.getElementById('navbar');

    // Event listener sebelum login
    menuButton.addEventListener('click', (event) => {
        navbar.classList.toggle('hidden');
        navbar.classList.toggle('flex');
        event.stopPropagation();
    });

    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && !menuButton.contains(event.target)) {
            navbar.classList.add('hidden');
            navbar.classList.remove('flex');
        }
    });

    // Event listener untuk close button di dalam navbar
    const closeButton = navbar.querySelector('.ti-x');
    closeButton.addEventListener('click', () => {
        navbar.classList.add('hidden');
        navbar.classList.remove('flex');
    });
}

function initializeUserHeader() {
    header.innerHTML = `
        <div class="wrapper flex fixed justify-between items-center p-4 bg-red-950 w-full h-16 top-0 text-white z-30">
            <div class="logo">
                <img src="" alt="">
                <a class="text-white" href="">D'Kremes</a>
            </div>

            <div class="flex justify-center items-center">
                <svg id="userButton" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-circle">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                </svg>
                <i id="menuButtonAfter" class="ti ti-dots-vertical text-xl text-white ml-4"></i>
            </div>
            <div id="navbar" class="wrapper hidden flex-col bg-white text-red-950 m-4 shadow fixed top-0 right-0 px-10 py-6 justify-center items-center rounded gap-5 font-semibold transition-all duration-1000">
                <a class="hover:underline" href="index.html">Home</a>
                <a class="hover:underline" href="orderFoods.html">Order</a>
                <a class="hover:underline" href="">Contact</a>
                </div>
            <div id="userSetting" class="wrapper hidden items-center space-x-2 bg-white fixed top-0 right-0 px-6 py-4 m-2 shadow text-red-950 rounded ">
                <div class="flex gap-1">
                    <i class="userButton ti ti-user-circle text-3xl z-10 stroke-0"></i>
                    <div class="">${userAccount}</div>
                </div>
                <button class="border border-red-950 px-4 py-2 rounded mt-3" onclick="logout()">Logout</button>
            </div>
        </div>
    `;

    const userButton = document.getElementById('userButton');
    const userSetting = document.getElementById('userSetting');
    const navbar = document.getElementById('navbar');
    const menuButtonAfter = document.getElementById('menuButtonAfter');

    // Event listener setelah login
    menuButtonAfter.addEventListener('click', (event) => {
        navbar.classList.toggle('hidden');
        navbar.classList.toggle('flex');
        event.stopPropagation();
    });

    userButton.addEventListener('click', () => {
        userSetting.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && !menuButtonAfter.contains(event.target)) {
            navbar.classList.add('hidden');
            navbar.classList.remove('flex');
        }
    });

    document.addEventListener('click', (event) => {
        if (!userSetting.contains(event.target) && !userButton.contains(event.target)) {
            userSetting.classList.add('hidden');
            userSetting.classList.remove('flex');
        }
    });
}

// Fungsi logout
function logout() {
    localStorage.removeItem('username');
    location.reload();
}

// Inisialisasi header sesuai status login
if (localStorage.getItem('username')) {
    initializeUserHeader();
} else {
    initializeHeader();
}
