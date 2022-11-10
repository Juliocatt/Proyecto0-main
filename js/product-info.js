let informacion = PRODUCT_INFO_URL + localStorage.getItem('ID') + EXT_TYPE;
let comentarios = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('ID') + EXT_TYPE;
let info = [];
let coments = [];
let comentariosNuevos = [];
let arrayLocalNewProduct = [];



document.addEventListener('DOMContentLoaded', () => {

    getJSONData(informacion).then((resultObj) => {
        if (resultObj.status === "ok") {
            info = resultObj.data;
            mostrarInfo(info);
            mostrarRelacionados(info);
        }
    })
    getJSONData(comentarios).then((resultObj) => {
        if (resultObj.status === "ok") {
            coments = resultObj.data;
            mostrarComentarios(coments);
        }
    })

    comprobrar();
   

    if (localStorage.carrito != null){
        arrayLocalNewProduct = JSON.parse(localStorage.getItem('carrito'));
    }

})
//funcion que muestra la información de los productos y carrousel de fotos
function mostrarInfo(info) {
    let contenido = "";

    contenido += `
<div class="row">
    <div  class="col-lg-5 col-md-5">
        <br><h2 > ${info.name} </h2><hr>
        <div class="info">
            <h4> Precio</h4>
            <p class="mb-1" id="infoPrecio"> ${info.currency} ${info.cost}</p>
            <h4> Descripción</h4>
            <p class="mb-1"> ${info.description}</p>
            <h4> Categoría</h4>
            <p class="mb-1"> ${info.category}</p>
            <h4> Cantidad vendidos</h4>
            <p class="mb-1"> ${info.soldCount}</p><br>
            <input type="button" class="btn btn-outline-success" value="Agregar al Carrito" onclick="setInfo(info)" id="botonAddCart">  
            </div>
        
    </div>

    <div class="size col-lg-7 ">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${info.images[0]}" class="d-block w-100" alt="100">
                </div>
                <div class="carousel-item">
                    <img src="${info.images[1]}" class="d-block w-100" alt="100">
                </div>
                <div class="carousel-item">
                     <img src="${info.images[2]}" class="d-block w-100" alt="100">
                </div>
                <div class="carousel-item">
                    <img src="${info.images[3]}" class="d-block w-100" alt="100">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Previous</span>
         </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</div>
<hr>
`
    document.getElementById('infodeproductos').innerHTML = contenido
}
//funcion que carga comentarios
function mostrarComentarios(array) {
    let comentarios = "";

    for (let i = 0; i < array.length; i++) {
        coments = array[i];
        comentarios += `
        <div class="coments">
            <div>
                ${coments.user} ${coments.dateTime} <div id="score">${puntaje(coments.score)}</div>
                ${coments.description}

            </div>
        </div>`
    }
    document.getElementById('comentarios').innerHTML += comentarios;
}
//funcion que carga los relacionados 
function mostrarRelacionados(info) {
    let contenido = "";
    for (let i = 0; i < info.relatedProducts.length; i++) {
        relacionados = info.relatedProducts[i];

        contenido += `
  <div class="d-flex">
    <div class="card" onclick="setID(${relacionados.id})">
      <img src="${relacionados.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${relacionados.name}</h5>
      </div>
    </div>
`
    }
    document.getElementById('relacionados').innerHTML += contenido;
}
//funcion que guarda la informacion de los productos que agrego al carrito en el local storage
function setInfo(array) {
    let infoToCart = new Object();

    infoToCart.name = array.name;
    infoToCart.unitCost = array.cost;
    infoToCart.image = array.images[0];
    infoToCart.currency = array.currency;
    
    arrayLocalNewProduct = JSON.parse(localStorage.getItem("carrito"))
    arrayLocalNewProduct.push(infoToCart);
    localStorage.setItem("carrito", JSON.stringify(arrayLocalNewProduct));

     Swal.fire({
         title: 'Agregado al carrito con éxito',
         icon: 'question',
         iconHtml: '?',
         cancelButtonText: 'Continuar comprando',
         showCancelButton: true,
         showCloseButton: true,
         confirmButtonText: 'Ir al Carrito'
        }).then((result) => {
            if (result.isConfirmed) {
              window.location = "cart.html"
            }
        })
}
//Funcion que muestra estrellas con iconos
function puntaje(puntos) {
    var estrellas = '';
    for (let i = 1; i <= 5; i++) {

        if (i <= puntos) {
            estrellas += '<i class="fas fa-star amarelo" ></i>';
        } else {
            estrellas += '<i class="far fa-star"></i>';
        }
    }
    return estrellas
}

//Evento que agrega los nuevos comentarios
document.getElementById('sendComent').addEventListener('click', () => {
    let nuevoComentario = new Object();
    comentariosNuevos = [];

    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();

    nuevoComentario.description = document.getElementById('comentario').value;
    nuevoComentario.score = document.getElementById('puntuacion').value;
    nuevoComentario.user = sessionStorage.getItem('name').split('@')[0];
    nuevoComentario.dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second

    comentariosNuevos.push(nuevoComentario);

    mostrarComentarios(comentariosNuevos);
    document.getElementById('comentario').value = "";
});
//funcion que guarda el ID
function setID(id) {
    localStorage.setItem("ID", id);
    window.location = "product-info.html"
}

