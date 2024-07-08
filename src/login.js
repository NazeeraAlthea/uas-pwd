let password = document.getElementById('password');
let passwordReveal = document.getElementById('passwordReveal');
let passwordNotReveal = document.getElementById('passwordNotReveal');

passwordReveal.classList.add('hidden')

function revealPassword() {

    if (password.type === "password") {
        password.type = "text"
    } else {
        password.type = "password"
    }
};

passwordNotReveal.addEventListener('click', () => {
    passwordNotReveal.classList.add('hidden');
    passwordReveal.classList.remove('hidden')
})
passwordReveal.addEventListener('click', () => {
    passwordNotReveal.classList.remove('hidden');
    passwordReveal.classList.add('hidden');
})

function login() {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let account = JSON.parse(localStorage.getItem("account"));

    // userAccount mencari pengguna dari array account dan mencocokan apakah username sama dengan username yang didalam array
    let userAccount = account.find(function(acc){
        return acc.username === username
    })

    // userAccount yang sudah sama dengan input user dicocokan dengan mencari didalam array yaitu properti password
    if(userAccount && userAccount.password == password){
        alert('berhasil login')
    }
    
    window.location.href = 'index.html'
}