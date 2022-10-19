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
let showUser = /^([^]+)@(.+)$/.exec(user);

if (user === null || showUser === null) {

  location.href='./login.html';

}


if (user != '' || showUser != '') {

    let mostrarUsuario = document.getElementById ('usuario');
    mostrarUsuario.innerHTML = `
    <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${showUser[1]} 
    </a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" id="profile" href="./my-profile.html"><span><i class="fa fa-user fa-fw"></i></span> Mi perfil</a></li>
      <li><a class="dropdown-item" id="cart" href="./cart.html"><span><i class="fa fa-shopping-cart fa-fw"></i></span> Mi carrito</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" id="logout" href="./login.html"><span><i class="fa fa-sign-out-alt fa-fw"></i></span> Cerrar Sesión</a></li>
    </ul>
    </li>
    `
}

/* Elima el usuario del local storage. */

document.getElementById ('logout').addEventListener ('click', () => {

    localStorage.removeItem ('usuario');

})