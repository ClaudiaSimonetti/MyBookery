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

// const title = document.querySelector(".titulo")
// const productList  = document.querySelector(".books");

// function renderHome(){
//     title.innerHTML = `<p class="page-title">Novedades</p>`;
//     let productsHome = products.filter((prod)=>prod.category === 'novedades')
//     productsHome.forEach((product)=>{
//         productList.innerHTML += `
//             <div class="carta">
//                 <img src="${product.img}" alt="Libro ${product.title}">
//                 <h2>${product.title}</h2>
//                 <p>${product.description}</p>
//                 <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
//             </div>
//         `
//     })
// };

// renderHome();

// function categorySelector(category){
//     productList.innerHTML = "";
//     title.innerHTML = `<p class="page-title">${category}</p>`;
//     let filteredProducts = products.filter(el=>el.category === category)
//     filteredProducts.forEach((product)=>{
//         productList.innerHTML += `
//                 <div class="carta">
//                     <img src="${product.img}" alt="Libro ${product.title}">
//                     <h2>${product.title}</h2>
//                     <p>${product.description}</p>
//                     <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
//                 </div>
//             `
//     });
//     navHandler();
// }

// function genderSelector(gender){
//     productList.innerHTML = ""
//     title.innerHTML = `<p class="page-title">${gender}</p>`
//     let filteredProducts = products.filter(el=>el.gender === gender)
//     filteredProducts.forEach((product)=>{
//         productList.innerHTML += `
//                 <div class="carta">
//                     <img src="${product.img}" alt="Libro ${product.title}">
//                     <h2>${product.title}</h2>
//                     <p>${product.description}</p>
//                     <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
//                 </div>
//             `
//     });
//     navHandler();
// };

// function openModal(modalId){
//     const modal = document.getElementById(`modal${modalId}`);
//     modal.style.display = 'block';
// };

function closeModal(modalId){
    const modal = document.getElementById(`modal${modalId}`);
    modal.style.display = 'none';
    showCart();
};

const modalBooks = document.querySelector('.modalBooks');

function showModals(){
    products.forEach((product)=>{
        modalBooks.innerHTML += `
            <div id="modal${product.id}" class="modal">
                <div class="modal-content">
                    <span class="cerrar-modal" data-target="modal${product.id}" onclick="closeModal(${product.id})">&times;</span>
                    <div class="modal-flex-container">
                        <div class="modal-image">
                            <img src="${product.img}" alt="Imagen del libro 1">
                        </div>
                        <div class="modal-info">
                            <h2>${product.title}</h2>
                            <p>${product.description}.</p>
                            <p>Precio: $${product.price}</p>
                            <button class="btn-modal" id="addToCart${product.id}" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
};

showModals();


function addToCart(book) {
    const bookId = book.id; // O ajusta esto según cómo tengas la propiedad 'id' en tu objeto 'selectedBook'

    if (cartList.some(prod => parseInt(prod.id) === parseInt(bookId))) {
        let addProduct = cartList.find(findProd => parseInt(findProd.id) === parseInt(bookId))
        addProduct.quantity = addProduct.quantity + 1;
    } else {
        const nuevoProducto = { ...book };
        cartList.push(nuevoProducto);
    }
    productCounter();
    // closeModal(bookId); // No estoy seguro de cómo está implementada closeModal, así que esto puede o no ser necesario
}
// let cartList = []

// function addToCart(bookId){
//     if(cartList.some(prod => parseInt(prod.id) === parseInt(bookId))){
//         let addProduct = cartList.find(findProd=>parseInt(findProd.id) === parseInt(bookId))
//         addProduct.quantity = addProduct.quantity + 1          
//     } else{
//         const nuevoProducto = {...products[bookId-1]}
//         cartList.push(nuevoProducto)
//     }
//     productCounter();
//     closeModal(bookId)
// }

let counter = document.querySelector(".unit-counter")

function productCounter(){
    let total = 0
    cartList.forEach((el) => {
        total += el.quantity 
    })
    counter.innerText = `${total}`
}

function showCart(){
    title.innerHTML = `<p class="page-title">Mis Compras</p>`;
    productList.innerHTML = ""
    createFirstRowTitles();
    cartList.forEach((element)=>{
        productList.innerHTML += `
            <div class="cart">
                <img src="${element.img}" alt="" height="90px" onclick="openModal(${element.id})" class="cartGrid">
                <h4 onclick="openModal(${element.id})" class="cartGrid">${element.title}</h4>
                <p onclick="openModal(${element.id})"class="cartGrid">${element.author}</p>
                <p onclick="openModal(${element.id})"class="cartGrid">${element.quantity}</p>
                <p onclick="openModal(${element.id})"class="cartGrid">${element.price}</p>
                <button class="delete-button" onclick="deleteProduct(${element.id})"class="cartGrid"><i class="fa-solid fa-trash fa-2xs"></i></button>
            </div>
        `
    })
    createCartButtons();
};

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

function createCartButtons(){
    const emptyCartButton = document.createElement("button") 
    emptyCartButton.innerHTML = "Vaciar Carrito"
    emptyCartButton.setAttribute("class" , "checkout-button")
    emptyCartButton.addEventListener("click" , emptyCart)
    productList.appendChild(emptyCartButton)

    const checkoutButton = document.createElement("button")
    checkoutButton.innerHTML = "Finalizar Compra"
    checkoutButton.setAttribute("class","checkout-button")
    checkoutButton.addEventListener("click", finishBuying)
    productList.appendChild(checkoutButton)
}

function deleteProduct(bookId){
    let newCartList = cartList.filter((el)=>el.id !== bookId)
    cartList = newCartList
    showCart();
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

function finishBuying(){
    if(cartList.length !== 0){
    form.innerHTML = ""    
    title.innerHTML = `<p class="page-title">Checkout</p>`;
    productList.innerHTML = ""
    createForm();
    fields.forEach((field, index)=> {
    form.innerHTML += `
        <div class='input-container' >
            <label class='input-label' for="${field.name}">${field.name}</label>
            <input class='input-field' type="${field.type}" name="${field.name}" id="${field.name}"/>
            <p class="errorMessage" id="${field.idField}"></p>
        </div>    
    `
    })
    const formButton = document.createElement("button") 
    formButton.innerHTML = "Enviar"
    formButton.setAttribute("class" , "btn-modal-cart")
    formButton.addEventListener("click" , submit)
    productList.appendChild(formButton)
    }else{
        popUp("El carrito debe contener al menos 1 producto.")
        openPopUp()
    } 
}

function submit(e){
    e.preventDefault();
    fields.forEach((el, index) => {
        const enteredValue = document.getElementById(el.name).value
            el.value = enteredValue
        if(el.value.match(el.regex)){
            el.errorMessage = ""
            createErrorMessage(el.errorMessage, el.idField) 
        }else{
            el.errorMessage = el.message
            createErrorMessage(el.errorMessage, el.idField) 
        }
    })
    validation()
}

function createErrorMessage(errorMessage, id){
    const div = document.getElementById(`${id}`)
    div.innerHTML = errorMessage
}

function validation(){
    if(fields[0].errorMessage === "" 
    && fields[1].errorMessage === "" &&
    fields[2].errorMessage === "" && fields[3].errorMessage === "" &&
    fields[4].errorMessage === "" && fields[5].errorMessage === "" &&
    fields[6].errorMessage === "" && fields[7].errorMessage === "" &&
    fields[8].errorMessage === "" && fields[9].errorMessage === "" 
    ){
        title.innerHTML = `<p class="page-title confirmation-sending-form">
                                <i class="fa-solid fa-circle-check"></i></i>Formulario enviado con éxito
                            </p>
        `;
        productList.innerHTML = "" ;
        cartList = [];
        productCounter();
        window.scrollTo(0, 0)
    }
}
