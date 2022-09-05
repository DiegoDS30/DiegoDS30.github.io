document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

/* Comprueba si el usuario esta loggeado o no. */

let user = localStorage.getItem ('usuario');

if (user != '') {

    let mostrarUsuario = document.getElementById ('usuario');
    mostrarUsuario.innerHTML = `<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    <img src="/img/img_perfil.png" alt="" width="30" height="24"> ${localStorage.getItem("usuario")} 
    </a>
    <ul class="dropdown-menu">
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