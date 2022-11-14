const UrlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let infoCart = {};
let agregarCarrito =[];

let porcentajeEnvio = document.getElementsByName('tipoEnvio');
let borrando = document.getElementsByClassName('borra');



function mostrarInfoCart(array) {
  let cartInfo = "";
  for (let i = 0; i < array.length; i++) {
    info = array[i];
    if (info.currency == "UYU"){
      info.unitCost = Math.round(info.unitCost /40);
      info.currency = "USD"
    }

    cartInfo += ` 
        <tr>
          <td scope="col"><img src="${info.image}" class="sizecartimage"></td>
          <td scope="col">${info.name}</td>
          <td scope="col"><span class="moneda">${info.currency}</span> <span class="costo">${info.unitCost}</span></td>
          <td scope="col" class="col-lg-2 col-md-3"><input type="number" class="form-control" id="cantidadProd${i}" value="1" min="1" onchange="subtotal(agregarCarrito[${i}], ${i}),calculoSubTotal()" ></td>
          <td scope="col"><span>USD </span> <span id="costoProducto${i}" class="precios">${info.unitCost}</span></td>
          <td scope="col"><button class="borra"><i class="fas fa-trash"></i></button></td>
        </tr>`;
  }
  document.getElementById("datosCarrito").innerHTML = cartInfo;

  for (let i=0; i< borrando.length; i++){
    borrando[i].addEventListener('click',()=>{
        eliminar(i);
    })
}
  
}
//Funcion que permite eliminar del carrito

function eliminar(i){

  agregarCarrito.splice(i,1);
  localStorage.setItem('carrito', JSON.stringify(agregarCarrito));
  mostrarInfoCart(JSON.parse(localStorage.getItem('carrito')));
  calculoSubTotal();
}

//Funcion que calcula totales y envio

function calculoSubTotal(){
   let dato =  document.getElementsByClassName('precios');
  
    let valor =0;
    for (let i=0; i < dato.length; i++){
      valor+= parseFloat(dato[i].innerHTML);
    }
    document.getElementById('costoTotalCarrito').innerHTML = valor;

    let valorEnvio = 0;
    for (let a=0; a < porcentajeEnvio.length; a++){
      if (porcentajeEnvio[a].checked){
        valorEnvio = parseFloat(porcentajeEnvio[a].value) * valor
      }
    }
    document.getElementById('soloEnvio').innerHTML = Math.round(valorEnvio);

    let costoTotal = parseFloat(document.getElementById('costoTotalCarrito').innerHTML);
    let costoEnvio = parseFloat(document.getElementById('soloEnvio').innerHTML);

    calculoTotal = costoEnvio + costoTotal;

    document.getElementById('carritoMasEnvio').innerHTML = calculoTotal;
}

function subtotal(array, i) {
  let cantidadArt = document.getElementById("cantidadProd" + i).value;
  let costoArt = array.unitCost;

  costoFinal = cantidadArt * costoArt;

  document.getElementById('costoProducto' + i).innerHTML =  costoFinal;
}

(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }else {
          event.preventDefault()
          event.stopPropagation()
          Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: '!Has comprado con exito!',
              showConfirmButton: false,
              timer: 3000
            })
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

//Función que desabilita y habilita metodos de pago de la modal

function ableDisable(){
  let tarjeta = document.getElementById('acordionTarj');
  let transferencia = document.getElementById('acordionTrans');
  
  if (tarjeta.checked === true){
    document.getElementById('valModal4').disabled =true;
    document.getElementById('valModal1').disabled=false;
    document.getElementById('valModal2').disabled=false;
    document.getElementById('valModal3').disabled=false;
    document.getElementById('titleModal').innerHTML = tarjeta.value;

  } else if (transferencia.checked === true){
    document.getElementById('valModal1').disabled=true;
    document.getElementById('valModal2').disabled=true;
    document.getElementById('valModal3').disabled=true;
    document.getElementById('valModal4').disabled =false;
    document.getElementById('titleModal').innerHTML = transferencia.value;

  }
}



document.addEventListener("DOMContentLoaded", () => {
  comprobrar();
  

  getJSONData(UrlCart).then((resultObj) => {
    if (resultObj.status === "ok") {
      infoCart = resultObj.data.articles[0];
      
      if (localStorage.carrito != null) {
        agregarCarrito = JSON.parse(localStorage.getItem('carrito'));
         //agregarCarrito.push(infoCart);
        mostrarInfoCart(agregarCarrito);
        calculoSubTotal()
      }else{
       // agregarCarrito.push(infoCart);
        mostrarInfoCart(agregarCarrito);
        calculoSubTotal()
      }
    }
  })
  for (let i=0; i< porcentajeEnvio.length; i++){
    porcentajeEnvio[i].addEventListener('click',()=>{
        calculoSubTotal();
    })
 }

 //Cambio de metodo de pago en la modal

document.getElementById('acordionTrans').addEventListener('click', ()=>{
  ableDisable();
})
document.getElementById('acordionTarj').addEventListener('click', ()=>{
  ableDisable();
})

//Boton guardar modal

let modalPago = document.getElementById('formModal');
let boton = document.getElementById('btnModal');

boton.addEventListener('click',(e)=>{
if (modalPago.checkValidity(e)){
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('infoPago').value = document.getElementById('titleModal').innerHTML;
    document.getElementById('infoPago').disabled = true;
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Forma de pago aprobada', 
        text: 'Tocar cerrar para continuar',
        showConfirmButton: false,
        timer: 1500

      })
    }
})

//Boton finalizar compra

document.getElementById('btnFinalizar').addEventListener('submit',(e)=>{
  e.preventDefault();
  e.stopPropagation();
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Compra realizada con éxito', 
    showConfirmButton: false,
    timer: 1500

  })
})

})
