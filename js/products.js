let productos = [];
let links = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE;
const ordenAscPrecio = "menor a mayor ";
const ordenDesPrecio = "mayor a menor";
const ordenVendidos = "Cant.";
let criterioOrdenar = undefined;
let minCost = undefined;
let maxCost = undefined;

function ordenarProductos(criteria, array){
    let result = [];
    if (criteria === ordenAscPrecio)
    {
        result = array.sort((a, b)=> {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ordenDesPrecio){
        result = array.sort((a, b)=> {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ordenVendidos){
        result = array.sort((a, b)=> {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function ordenaryMostrar(sortCriteria){
    criterioOrdenar = sortCriteria;
    productos = ordenarProductos(criterioOrdenar, productos);
    mostrarDatos(productos);
}
//funcion que muestra datos de los productos
function mostrarDatos(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let products = array[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
    ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){

            htmlContentToAppend += `
            <div onclick="setID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted"> ${products.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
            document.getElementById("prueba").innerHTML = htmlContentToAppend;
        }
    }
};

function setID(id) {
    localStorage.setItem("ID", id);
    window.location = "product-info.html"
}

      document.addEventListener("DOMContentLoaded", ()=> {
         getJSONData(links).then(function(resultObj){
             if (resultObj.status === "ok"){
                productos = resultObj.data.products;
                mostrarDatos(productos);
                    document.getElementById('tittle').innerHTML = `Veras aqui todos los productos de la categoría `+ resultObj.data.catName
                    
             }
         })
         document.getElementById("arregloas").addEventListener("click", ()=>{
            ordenaryMostrar(ordenAscPrecio); 
        });
        document.getElementById("arreglodes").addEventListener("click", ()=>{
            ordenaryMostrar(ordenDesPrecio);
        });
        document.getElementById("ordenprecio").addEventListener("click", ()=>{
            ordenaryMostrar(ordenVendidos);
        });
        document.getElementById("limpiarfiltro").addEventListener("click", ()=>{
            document.getElementById("rangodepreciomin").value = "";
            document.getElementById("rangodepreciomax").value = "";
    
            minCost = undefined;
            maxCost = undefined;
    
            mostrarDatos(productos);
        });

        comprobrar();
        

        //filtros entre precios
        document.getElementById("filtrar").addEventListener("click", ()=>{
            
            minCost = document.getElementById("rangodepreciomin").value;
            maxCost = document.getElementById("rangodepreciomax").value;
    
            if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
                minCost = parseInt(minCost);
            }
            else{
                minCost = undefined;
            }
    
            if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
                maxCost = parseInt(maxCost);
            }
            else{
                maxCost = undefined;
            }

            mostrarDatos(productos);
        });
        //disparador para buscar productos
        document.getElementById('buscador').addEventListener('keyup', ()=>{
            buscar(productos); 
        })
       
      });

      
      //funcion con input que busca productos
      function buscar(productos){   
        let busqueda = document.getElementById('buscador').value;
       
        let filtrado = productos.filter(producto => {
        return (producto.name.toLowerCase().indexOf(busqueda.toLowerCase()) > -1 )
        || (producto.description.toLowerCase().indexOf(busqueda.toLowerCase()) > -1);
       })
       mostrarDatos(filtrado);
    }   

    