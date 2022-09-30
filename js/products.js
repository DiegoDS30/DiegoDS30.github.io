const ORDER_ASC_BY_NAME = "AZ"; // Orden ascendente 
const ORDER_DESC_BY_NAME = "ZA"; // Orden descendente 
const ORDER_BY_PROD_COUNT = "Cant."; // Orden cantidad vendida 
const ORDER_BY_PROD_COST_DOWN = "Menor"; // Orden menos precio 
const ORDER_BY_PROD_COST_UP = "Mayor"; // Orden mas precio 
let currentProductsArray = [];
let currentProductsArrayCat = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

/**
 * Toma dos parametros, el primero la criteria para filtrar, la segunda es el array
 * a filtrar. Devuelve el array filtrado, en este caso se aplicaria a los productos.
 * @param criteria - La criteria para filtrar.
 * @param array - El array a filtrar.
 * @returns El resultado de sort.
 */

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COST_DOWN) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COST_UP) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount < bCount) { return -1; }
            if (aCount > bCount) { return 1; }
            return 0;
        })
    }

    return result;
}

/**
 * Ordena el array de productos y luego muestra la lista.
 * @param sortCriteria - La criteria para ordenar los productos.
 * @param productsArray - El array de productos a ordenar.
 */

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;
  
    if (productsArray != undefined) {
      currentProductsArray = productsArray;
    }
  
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
  
    showProductsList();
}

/**
 * Ordena currentProductsArray en orden ascendente en funcion al costo de la propiedad
 * de cada objeto en el array.
 * @returns currentProductsArray ordenado por costo.
 */
function ordenarAscendente(){
    currentProductsArray = currentProductsArray.sort(function(a, b){return a.cost - b.cost})
}

/**
 * Ordena currentProductsArray en orden descendente en funcion al costo de la propiedad
 * de cada objeto en el array.
 * @returns currentProductsArray ordenado por costo.
 */

function ordenarDescendente(){
    currentProductsArray = currentProductsArray.sort(function(a, b){return b.cost - a.cost})
}


function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

/**
 * Muestra la lista de los productos.
 */
function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {

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
    }

    document.getElementById("prod_category").innerHTML = currentProductsArrayCat.catName;
    document.getElementById("prod_category_p").innerHTML = "Verás aquí todos los productos de la categoría " + currentProductsArrayCat.catName;    
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    /* Consigue los datos del archivo JSON y los guarda en las variables currentProductsArray y
    currentProductsArrayCat. */

    getJSONData(PRODUCTS_URL + localStorage.catID + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            currentProductsArrayCat = resultObj.data
            showProductsList()
        
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
      });
    
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });
    
    document.getElementById("sortByCostDown").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COST_DOWN);
    });
    
    document.getElementById("sortByCostUp").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COST_UP);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    
    minCount = undefined;
    maxCount = undefined;
    
        showProductsList();
    });
    
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;
    
    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
        minCount = parseInt(minCount);
    }
    else {
        minCount = undefined;
    }
    
    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
        maxCount = parseInt(maxCount);
    }
    else {
        maxCount = undefined;
    }
    
        showProductsList();
    
    });

});



/**
 * Desafiate 2
 * 
 * Toma el input del usuario, limpia la lista de productos e itera currentProductsArray,
 * fijandose si el input esta incluido en el nombre del producto. Si lo esta lo agrega a la lista
 * @param query - El input del usuario.
 */

let buscador = document.getElementById ('searchBar')

function searchProducts (query) {

    let lista = document.getElementById ('prod-list-container')
    lista.innerHTML = "";

    currentProductsArray.map ((prod) => {

        query.split(" ").map ((word) => {

            if (prod.name.toLowerCase().includes(word.toLowerCase ())) {

                lista.innerHTML += `
                <div onclick="setProdID(${prod.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${prod.image}" alt="${prod.description}" class="img-thumbnail">
                        </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${prod.name} - ${prod.currency} ${prod.cost}</h4>
                            <small class="text-muted">${prod.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${prod.description}</p>
                        </div>
                    </div>
                </div>
                `
            }
        })
    })
}