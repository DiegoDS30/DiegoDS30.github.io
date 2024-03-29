let cartArticles = [];
let jsonArticles = [];
let localArticles = JSON.parse(localStorage.getItem('cartArts')) || [];
let total = 0;
let envio = 0;
let msg = '';
let radios = document.querySelectorAll('input[name="envio"]');
let radioCheckeado = document.querySelector('input[name="envio"]:checked');
let pagoCC = document.getElementById ('radioPagoCC');
let pagoBank = document.getElementById ('radioPagoBanco');
let pagos = document.querySelectorAll('input[name="radioPago"]');

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
const click = new Event ('click', {
    bubbles: true,
    cancelable: false
});

/* Agrega un evento de escucha a todos los radio, cuando el usuario presiona uno la funcion calcTotal se ejecuta */
for (let boton of radios) {
    boton.addEventListener ('change', calcTotal)
}

/*for (let boton of pagos) {
    boton.addEventListener ('change', desactivar)
}*/

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

    getJSONData (CART_BUY_URL).then (function (resultObj) {
        if (resultObj.status === 'ok') {
            msg = resultObj.data.msg;
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

    // Busco el articulo que voy a actualizar
    let inputT = document.getElementById(`${id}`);
    radioCheckeado = document.querySelector('input[name="envio"]:checked')

    // Busco el articulo y su index en el arreglo
    let articulo = cartArticles.find ((art) => art.id == id);
    let articuloIndex = cartArticles.findIndex((art) => art.id == id);

    // Actualizo el articulo en el arreglo
    articulo.count = valor;
    cartArticles[articuloIndex] = articulo;

    document.getElementById(`subtotal-${id}`).innerHTML = `<strong>${articulo.currency} ${(articulo.unitCost * articulo.count).toLocaleString()}</strong>`;

    // Hago dispatch de los eventos para que sea en tiempo real
    inputT.dispatchEvent (click);
    radioCheckeado.dispatchEvent (change);

}

/**
 * calcula el total del carrito, si la moneda esta en pesos, la pasa a dolares.
 */
function calcTotal () {

    radioCheckeado = document.querySelector('input[name="envio"]:checked')
    total = 0;
    envio = 0;

    // Me aseguro que la moneda sea en dolares para sumarla al total

    for (let i = 0; i < cartArticles.length; i++) {
        article = cartArticles[i];

        if (article.currency !== 'USD') {
            total += (article.count * article.unitCost) * dolar
        } else {
            total += article.count * article.unitCost; 
        }
    
    }

    // Calculo el envio, dependiendo de cual radio este seleccionado

    envio = total * parseFloat(this.value);

    document.getElementById('subtotal').innerHTML = `USD ${(Math.round(total)).toLocaleString()}`
    document.getElementById('envioCosto').innerHTML = `USD ${(Math.round(envio)).toLocaleString()}`
    document.getElementById('total').innerHTML = `USD ${(Math.round(total + envio)).toLocaleString()}`

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

        // Busco el articulo y su index en los arreglo

        let articuloDel = cartArticles.find ((art) => art.name == id);
        let articuloDelIndex = cartArticles.findIndex ((art) => art.name == id);
        let articuloDelIndexLocal = localArticles.findIndex ((art) => art.name == id);

        // Los borro del DOM

        document.getElementById(`${articuloDel.name} - ${articuloDel.id}`).remove()

        // Los borro de los arreglos

        cartArticles.splice(articuloDelIndex, 1);
        localArticles.splice(articuloDelIndexLocal, 1);

        // Y actualizo el arreglo del localStorage

        localStorage.setItem('cartArts', JSON.stringify(localArticles));

        // Actualizo el precio

        radioCheckeado.dispatchEvent (change);

    }

}

let ccNro = document.getElementById ('ccNro');
let ccSeg = document.getElementById ('ccSeg');
let ccDate = document.getElementById ('ccDate');
let pagosField = document.getElementById ('pagos-field')
let bankAcc = document.getElementById ('bankAcc');

let metodoDePago = document.getElementById('invalido');
let seleccionarMetodo = document.getElementById('seleccionar-metodo');

// eventos que al hacer click activan los campos correspondientes de la forma de pago

pagoCC.addEventListener ('change', () => {
    
    pagosField.disabled = false;

    bankAcc.disabled = true;

    document.getElementById ('metodo').innerHTML = 'Tarjeta de credito'

});

pagoBank.addEventListener ('change', () => {
    
    pagosField.disabled = true;

    bankAcc.disabled = false;

    document.getElementById ('metodo').innerHTML = 'Transferencia bancaria'

});

document.getElementById('modal').addEventListener ('click', () => {

    if (bankAcc.checkValidity() && (ccNro.checkValidity() && ccSeg.checkValidity() && ccDate.checkValidity())) {

        seleccionarMetodo.style.color = 'rgb(25, 135, 84)';
        metodoDePago.style.display = 'none';
                
    } else {

        seleccionarMetodo.style.color = 'rgb(220, 53, 69)';
        metodoDePago.style.display = 'block';

    }

});

(function () {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            if (!pagoBank.checked && !pagoCC.checked) {

                seleccionarMetodo.style.color = 'rgb(220, 53, 69)';
                metodoDePago.style.display = 'block';

            }
          }

          form.classList.add('was-validated')

          if (form.checkValidity()) {

            document.getElementById("exito").innerHTML = msg
            document.getElementById("compra-hecha").classList.add("show");

            setTimeout (() => {

            document.getElementById("compra-hecha").classList.remove("show");

            }, 4000)

          }

        }, false)
      })

    

    })();