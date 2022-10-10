let cartArticles = [];
let jsonArticles = [];
let localArticles = JSON.parse(localStorage.getItem('cartArts')) || [];
let total = 0;

let radios = document.querySelectorAll('input[name="envio"]');
let radioCheckeado = document.querySelector('input[name="envio"]:checked')

const dolar = 41; // Cotizacion al 10/22, hay una api gratis para esto pero limitada a solicitudes por mes, asi que toca hardcodear

/* Eventos que van a ser activados cuando el usuario cambie el valor de la cantidad y de los botones radio */
const change = new Event ('change', {
    bubbles: true,
    cancelable: false
});
const input = new Event ('input', {
    bubbles: true,
    cancelable: false
});

/* Agrega un evento de escucha a todos los radio, cuando el usuario presiona uno la funcion calcTotal se ejecuta */
for (let boton of radios) {
    boton.addEventListener ('change', calcTotal)
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = 'product-info.html'
}

document.addEventListener ('DOMContentLoaded', () => {

    getJSONData (CART_INFO_URL + 25801 + EXT_TYPE).then (function (resultObj) {
        if (resultObj.status === 'ok') {
            jsonArticles = resultObj.data.articles;
            cartArticles = jsonArticles.concat(localArticles);
            showCart ();
            calcTotal ();
            radioCheckeado.dispatchEvent(change);
        }
    })
});

function showCart () {

    let htmlContentToAppend = '';

    for (let i = 0; i < cartArticles.length; i++) {
        let product = cartArticles[i];

        htmlContentToAppend += `
            <div class="list-group-item cursor-active" id="${product.name} - ${product.id}">
                <div class="row align-items-center">
                    <div class="col-2">
                        <img src="${product.image}" alt=" " class="img-thumbnail">
                    </div>
                    <div class="col-3">
                        <a href="#" class="text-decoration-none" onclick="setProdID(${product.id})">${product.name}</a>
                    </div>
                    <div class="col-3">
                        <p class="mb-0">${product.currency} ${product.unitCost.toLocaleString()}</p>
                    </div>
                    <div class="col-2">
                        <span><i class="fa fa-lg fa-trash delete align-bottom" id="${product.name}" onclick="delArticle(this.id)"></i></span>
                        <div class="input-group input-group-sm float-end" style="width: 65%;">
                            <button class="btn btn-outline-secondary fa fa-minus checked" type="button" onclick="this.parentNode.querySelector('input').stepDown(); this.parentNode.querySelector('input').dispatchEvent(input);"></button>
                            <input type="number" class="form-control text-center" min="1" value="${product.count}" id="${product.id}" onInput="calcSubtotal(this.id, this.value);">
                            <button class="btn btn-outline-secondary fa fa-plus checked" type="button" onclick="this.parentNode.querySelector('input').stepUp(); this.parentNode.querySelector('input').dispatchEvent(input);"></button>
                        </div>
                    </div>
                    <div class="col text-end" id="subtotal-${product.id}">
                        <strong>${product.currency} ${(product.unitCost * product.count).toLocaleString()}</strong>
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById ('cart-list-container').innerHTML = htmlContentToAppend;

}

/**
 * Toma el id y el valor del articulo como parametro, para buscarlos en
 * cartArticles array, actualiza la cantidad del articulo y el subtotal,
 * y por ultimo activa los evento click y cambiar.
 * @param id - el id del articulo
 * @param valor - el valor del articulo
 */
function calcSubtotal (id, valor) {

    let inputT = document.getElementById(`${id}`);

    let articulo = cartArticles.find ((art) => art.id == id);
    let articuloIndex = cartArticles.findIndex((art) => art.id == id);

    articulo.count = valor;
    cartArticles[articuloIndex] = articulo;

    document.getElementById(`subtotal-${id}`).innerHTML = `<strong>${articulo.currency} ${(articulo.unitCost * articulo.count).toLocaleString()}</strong>`;

    inputT.dispatchEvent (new Event ('click'));
    radioCheckeado.dispatchEvent (change);

}

/**
 * calcula el total del carrito, si la moneda esta en dolares, la pasa a pesos.
 */
function calcTotal () {

    total = 0

    for (let i = 0; i < cartArticles.length; i++) {
        article = cartArticles[i];

        if (article.currency === 'USD') {
            total += (article.count * article.unitCost) * dolar
        } else {
            total += article.count * article.unitCost;
        }
    }

    document.getElementById('total').innerHTML = `Su total es de: <strong> UYU ${(Math.round(total * parseFloat(this.value))).toLocaleString()}</strong>`

}

/**
 * Borra el articulo del carrito y del localStorage
 * @param id - El id del articulo a borrar.
 */
function delArticle (id) {

    if (id == "Peugeot 208") {

        document.getElementById("alert").classList.add("show");

        setTimeout (() => {

            document.getElementById("alert").classList.remove("show");

        }, 4000)

    } else {

        let articuloDel = cartArticles.find ((art) => art.name == id);
        let articuloDelIndex = cartArticles.findIndex ((art) => art.name == id);
        let articuloDelIndexLocal = localArticles.findIndex ((art) => art.name == id);

        document.getElementById(`${articuloDel.name} - ${articuloDel.id}`).remove()

        cartArticles.splice(articuloDelIndex, 1);
        localArticles.splice(articuloDelIndexLocal, 1);

        localStorage.setItem('cartArts', JSON.stringify(localArticles));

        radioCheckeado.dispatchEvent (change);

    }

}