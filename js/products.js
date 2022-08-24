let productos = [];
let links = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE;
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

function ordenarProductos(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
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
    currentSortCriteria = sortCriteria;

    if(productos != undefined){
        currentCategoriesArray = products;
    }

    productos = ordenarProductos(currentSortCriteria, productos);

    mostrarDatos(productos);
}

function mostrarDatos(){

    

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
            ordenaryMostrar(ORDER_ASC_BY_NAME); 
        });
        document.getElementById("arreglodes").addEventListener("click", ()=>{
            ordenaryMostrar(ORDER_DESC_BY_NAME);
        });
        document.getElementById("ordenprecio").addEventListener("click", ()=>{
            ordenaryMostrar(ORDER_BY_PROD_COUNT);
        });
        document.getElementById("limpiarfiltro").addEventListener("click", ()=>{
            document.getElementById("rangodepreciomin").value = "";
            document.getElementById("rangodepreciomax").value = "";
    
            minCount = undefined;
            maxCount = undefined;
    
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
    });