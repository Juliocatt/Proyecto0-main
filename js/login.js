function enviar(){

let usuario = document.getElementById('usuario').value
let password = document.getElementById('password').value

if (usuario === "" || password === ""){
    document.getElementById('usuario').style.borderColor="red"
    document.getElementById('password').style.borderColor="red"
    document.getElementById('ingresar').style.borderColor="lightblue"
    document.getElementById('alertamail').innerHTML = `Ingresa tu e-mail`
    document.getElementById('alertacontra').innerHTML = `Ingresa tu contraseña`
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese E-mail y contraseña',
        footer: '<a href="">Why do I have this issue?</a>'
      })
} else{
    
    sessionStorage.setItem('name', usuario)
    
    window.location.href = "index.html"
};}

document.addEventListener("DOMContentLoaded", ()=> {

    document.getElementById('ingresar').addEventListener('click', ()=> {
        enviar()
    })

})