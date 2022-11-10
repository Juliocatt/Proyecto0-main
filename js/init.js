const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
function logOut(){
  sessionStorage.removeItem('name');
  if(localStorage.infoPerfil){
    localStorage.removeItem('infoPerfil');
  }
}

function comprobrar(){

  let usuario = sessionStorage.name 

  if( usuario  === undefined){
    htmlagregar=`
      <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Menu
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="login.html" >Iniciar sesión</a></li>
      </ul>
    </div>`
  document.getElementById('username').innerHTML = htmlagregar;

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
  }else{

    let email = sessionStorage.getItem('name');
    htmlagregar=`
      <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        ${sessionStorage.getItem('name').split('@')[0]}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
        <li><a class="dropdown-item" onclick="logOut(),comprobrar()" >Cerrar sesión</a></li>
      </ul>
    </div>`

  document.getElementById('username').innerHTML = htmlagregar;
  // document.getElementById('emailFoto').innerHTML= email;
  // document.getElementById('emailPerfil').value = email;
  } 
}



