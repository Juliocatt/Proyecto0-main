let productos = [];


function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let products = array[i];
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


      document.addEventListener("DOMContentLoaded", ()=> {
         getJSONData(PRODUCTS_URL).then(function(resultObj){
             if (resultObj.status === "ok"){
                productos = resultObj.data.products;
                showCategoriesList(productos);
             }
         })
    });

