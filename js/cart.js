const UrlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let infoCart = {};
let agregarCarrito =[];

function mostrarInfoCart(array) {
  let cartInfo = "";
  for (let i = 0; i < array.length; i++) {
    info = array[i];
    cartInfo += ` 
        <tr>
        <td scope="col"><img src="${info.image}" class="sizecartimage"></td>
        <td scope="col">${info.name}</td>
        <td scope="col">${info.currency} ${info.unitCost}</td>
        <td scope="col"><input type="number" class="casilla sizesh" id="cantidadProd${i}" value="1" min="0" onchange="subtotal(agregarCarrito[${i}], ${i})" ></td>
        <th scope="col" id="costoProducto${i}">$${info.unitCost}</th>
      </tr>`;
  }
  document.getElementById("datosCarrito").innerHTML += cartInfo;
}

function subtotal(array, i) {
  let cantidadArt = document.getElementById("cantidadProd" + i).value;
  let costoArt = array.unitCost;

  costoFinal = cantidadArt * costoArt;

  document.getElementById('costoProducto' + i).innerHTML = "$" + costoFinal;
}

document.addEventListener("DOMContentLoaded", () => {
  comprobrar();
  mostrarUsuario();

  getJSONData(UrlCart).then((resultObj) => {
    if (resultObj.status === "ok") {
      infoCart = resultObj.data.articles[0];
      
      if (localStorage.carrito != null) {
        agregarCarrito = JSON.parse(localStorage.getItem('carrito'));
        agregarCarrito.push(infoCart);
        mostrarInfoCart(agregarCarrito);
      }else{
        agregarCarrito.push(infoCart);
        mostrarInfoCart(agregarCarrito);
      }
    }
  });
});
