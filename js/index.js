document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

   comprobrar()

   mostrarUsuario()

});

function comprobrar(){

    let user = sessionStorage.name

    if( user  === undefined){
        
        Swal.fire({
            title: 'Usted no ha iniciado sesión',
            text: "Por favor, iniciar sesión para continuar",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Iniciar sesión.'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location = "login.html"
            }
          })
    };
    
}

document.getElementById('salir').addEventListener("click", ()=>{
    
  sessionStorage.clear()

  comprobrar()
});

function mostrarUsuario(){

    let username = sessionStorage.getItem('name');

    document.getElementById('username').innerHTML = username;
};