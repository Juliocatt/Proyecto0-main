let productos = [];
let links = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE;
const ordenAscNombre = "AZ";
const ordenDesNombre = "ZA";
const ordenVendidos = "Cant.";
let criterioOrdenar = undefined;
let minCost = undefined;
let maxCost = undefined;

function ordenarProductos(criteria, array){
    let result = [];
    if (criteria === ordenAscNombre)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ordenDesNombre){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ordenVendidos){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function ordenaryMostrar(sortCriteria, products){
    criterioOrdenar = sortCriteria;

    if(productos != undefined){
        currentCategoriesArray = products;
    }

    productos = ordenarProductos(criterioOrdenar, productos);

    mostrarDatos(productos);
}

function mostrarDatos(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < productos.length; i++){
        let products = productos[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
    ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){

            htmlContentToAppend += `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
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


      document.addEventListener("DOMContentLoaded", ()=> {
         getJSONData(links).then(function(resultObj){
             if (resultObj.status === "ok"){
                productos = resultObj.data.products;
                mostrarDatos(productos);
                    document.getElementById('tittle').innerHTML = `Veras aqui todos los productos de la categoría `+ resultObj.data.catName
                    
                    let username = sessionStorage.getItem('name');
                    document.getElementById('username').innerHTML = username;
             }
         })
         document.getElementById("arregloas").addEventListener("click", ()=>{
            ordenaryMostrar(ordenAscNombre); 
        });
        document.getElementById("arreglodes").addEventListener("click", ()=>{
            ordenaryMostrar(ordenDesNombre);
        });
        document.getElementById("ordenprecio").addEventListener("click", ()=>{
            ordenaryMostrar(ordenVendidos);
        });
        document.getElementById("limpiarfiltro").addEventListener("click", ()=>{
            document.getElementById("rangodepreciomin").value = "";
            document.getElementById("rangodepreciomax").value = "";
    
            minCost = undefined;
            maxCost = undefined;
    
            mostrarDatos();
        });
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

            mostrarDatos();
        });

        document.getElementById('buscador').addEventListener('keyup', ()=>{

            buscar(productos);
           
        })
       
      });

      

      function buscar(productos){   
        
        let busqueda = document.getElementById('buscador').value;
       
        let filtrado = productos.filter(producto => {
        return producto.name.toLowerCase().indexOf(busqueda.toLowerCase()) > -1;

       })
       
       mostrarDatos(filtrado);
    }   

    