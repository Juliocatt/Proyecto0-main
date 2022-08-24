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

});

function comprobrar(){

    let user = sessionStorage.name

    if( user  === undefined){
        
       window.location = "login.html"
    } else {

        let username = sessionStorage.getItem('name');

        document.getElementById('username').innerHTML = username;

    }
    
}

document.getElementById('salir').addEventListener("click", ()=>{
    
  sessionStorage.clear()

  comprobrar()
})

