const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

/* Comprueba si el usuario esta loggeado o no. */

let user = localStorage.getItem ('usuario');

if (user != '') {

    let mostrarUsuario = document.getElementById ('usuario');
    mostrarUsuario.innerHTML = `<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    <img src="/img/img_perfil.png" alt="" width="30" height="24"> ${localStorage.getItem("usuario")} 
    </a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" id="cart" href="./cart.html">Mi carrito</a></li>
      <li><a class="dropdown-item" id="profile" href="./my-profile.html">Mi perfil</a></li>
      <li><a class="dropdown-item" id="logout" href="./login.html">Salir</a></li>
    </ul>
    </li>
    `
}

if (user === null) {

    location.href='./login.html';

}


/* Elima el usuario del local storage. */

document.getElementById ('logout').addEventListener ('click', () => {

    localStorage.removeItem ('usuario');

})