let nav = document.getElementById("menu")
let showMenu = true

function navHandler(){
    if (showMenu) {
        nav.style.left = "0"
        showMenu = false
    } else {
        nav.style.left = "-200%"
        showMenu = true
    }
}

const slider = document.getElementById("slider")

function carrousel(){
    slider.innerHTML = `
        <div class="slides">
            <img src="./img/slide/img1.jpg" alt="">
            <img src="./img/slide/img2.jpg" alt="">
            <img src="./img/slide/img3.jpg" alt=""> 
            <img src="./img/slide/img4.jpg" alt=""> 
            <img src="./img/slide/img1.jpg" alt="">
        </div>
    `
}

carrousel();


renderHome();

function categorySelector(category){
    productList.innerHTML = "";
    title.innerHTML = `<p class="page-title">${category}</p>`;
    let filteredProducts = products.filter(el=>el.category === category)
    filteredProducts.forEach((product)=>{
        productList.innerHTML += `
                <div class="carta">
                    <img src="${product.img}" alt="Libro ${product.title}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
                </div>
            `
    });
    navHandler();
}

function genderSelector(gender){
    productList.innerHTML = ""
    title.innerHTML = `<p class="page-title">${gender}</p>`
    let filteredProducts = products.filter(el=>el.gender === gender)
    filteredProducts.forEach((product)=>{
        productList.innerHTML += `
                <div class="carta">
                    <img src="${product.img}" alt="Libro ${product.title}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
                </div>
            `
    });
    navHandler();
};



let counter = document.querySelector(".unit-counter")

function productCounter(){
    let total = 0
    cartList.forEach((el) => {
        total += el.quantity 
    })
    counter.innerText = `${total}`
}


function createFirstRowTitles(){
    const titleRow = document.createElement("div")
    productList.appendChild(titleRow)
    titleRow.setAttribute("class", "title-row")
    if(cartList.length === 0){
        titleRow.innerHTML = `<h1>El carrito está vacío</h1>`
        titleRow.setAttribute("class", "empty-cart")
    }else{
        titleRow.innerHTML = `
            <p class="cartGrid"></p>
            <p class="cartGrid">Titulo</p>
            <p class="cartGrid">Autor</p>
            <p class="cartGrid">Unidades</p>
            <p class="cartGrid">Precio</p>
            <p class="cartGrid"></p>
        `
    }
}


function emptyCart(){
    cartList = [];
    productCounter();
    showCart();
}

const form = document.createElement("form")

function createForm(){
    form.setAttribute("id" , "form")
    productList.appendChild(form)
}

const popUpMessage = document.querySelector('.popUpMessage');

function popUp(message){
    popUpMessage.innerHTML = `
        <div id="modal" class="modal">
            <div class="modal-content">
                <div class="modal-flex-container">
                    <div class="modal-info">
                        <p class="message-modal">${message}</p>
                        <button class="btn-modal-cart" onclick="closePopUp()">Cerrar</button>
                    </div>   
                </div> 
            </div>
        </div>                  
    `
};

function openPopUp(){
    const modal = document.getElementById("modal");
    modal.style.display = 'block';
};

function closePopUp(){
    const modal = document.getElementById("modal");
    modal.style.display = 'none';
};


