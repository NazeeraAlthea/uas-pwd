// const password = document.getElementById('password');
// const password2 = document.getElementById('password2');
let passwordReveal = document.getElementById('passwordReveal');
let passwordNotReveal = document.getElementById('passwordNotReveal');

passwordReveal.classList.add('hidden')
passwordReveal2.classList.add('hidden')

function revealPassword() {

    if (password.type === "password") {
        password.type = "text"
    } else {
        password.type = "password"
    }
};

function revealPassword2() {
    if (password2.type === "password") {
        password2.type = "text"
    } else {
        password2.type = "password"
    }
}

passwordNotReveal.addEventListener('click', () => {
    passwordNotReveal.classList.add('hidden');
    passwordReveal.classList.remove('hidden')
})
passwordReveal.addEventListener('click', () => {
    passwordNotReveal.classList.remove('hidden');
    passwordReveal.classList.add('hidden');
})

passwordNotReveal2.addEventListener('click', () => {
    passwordNotReveal2.classList.add('hidden');
    passwordReveal2.classList.remove('hidden')
})
passwordReveal2.addEventListener('click', () => {
    passwordNotReveal2.classList.remove('hidden');
    passwordReveal2.classList.add('hidden');
})

// storage account


function setAccount() {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const password2 = document.getElementById('password2').value.trim();

    // ambil data array dari local storage atau buat array baru
    let account = JSON.parse(localStorage.getItem("account")) || [];

    // validasi input
    if (!username || !password) {
        alert('invalid');
        return;
    }

    if (password !== password2) {
        alert('password invalid')
        return;
    }

    // jika username sudah diambil
    const isUsernameExist = account.some(function(acc){
        return acc.username === username
    });
    
    if(isUsernameExist) {
        alert('username sudah dipakai')
        return;
    }

    // taruh data user ke array
    const data = {
        username : username,
        password  : password
    };
    account.push(data)

 
    // taro data array ke local
    const stringifyAccount = JSON.stringify(account)
    localStorage.setItem("account", stringifyAccount)

    console.table(account)
}

