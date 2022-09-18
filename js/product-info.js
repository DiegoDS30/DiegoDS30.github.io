let prodInfo = {};
let prodComments = {};

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
    document.getElementById("prodInfoPrice").innerHTML =`${prodInfo.currency} ${prodInfo.cost}`;
    document.getElementById("prodInfoDescription").innerHTML = `${prodInfo.description}`;
    document.getElementById("prodInfoCategory").innerHTML = `${prodInfo.category}`;
    document.getElementById("prodInfoSoldCount").innerHTML = `${prodInfo.soldCount}`;

    showProdImg ();
    
}

/**
 * Agarra la informacion de las imagenes del archivo JSON y las agrega al carrusel.
 */

function showProdImg (){
    let htmlContentToAppendIndicators ="";
    let htmlContentToAppendCarouselInner = "";
    
    
    let carouselIndi = document.getElementById("prodInfoCarouselImgIndicators");
    let carouselInner = document.getElementById("prodInfoCarouselInner");

    carouselIndi.innerHTML += `
    <button type="button" data-bs-target="#prodInfoCarouselImg" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`

    carouselInner.innerHTML += `
    <div class="carousel-item active">
        <img src="${prodInfo.images[0]}" class="d-block w-100" alt="30%">
    </div>`

    for(let i = 1; i < prodInfo.images.length; i++){
        let prodInfoImg = prodInfo.images[i];
        htmlContentToAppendIndicators = `
        <button type="button" data-bs-target="#prodInfoCarouselImg" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>`
    
        htmlContentToAppendCarouselInner = `
        <div class="carousel-item">
            <img src="${prodInfoImg}" class="d-block w-100" alt="30%">
        </div>`
    
        carouselIndi.innerHTML += htmlContentToAppendIndicators;
        carouselInner.innerHTML += htmlContentToAppendCarouselInner;
    
    }
}


function showProductComments(){
    htmlContentToAppendProductComments = "";

    /* Loop que va a ir agregando los comentarios al HTML. */

    for(let i =0; i < prodComments.length; i++ ){
        let productComment = prodComments[i];

        htmlContentToAppendProductComments += `
        <div class="row">
        <p><strong>${productComment.user}</strong> - publicado el ${new Date(productComment.dateTime).toLocaleString()}</p>
        <p>${productComment.description}</p>
        <span>
        <i class="fa fa-star" name="star-1"></i>
        <i class="fa fa-star" name="star-2"></i>
        <i class="fa fa-star" name="star-3"></i>
        <i class="fa fa-star" name="star-4"></i>
        <i class="fa fa-star" name="star-5"></i>
        </span>
        </div>
        <hr class="d-none d-md-block my-3">
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