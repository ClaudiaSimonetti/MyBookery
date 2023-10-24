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

let novelsNavbar = document.getElementById('novelasUl')
let noFictionNavbar = document.getElementById('noFictionUl')

function menuNavbar(){
    let novels = products.filter((el)=> el.category.toLowerCase() === 'novela')

    let gendersNovels = novels.map((el)=>{return el.gender})
    let genderN = new Set(gendersNovels)
    genderN.forEach((el)=>{
        novelsNavbar.innerHTML += `<li><a class="item" href="#" onclick= "genderSelector('${el}')">${el}</a></li>`})

    let noFiction = products.filter((el)=> el.category.toLowerCase() === 'no ficcion')
    let gendersNoFiction = noFiction.map((el)=>{return el.gender})
    let genderNF = new Set(gendersNoFiction)
    genderNF.forEach((el)=>{
        noFictionNavbar.innerHTML += `<li><a class="item" href="#" onclick= "genderSelector('${el}')">${el}</a></li>`})
}

menuNavbar()

const info =  document.getElementById('info')
function getExchange(exchange){
    let date = exchange[0].date;
    let newDate =date.slice(0, -22);
    let format = newDate.split("-");
    let today = format[2]+'/'+format[1] +'/'+format[0]
    info.innerHTML = ` 
        <p>Fecha: ${today}</p>
        <p>Cotización dólar: $ ${exchange[0].value_sell}</p>
    `
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

const title = document.querySelector(".title")
const productList  = document.querySelector(".books");

function renderHome(){
    title.innerHTML = `<p class="page-title">Novedades</p>`;
    let productsHome = products.filter((prod)=>prod.isNovelty)
    productsHome.forEach((product)=>{
        productList.innerHTML += `
            <div class="carta">
                <img src="${product.img}" alt="Libro ${product.title}">
                <div class="card-div">
                    <p class="card-title">${product.title}</p>
                    <p>Autor: ${product.author}</p>
                    <p>Ar$ ${product.price}</p>
                </div>
                <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
            </div>
        `
    })
};

renderHome();

function categorySelector(category){
    slider.innerHTML = "";
    productList.innerHTML = "";
    title.innerHTML = `<p class="page-title">${category}</p>`;

    if(category === 'infantiles y juveniles'){
        let filteredProducts = products.filter(el=>el.category.toLowerCase() === category.toLowerCase())
        filteredProducts.forEach((product)=>{
            productList.innerHTML += `
                    <div class="carta">
                    <img src="${product.img}" alt="Libro ${product.title}">
                    <div class="card-div">
                        <p class="card-title">${product.title}</p>
                        <p>Autor: ${product.author}</p>
                        <p>Ar$ ${product.price}</p>
                    </div>
                        <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
                    </div>
                `
        });
    }

    if(category === 'lo mas vendido'){
        let filteredProducts2 = products.filter(el=>el.isTop10)
        filteredProducts2.forEach((product)=>{
            productList.innerHTML += `
                <div class="carta">
                    <img src="${product.img}" alt="Libro ${product.title}">
                    <div class="card-div">
                        <p class="card-title">${product.title}</p>
                        <p>Autor: ${product.author}</p>
                        <p>Ar$ ${product.price}</p>
                    </div>
                    <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
                </div>
            `
        });
    }

    if(category === 'novedades'){
        carrousel();
        let filteredProducts3 = products.filter(el=>el.isNovelty)
        filteredProducts3.forEach((product)=>{
            productList.innerHTML += `
                <div class="carta">
                    <img src="${product.img}" alt="Libro ${product.title}">
                    <div class="card-div">
                        <p class="card-title">${product.title}</p>
                        <p>Autor: ${product.author}</p>
                        <p>Ar$ ${product.price}</p>
                    </div>
                    <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
                </div>
            `
        });
    }
    navHandler();
}

function genderSelector(gender){
    slider.innerHTML = ""
    productList.innerHTML = ""
    title.innerHTML = `<p class="page-title">${gender}</p>`
    let filteredProducts = products.filter(el=>el.gender.toLowerCase() === gender.toLowerCase())
    filteredProducts.forEach((product)=>{
        productList.innerHTML += `
                <div class="carta">
                    <img src="${product.img}" alt="Libro ${product.title}">
                    <div class="card-div">
                        <p class="card-title">${product.title}</p>
                        <p>Autor: ${product.author}</p>
                        <p>Ar$ ${product.price}</p>
                    </div>
                    <button class="btn-modal" data-target="modal${product.id}" onclick="openModal(${product.id})">Ver Detalles</button>
                </div>
            `
    });
    navHandler();
};

function openModal(modalId){
    const modal = document.getElementById(`modal${modalId}`);
    modal.style.display = 'block';
};

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
                            <div class="modal-title">
                                <p class="modal-card-title">${product.title}</p>
                                <p>Autor: ${product.author}</p>
                                <p>Género: ${product.gender}</p>
                                <p>Ar$ ${product.price}</p>
                                <button class="btn-modal btn-add-cart" id="addToCart${product.id}" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                            </div>
                        </div>
                        <div class="modal-info">
                            <p class="card-title">Sinopsis:</p><br/>
                            <p>${product.description}.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
};

showModals();

let cartList = []

function addToCart(bookId){
    slider.innerHTML = ""
    if(cartList.some(prod => parseInt(prod.id) === parseInt(bookId))){
        let addProduct = cartList.find(findProd => parseInt(findProd.id) === parseInt(bookId))
        addProduct.quantity = addProduct.quantity + 1 
        addProduct.totalPrice = addProduct.price * addProduct.quantity       
    } else{
        const nuevoProducto = {...products[bookId-1]}
        cartList.push(nuevoProducto)
    }
    productCounter();
    closeModal(bookId)
}

let counter = document.querySelector(".unit-counter")

function productCounter(){
    let total = cartList.map(obj => obj.quantity).reduce((prev, curr) => {
                    return prev + curr
                },0);
    counter.innerText = `${total}`
}

function showCart(){
    slider.innerHTML = "";
    title.innerHTML = `<p class="page-title">Mis Compras</p>`;
    productList.innerHTML = ""
    createFirstRowTitles();
    cartList.forEach((element)=>{
        productList.innerHTML += `
            <div class="cart">
                <img src="${element.img}" alt="" height="90px" onclick="openModal(${element.id})" class="cartGrid">
                <h5 onclick="openModal(${element.id})" class="cartGrid">${element.title}</h5>
                <p onclick="openModal(${element.id})"class="cartGrid">${element.author}</p>
                <p onclick="openModal(${element.id})"class="cartGrid">${element.quantity}</p>
                ${!element.totalPrice ? `<p onclick="openModal(${element.id})"class="cartGrid">$ ${element.price}</p>`
                :`<p onclick="openModal(${element.id})"class="cartGrid">$ ${element.totalPrice}</p>`}
                <button class="delete-button" onclick="deleteProduct(${element.id})"class="cartGrid"><i class="fa-solid fa-trash fa-2xs"></i></button>
            </div>
        `
    })
    createTotal()
    createCartButtons();
};

function createTotal(){
    const totalRow = document.createElement("div");
    totalRow.setAttribute("class", "title-row"); 
    productList.appendChild(totalRow);
    let total = cartList.map(obj => obj.price * obj.quantity).reduce((prev, curr) => {
                    return prev + curr
                },0);
    if(cartList.length === 0){
        totalRow.innerHTML = ""
    }else{
        totalRow.innerHTML = `
            <p class="cartGrid"></p>
            <p class="cartGrid"></p>
            <p class="cartGrid"></p>
            <p class="cartGrid"></p>
            <p class="cartGrid total-row">$ ${total}</p>
            <p class="cartGrid"></p>
        `
    }
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
            <p class="cartGrid">Precio Total</p>
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
    productCounter();
}

function emptyCart(){
    cartList = [];
    showCart();
    productCounter();
    
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

function contactForm(){
    slider.innerHTML = ""
    productList.innerHTML = "";
    title.innerHTML = `<p class="page-title">Contacto</p>`;
        productList.innerHTML = `
            <div form class="container form-container" id="form-contact">
                <div class="form-group mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" name="nombre">
                    <div id="nombre-error" class="errorMessage error-form-contact"></div>
                </div>
                <div class="form-group mb-3">
                    <label for="apellido" class="form-label">Apellido</label>
                    <input type="text" class="form-control" id="apellido" name="apellido">
                    <div id="apellido-error" class="errorMessage error-form-contact"></div>
                </div>
                <div class="form-group mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" >
                    <div id="email-error" class="errorMessage error-form-contact"></div>
                </div>
                <div class="form-group mb-3">
                    <label for="consulta" class="form-label">Consulta</label>
                    <textarea class="form-control" id="consulta" name="consulta" rows="5"></textarea>
                <div id="consulta-error" class="errorMessage error-form-contact"></div>
                </div>
            <div class="btn-contact-container">
                <button onclick="contactFormCleaner()" class="btn-modal btn-contact-form-cleaner">Limpiar el formulario</button>
                <button onclick="contactFormValidation()" class="btn-modal btn-contact-form-validation">Enviar</button>
            </div> 
            `
    navHandler();
}

function contactFormCleaner(){
    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('email').value = "";
    document.getElementById('consulta').value = "";
    let errorMessageName = document.getElementById("nombre-error")
    let errorMessageSurname = document.getElementById("apellido-error")
    let errorMessageEmail = document.getElementById("email-error")
    let errorMessageConsulta = document.getElementById("consulta-error")
    errorMessageName.innerHTML = "";
    errorMessageSurname.innerHTML = "";
    errorMessageEmail.innerHTML = "";
    errorMessageConsulta.innerHTML = "";
}

function contactFormValidation(){
    let errorMessageName = document.getElementById("nombre-error")
    let errorMessageSurname = document.getElementById("apellido-error")
    let errorMessageEmail = document.getElementById("email-error")
    let errorMessageConsulta = document.getElementById("consulta-error")

    let nameValue = document.getElementById("nombre").value
    let surnameValue = document.getElementById("apellido").value
    let emailValue = document.getElementById("email").value
    let consultaValue = document.getElementById("consulta").value

    if(!nameValue.match(/^[a-zA-ZÀ-ÿ\s]{2,20}$/)){
        errorMessageName.innerHTML = '<p>Verifique el dato ingresado. Solo se permiten letras.</p>';
    }else{
    errorMessageName.innerHTML = "";
    }

    if(!surnameValue.match(/^[a-zA-ZÀ-ÿ\s]{2,20}$/)){
        errorMessageSurname.innerHTML = '<p>Verifique el dato ingresado. Solo se permiten letras.</p>';
    }else{
    errorMessageSurname.innerHTML = "";
    }

    if(!emailValue.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
        errorMessageEmail.innerHTML = '<p>Verifique el dato ingresado. Ej: correo@mybookery.com.</p>';
    }else{
    errorMessageEmail.innerHTML = "";
    }

    if(consultaValue === ""){
        errorMessageConsulta.innerHTML = 'Debe ingresar su consulta';
    }else{
    errorMessageConsulta.innerHTML = "";
    }

    if(nameValue !== "" && errorMessageName.innerHTML === "" &&
    surnameValue !== "" && errorMessageSurname.innerHTML === "" &&
    emailValue !== "" && errorMessageEmail.innerHTML === "" &&
    consultaValue !== "" && errorMessageConsulta.innerHTML === ""
    ){
        contactFormCleaner()
        popUp('<i class="fa-solid fa-circle-check"></i></i>Formulario enviado con éxito')
        openPopUp()
    }
}