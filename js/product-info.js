let prodInfo = {};
let prodComments = {};

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

document.addEventListener ('DOMContentLoaded', () => {

    getJSONData (PRODUCT_INFO_URL + localStorage.prodID + EXT_TYPE).then (function (resultObj) {
        if (resultObj.status === 'ok') {
            prodInfo = resultObj.data;
            showProdInfo ();
        }
    })

    getJSONData (PRODUCT_INFO_COMMENTS_URL + localStorage.prodID + EXT_TYPE).then (function (resultObj) {
        if (resultObj.status === 'ok') {
            prodComments = resultObj.data;
            showProductComments();
        }
    })

})

/**
 * La funcion showProdInfo() es llamada cuando la pagina se carga y muestra la info de los productos
 */

function showProdInfo() {

    document.getElementById("prodInfoTitle").innerHTML = `${prodInfo.name}`;
    document.getElementById("prodInfoCost").innerHTML = `${prodInfo.currency} ${prodInfo.cost.toLocaleString()}`;
    document.getElementById("prodInfoDescription").innerHTML = `${prodInfo.description}`;
    document.getElementById("prodInfoCategory").innerHTML = `${prodInfo.category}`;
    document.getElementById("prodInfoSoldCount").innerHTML = `${prodInfo.soldCount} Vendidos`;
    
    showProdImg ();
    showProdRelated ();  

    /* 
        ***NO HACER CASO A ESTA PARTE***

    let sum = 0;

    for (let i = 0; i < prodComments.length; i++) {

        let prodScore = prodComments[i].score

        sum += prodScore;

    }

    let avg = sum / prodComments.length;

    <span class="fs-6">
    <i class="fa fa-star" id="star2-1"></i>
    <i class="fa fa-star" id="star2-2"></i>
    <i class="fa fa-star" id="star2-3"></i>
    <i class="fa fa-star" id="star2-4"></i>
    <i class="fa fa-star" id="star2-5"></i>
    </span>
    let star6 = document.getElementById("star2-1");
    let star7 = document.getElementById("star2-2");
    let star8 = document.getElementById("star2-3");
    let star9 = document.getElementById("star2-4");
    let star0 = document.getElementById("star2-5");

    if(avg >= 1) {
        star6.className += " checked";
    }
        
    if(avg >= 2) {
        star7.className += " checked";
    }
        
    if(avg >= 3) {
        star8.className += " checked";
    }
        
    if(avg >= 4) {
        star9.className += " checked";
    }
        
    if(avg >= 5) {
        star0.className += " checked";
    }  */

}

/**
 * Agarra la informacion de las imagenes del archivo JSON y las agrega al carrusel.
 * 
 * Desafiate 4
 */

function showProdImg () {

    let htmlContentToAppendIndicators ="";
    let htmlContentToAppendCarouselInner = "";
    
    
    let carouselIndi = document.getElementById("prodInfoCarouselImgIndicators");
    let carouselInner = document.getElementById("prodInfoCarouselInner");

    carouselIndi.innerHTML += `
    <button type="button" data-bs-target="#prodInfoCarouselImg" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`

    carouselInner.innerHTML += `
    <div class="carousel-item active">
        <img src="${prodInfo.images[0]}" class="d-block img-fluid border rounded" alt="30%">
    </div>`

    for(let i = 1; i < prodInfo.images.length; i++){
        let prodInfoImg = prodInfo.images[i];
        htmlContentToAppendIndicators = `
        <button type="button" data-bs-target="#prodInfoCarouselImg" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>`
    
        htmlContentToAppendCarouselInner = `
        <div class="carousel-item">
            <img src="${prodInfoImg}" class="d-block img-fluid border rounded" alt="30%">
        </div>`
    
        carouselIndi.innerHTML += htmlContentToAppendIndicators;
        carouselInner.innerHTML += htmlContentToAppendCarouselInner;
    
    }
}

function showProdRelated () {
    htmlContentToAppendRelatedProducts = "";

    for (let i = 0; i < prodInfo.relatedProducts.length; i++) {
        let product = prodInfo.relatedProducts [i];

        htmlContentToAppendRelatedProducts += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col">
                        <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                        <h4 class="mx-1 my-2">${product.name}</h4>
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById('prodRelated').innerHTML = htmlContentToAppendRelatedProducts;
}


function showProductComments(){
    htmlContentToAppendProductComments = "";

    /* Loop que va a ir agregando los comentarios al HTML. */

    for(let i = 0; i < prodComments.length; i++ ) {
        let productComment = prodComments[i];

        htmlContentToAppendProductComments += `
        <li class="list-group-item">
        <p><strong>${productComment.user}</strong> - <span class="float-end">
        <i class="fa fa-star" name="star-1"></i>
        <i class="fa fa-star" name="star-2"></i>
        <i class="fa fa-star" name="star-3"></i>
        <i class="fa fa-star" name="star-4"></i>
        <i class="fa fa-star" name="star-5"></i>
        </span></p>
        <p class="fst-italic ps-5">${productComment.description}</p>
        <small class="text-muted float-end">Publicado el ${new Date(productComment.dateTime).toLocaleString()}</small>
        </li>
        `

    }
  
    document.getElementById("prodComments").innerHTML += htmlContentToAppendProductComments;

    /* Agrega la clase "checked" a las estrellas que son igual o menor al puntaje del productos. */

    let star1 = document.getElementsByName("star-1");
    let star2 = document.getElementsByName("star-2");
    let star3 = document.getElementsByName("star-3");
    let star4 = document.getElementsByName("star-4");
    let star5 = document.getElementsByName("star-5");

    for(let i = 0; i < star1.length; i++){
        let productScore = prodComments[i].score;
        
        if(productScore >= 1) {
            star1[i].className += " checked";
        }
    }

    for(let i = 0; i < star2.length; i++){
        let productScore = prodComments[i].score;
        
        if(productScore >= 2) {
            star2[i].className += " checked";
        }
    }

    for(let i = 0; i < star3.length; i++){
        let productScore = prodComments[i].score;
        
        if(productScore >= 3) {
            star3[i].className += " checked";
        }
    }

    for(let i = 0; i < star4.length; i++){
        let productScore = prodComments[i].score;
        
        if(productScore >= 4) {
            star4[i].className += " checked";
        }
    }
    
    for(let i = 0; i < star5.length; i++){
        let productScore = prodComments[i].score;
        
        if(productScore >= 5) {
            star5[i].className += " checked";
        }
    }


}

/*
 * Desafiate 3
*/

function addComment () {

    let htmlContentToAppendComment = '';
    let comentario = document.getElementById ('comentario').value;
    let puntaje = document.getElementById ('cal').value;

   if (puntaje == 5) {
        htmlContentToAppendComment += `
        <div class="list-group-item">
        <p><strong>${showUser [1]}</strong> - <span class="float-end">
        <i class="fa fa-star checked" name="star-1"></i>
        <i class="fa fa-star checked" name="star-2"></i>
        <i class="fa fa-star checked" name="star-3"></i>
        <i class="fa fa-star checked" name="star-4"></i>
        <i class="fa fa-star checked" name="star-5"></i>
        </span></p>
        <p class="fst-italic ps-5">${comentario} </p>
        <small class="text-muted float-end">Publicado el ${new Date().toLocaleString()}</small>
        </div>
        `
    }

    if (puntaje == 4) {
        htmlContentToAppendComment += `
        <div class="list-group-item">
        <p><strong>${showUser [1]}</strong> - <span class="float-end">
        <i class="fa fa-star checked" name="star-1"></i>
        <i class="fa fa-star checked" name="star-2"></i>
        <i class="fa fa-star checked" name="star-3"></i>
        <i class="fa fa-star checked" name="star-4"></i>
        <i class="fa fa-star" name="star-5"></i>
        </span></p>
        <p class="fst-italic ps-5">${comentario} </p>
        <small class="text-muted float-end">Publicado el ${new Date().toLocaleString()}</small>
        </div>
        `
    }

    if (puntaje == 3) {
        htmlContentToAppendComment += `
        <div class="list-group-item">
        <p><strong>${showUser [1]}</strong> - <span class="float-end">
        <i class="fa fa-star checked" name="star-1"></i>
        <i class="fa fa-star checked" name="star-2"></i>
        <i class="fa fa-star checked" name="star-3"></i>
        <i class="fa fa-star" name="star-4"></i>
        <i class="fa fa-star" name="star-5"></i>
        </span></p>
        <p class="fst-italic ps-5">${comentario} </p>
        <small class="text-muted float-end">Publicado el ${new Date().toLocaleString()}</small>
        </div>
        `
    }

    if (puntaje == 2) {
        htmlContentToAppendComment += `
        <div class="list-group-item">
        <p><strong>${showUser [1]}</strong> - <span class="float-end">
        <i class="fa fa-star checked" name="star-1"></i>
        <i class="fa fa-star checked" name="star-2"></i>
        <i class="fa fa-star" name="star-3"></i>
        <i class="fa fa-star" name="star-4"></i>
        <i class="fa fa-star" name="star-5"></i>
        </span></p>
        <p class="fst-italic ps-5">${comentario} </p>
        <small class="text-muted float-end">Publicado el ${new Date().toLocaleString()}</small>
        </div>
        `
    }

    if (puntaje == 1) {
        htmlContentToAppendComment += `
        <div class="list-group-item">
        <p><strong>${showUser [1]}</strong> - <span class="float-end">
        <i class="fa fa-star checked" name="star-1"></i>
        <i class="fa fa-star" name="star-2"></i>
        <i class="fa fa-star" name="star-3"></i>
        <i class="fa fa-star" name="star-4"></i>
        <i class="fa fa-star" name="star-5"></i>
        </span></p>
        <p class="fst-italic ps-5">${comentario} </p>
        <small class="text-muted float-end">Publicado el ${new Date().toLocaleString()}</small>
        </div>
        `
    }

    document.getElementById ('prodComments').innerHTML += htmlContentToAppendComment;
    document.getElementById ('comentario').value = ''
    document.getElementById ('cal').value = '5'

}


document.getElementById('liveToastBtn').onclick = () => {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl, {
            animation: true,
            autohide: true,
            delay: 7000
          })
    });
    toastList.forEach(toast => toast.show());

    let art = JSON.parse(localStorage.getItem('cartArts')) || [];
    let addArt = {
        'id': prodInfo.id,
        'name': prodInfo.name,
        'count': 1,
        'unitCost': prodInfo.cost,
        'currency': prodInfo.currency,
        'image': prodInfo.images[0]
    };

    if (JSON.stringify(art).includes(JSON.stringify(addArt.id))) {

        let i = art.findIndex((art) => art.id == addArt.id)
        art[i].count++;

    } else {

        art.push(addArt);

    }

    localStorage.setItem('cartArts', JSON.stringify(art));
}