let currentProductsArray = [];

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.products.length; i++){
        let products = currentProductsArray.products[i];

        htmlContentToAppend += `
        <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                        <small class="text-muted">${products.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${products.description}</p>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("prod_category").innerHTML = currentProductsArray.catName;
    document.getElementById("prod_category_p").innerHTML = "Verás aquí todos los productos de la categoría " + currentProductsArray.catName;    
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(PRODUCTS_URL + localStorage.catID + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data
            showProductsList()
        
        }
    });
});
