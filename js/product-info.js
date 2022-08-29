addEventListener('DOMContentLoaded', ()=>{
    mostrarUsuario();
})

function mostrarUsuario(){

    let username = sessionStorage.getItem('name');

    document.getElementById('username').innerHTML = username;
};