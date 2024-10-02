const nav = document.getElementById("menu");

function navbar() {
    nav.innerHTML = `
        <ul class="list">
            <li class="list-item"><li class="list-item"><a class="item" href="javascript:categorySelector('novedades')" onclick="('novedades')">Novedades</a></li>
            <li class="list-item"><a class="item" href="#">Novelas<i class="fa-solid fa-caret-down"></i></a>
                <ul class="slide" style="z-index: 3" id="novelasUl"></ul>
            </li>
            <li class="list-item"><a class="item" href="#">No Ficción<i class="fa-solid fa-caret-down"></i></a>
                <ul class="slide" style="z-index: 3" id="noFictionUl"></ul>
            </li>
            <li class="list-item"><a class="item" href="javascript:categorySelector('infantiles y juveniles')" target="_self">Infantiles y Juveniles</a></li>
            <li class="list-item"><a class="item" href="javascript:categorySelector('lo mas vendido')" target="_self">Lo más vendido</a></li>
            <li class="list-item"><a class="item" id="contacto" href="javascript:contactForm()" target="_self">Contacto</a></li>
            <div>
                <input class='input-search' placeholder=" Buscar título o autor..." type="text" id="search"><i class="fa-solid fa-magnifying-glass" onclick="searchForBooks()"></i>
            </div>
            <div class="user-container" onclick="signIn()">
                <p class="user-name">Iniciar Sesión</p>
                <i class="fa-solid fa-user"></i>
            </div>
        </ul>
    `
};
navbar();

let showMenu = true;

function navHandler(){
    if(showMenu){
        nav.style.left = "0"
        showMenu = false
    }else{
        nav.style.left = "-200%"
        showMenu = true
    }
};

let novelsNavbar = document.getElementById('novelasUl');
let noFictionNavbar = document.getElementById('noFictionUl');

function menuNavbar(){
    let novels = products.filter((el)=> el.category.toLowerCase() === 'novela')
    let gendersNovels = novels.map((el)=>{return el.gender})
    let genderN = new Set(gendersNovels)
    genderN.forEach((el)=>{
        novelsNavbar.innerHTML += `<li><a class="item" href="#" onclick= "genderSelector('${el}')">${el}</a></li>`
    });

    let noFiction = products.filter((el)=> el.category.toLowerCase() === 'no ficcion')
    let gendersNoFiction = noFiction.map((el)=>{return el.gender})
    let genderNF = new Set(gendersNoFiction)
    genderNF.forEach((el)=>{
        noFictionNavbar.innerHTML += `<li><a class="item" href="#" onclick= "genderSelector('${el}')">${el}</a></li>`
    });
}

menuNavbar();

const title = document.querySelector(".title");
const productList  = document.querySelector(".books");
const search = document.getElementById('search');

search.addEventListener("keypress", searchForBooksPressingEnter)

function searchForBooksPressingEnter(e){
    if(e.key === "Enter"){
        searchForBooks()
    }
}

function searchForBooks(){
    productList.innerHTML = "";
    let searchResult = [];
    let searchedValue = search.value.toLowerCase();
    let titleResult = products.filter(obj => obj.title.toLocaleLowerCase().includes(searchedValue));
    let authorResult = products.filter(obj => obj.author.toLocaleLowerCase().includes(searchedValue));
    searchResult = new Set([...[...titleResult.concat([...authorResult])]]);
    title.innerHTML = `<p class="page-title">${searchResult.size === 1 || searchedValue === "" ? 'Resultado' : 'Resultados'} de su búsqueda</p>`
    if(searchResult.size === 0 || searchedValue === "" ){
        productList.innerHTML = `<p class="page-title">Ningún producto encontrado...</p>`
    }else{
        searchResult.forEach((product)=>{ 
            productList.innerHTML += `
                <div class="card" data-target="modal${product.id}" onclick="openModal(${product.id})">
                    <img src="${product.img}" alt="Libro ${product.title}">
                    <div class="card-div">
                        <p class="card-title">${product.title}</p>
                        <p>Autor: ${product.author}</p>
                        <p>Ar$ ${product.price}</p>
                    </div>
                </div>
            `
        })
    }
    search.value = "";
    navHandler();
}

function signIn(){
    loginPopUp()
    openLoginPopUp()
}

const userMessage = document.querySelector('.popUpUser');

function loginPopUp(){
    userMessage.innerHTML = `
        <div id="modalLogin" class="modal">
            <div class="popUp-content">
                <div class="modal-flex-container ">
                    <div class="modal-info">
                        <label class='input-label' for="user">Usuario</label>
                        <input class='input-field' type="text" name="user" id="user"/>
                        <br/><br/>
                        <label class='input-label' for="pass">Contraseña</label>
                        <input class='input-field' type="text" name="pass" id="pass"/>
                        <p id="messageLogin" style="padding-top:10px; font-size: 12.5px"></p>
                        <button class="btn-modal-cart" onclick="login()">Ingresar</button>
                    </div>   
                </div> 
            </div>
        </div>                  
    `
}

function openLoginPopUp(){
const modal = document.getElementById("modalLogin");
    modal.style.display = 'block';
    
};

function closeLoginPopUp(){
    const modal = document.getElementById("modalLogin");
    modal.style.display = 'none';
};

function login(){
    const userLogin = document.getElementById('user').value.toLocaleLowerCase()
    const passLogin = document.getElementById('pass').value.toLocaleLowerCase()

    users.forEach(user => {
        if(user.nameUser.toLocaleLowerCase() === userLogin && user.password.toLocaleLowerCase() === passLogin){
            if(user.credencial === 'usuario'){
                closeLoginPopUp()
            }else{
                const menuNavbar = document.getElementById('menu')
                menuNavbar.innerHTML = ""
                menuNavbar.innerHTML = `
                    <ul class="list">
                        <li class="list-item"><li class="list-item"><a class="item" href="" onclick="listOfProducts()">Productos</a></li>
                        <li class="list-item"><a class="item" href="" target="_self" onclick="registerProduct()">Alta Productos</a></li>
                        <div>
                            <input class='input-search' placeholder=" Buscar título o autor..." type="text" id="search"><i class="fa-solid fa-magnifying-glass" onclick="searchForBooks()"></i>
                        </div>
                        <div class="user-container" onclick="signOut()">
                            <p class="user-name">Hola ${user.nameUser} </p>
                            <i class="fa-solid fa-user"></i>
                        </div>
                    </ul>
                `
                title.innerHTML = `<p class="page-title">Listado de Productos</p>`;
                productList.innerHTML = ''
                listOfProducts()
                closeLoginPopUp()
            }
        }else{
            const messageLogin = document.getElementById("messageLogin")
            messageLogin.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Contraseña o nombre de usuario incorrecto`
        }
    })
}

function listOfProducts(){
    productList.innerHTML = `<button class='product-registration-btn' onclick="registerProduct()">Alta Producto</button>`
    products.forEach((product)=>{
        productList.innerHTML += `
        <div class="card-list-of-products" >
            <img src="${product.img}" alt="Libro ${product.title}">
            <div class="card-div-list-of-products">
                <p class="card-title">${product.title}</p>
                <p>Autor: ${product.author}</p>
                <p>Ar$ ${product.price}</p>
                <div class="btn-div-list-of-products">
                <button class='edit-btn-list-of-products' data-target="modal${product.id}" onclick="openModalEdit(${product.id})">Editar</button>
                <button class='delete-btn-list-of-products'>Eliminar</button>
                </div>
            </div>
        </div>
    `
    })
};

function openModalEdit(modalId){
    const modal = document.getElementById(`modalEdit${modalId}`);
    modal.style.display = 'block';
};

function closeModalEdit(modalId){
    const modal = document.getElementById(`modalEdit${modalId}`);
    modal.style.display = 'none';
};

function signOut(){
    // 
    // userMessage.innerHTML = `
    // <div id="modal" class="modal">
    //         <div class="popUp-content">
    //             <div class="modal-flex-container ">
    //                 <div class="modal-info">
    //                     <p class="message-modal">Desea cerrar sesión?</p>
    //                     <button class="btn-modal-cart" onclick="closePopUp()">Aceptar</button>
    //                 </div>   
    //             </div> 
    //         </div>
    //     </div>

    // `
}

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

// const slider = document.getElementById("slider")

// function carrousel(){
//     slider.innerHTML = `
//         <div class="slides">
//             <img src="./img/slide/img1.jpg" alt="">
//             <img src="./img/slide/img2.jpg" alt="">
//             <img src="./img/slide/img3.jpg" alt=""> 
//             <img src="./img/slide/img4.jpg" alt=""> 
//             <img src="./img/slide/img1.jpg" alt="">
//         </div>
//     `
// }

// carrousel();

//////////////////////////-----------MAIN-----------/////////////////////////////////////////////////////////////////////////////

function renderHome(){
    title.innerHTML = `<p class="page-title">Novedades</p>`;
    let productsHome = products.filter((prod)=>prod.isNovelty)
    productsHome.forEach((product)=>{
        productList.innerHTML += `
            <div class="card" data-target="modal${product.id}" onclick="openModal(${product.id})">
                <img src="${product.img}" alt="Libro ${product.title}">
                <div class="card-div">
                    <p class="card-title">${product.title}</p>
                    <p>Autor: ${product.author}</p>
                    <p>Ar$ ${product.price}</p>
                </div>
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
                <div class="card" data-target="modal${product.id}" onclick="openModal(${product.id})">
                <img src="${product.img}" alt="Libro ${product.title}">
                    <div class="card-div">
                        <p class="card-title">${product.title}</p>
                        <p>Autor: ${product.author}</p>
                        <p>Ar$ ${product.price}</p>
                    </div>
                </div>
            `
        });
    }

    if(category === 'lo mas vendido'){
        let filteredProducts2 = products.filter(el=>el.isTop10)
        filteredProducts2.forEach((product)=>{
            productList.innerHTML += `
                <div class="card" data-target="modal${product.id}" onclick="openModal(${product.id})">
                    <img src="${product.img}" alt="Libro ${product.title}">
                    <div class="card-div">
                        <p class="card-title">${product.title}</p>
                        <p>Autor: ${product.author}</p>
                        <p>Ar$ ${product.price}</p>
                    </div>
                </div>
            `
        });   
    }

    if(category === 'novedades'){
        // carrousel();
        let filteredProducts3 = products.filter(el=>el.isNovelty)
        filteredProducts3.forEach((product)=>{
            productList.innerHTML += `
                <div class="card" data-target="modal${product.id}" onclick="openModal(${product.id})">
                    <img src="${product.img}" alt="Libro ${product.title}">
                    <div class="card-div">
                        <p class="card-title">${product.title}</p>
                        <p>Autor: ${product.author}</p>
                        <p>Ar$ ${product.price}</p>
                    </div>
                </div>
            `
        });
    }
    navHandler();
};

function genderSelector(gender){
    slider.innerHTML = ""
    productList.innerHTML = ""
    title.innerHTML = `<p class="page-title">${gender}</p>`
    let filteredProducts = products.filter(el=>el.gender.toLowerCase() === gender.toLowerCase())
    filteredProducts.forEach((product)=>{
        productList.innerHTML += `
            <div class="card" data-target="modal${product.id}" onclick="openModal(${product.id})">
                <img src="${product.img}" alt="Libro ${product.title}">
                <div class="card-div">
                    <p class="card-title">${product.title}</p>
                    <p>Autor: ${product.author}</p>
                    <p>Ar$ ${product.price}</p>
                </div>
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

const form = document.createElement("form")

function createForm(){
    form.setAttribute("id" , "form")
    productList.appendChild(form)
} 

function registerProduct(){
    // productList.innerHTML = "";
    createForm();
    form.innerHTML += `
    <div class="modal-info">
                            <div class="div-img-and-title">
                                <div class="div-img">
                                    <label class='' for="imgBook-${product.id}">Imagen</label>
                                    <img class='img-modal-edit'  id="imgBook-${product.id}" src="${product.img}"/>
                                    <input class='' type="file" style="color: transparent" accept="image/*" onchange="fileUpload(${product.id})" name="fileBook-${product.id}" id="fileBook-${product.id}" src="${product.img}"/>
                                </div>

                                <div class="div-title">
                                    <label class='input-label' for="idBook-${product.id}">ID</label>
                                    <input class='input-form-edit' disabled type="text" name="idBook-${product.id}" id="idBook-${product.id}" value="${product.id}"/>
                                    
                                    <label class='input-label' for="titleBook-${product.id}">Título</label>
                                    <input class='input-form-edit' type="text" name="titleBook-${product.id}" id="titleBook-${product.id}" value="${product.title}"/>
                                    
                                    <label class='input-label' for="authorBook-${product.id}">Autor</label>
                                    <input class='input-form-edit' type="text" name="authorBook-${product.id}" id="authorBook-${product.id}" value="${product.author}"/>
                                    
                                    <label class='input-label' for="categoryBook-${product.id}">Categoria</label>
                                    <input class='input-form-edit' type="text" name="categoryBook-${product.id}" id="categoryBook-${product.id}" value="${product.category}"/>
                                    
                                    <label class='input-label' for="genderBook-${product.id}">Genero</label>
                                    <input class='input-form-edit' type="text" name="genderBook-${product.id}" id="genderBook-${product.id}" value="${product.gender}"/>
                                    
                                    <div class="div-price">
                                    <div style="margin-bottom: 15px">
                                        <label class='input-label' for="priceBook-${product.id}">Precio</label>
                                        <input class='input-form-edit' type="text" name="priceBook-${product.id}" id="priceBook-${product.id}" value="${product.price}"/>
                                    </div>

                                    <div> 
                                        <label class='input-label' for="checkboxNovelty-${product.id}">Es novedad</label>
                                        <input class='checkbox-form-edit' type="checkbox" name="checkboxNovelty-${product.id}" id="checkboxNovelty-${product.id}" value="${product.isNovelty}"/>
                                    </div>
                                    
                                    <div> 
                                        <label class='input-label' for="checkboxTop10-${product.id}">Es top 10</label>
                                        <input class='checkbox-form-edit' type="checkbox" name="checkboxTop10-${product.id}" id="checkboxTop10-${product.id}" value="${product.isTop10}"/>    
                                    </div>  
                                    
                                        </div>
                                </div>

                            </div>

                            <div class="div-text-area">
                            <label class='input-label' for="descriptionBook-${product.id}">Sinopsis</label>
                            <textarea class='text-area-from-edit' type="text" name="descriptionBook-${product.id}" id="descriptionBook-${product.id}" value="${product.description}">${product.description}</textarea>
</div>
                        </div>   
    
    
    
    `

}

function modalToEdit(){
    products.forEach((product)=>{
        modalBooks.innerHTML += `
            <div id="modalEdit${product.id}" class="modal" style="overflow-y: scroll;">
                <div class="modal-content">
                    <span class="cerrar-modal" data-target="modal${product.id}" onclick="closeModalEdit(${product.id})">&times;</span>
                    <div class="modal-flex-container ">
                        <div class="modal-info">
                            <div class="div-img-and-title">
                                <div class="div-img">
                                    <label class='' for="imgBook-${product.id}">Imagen</label>
                                    <img class='img-modal-edit'  id="imgBook-${product.id}" src="${product.img}"/>
                                    <input class='' type="file" style="color: transparent" accept="image/*" onchange="fileUpload(${product.id})" name="fileBook-${product.id}" id="fileBook-${product.id}" src="${product.img}"/>
                                </div>

                                <div class="div-title">
                                    <label class='input-label' for="idBook-${product.id}">ID</label>
                                    <input class='input-form-edit' disabled type="text" name="idBook-${product.id}" id="idBook-${product.id}" value="${product.id}"/>
                                    
                                    <label class='input-label' for="titleBook-${product.id}">Título</label>
                                    <input class='input-form-edit' type="text" name="titleBook-${product.id}" id="titleBook-${product.id}" value="${product.title}"/>
                                    
                                    <label class='input-label' for="authorBook-${product.id}">Autor</label>
                                    <input class='input-form-edit' type="text" name="authorBook-${product.id}" id="authorBook-${product.id}" value="${product.author}"/>
                                    
                                    <label class='input-label' for="categoryBook-${product.id}">Categoria</label>
                                    <input class='input-form-edit' type="text" name="categoryBook-${product.id}" id="categoryBook-${product.id}" value="${product.category}"/>
                                    
                                    <label class='input-label' for="genderBook-${product.id}">Genero</label>
                                    <input class='input-form-edit' type="text" name="genderBook-${product.id}" id="genderBook-${product.id}" value="${product.gender}"/>
                                    
                                    <div class="div-price">
                                    <div style="margin-bottom: 15px">
                                        <label class='input-label' for="priceBook-${product.id}">Precio</label>
                                        <input class='input-form-edit' type="text" name="priceBook-${product.id}" id="priceBook-${product.id}" value="${product.price}"/>
                                    </div>

                                    <div> 
                                        <label class='input-label' for="checkboxNovelty-${product.id}">Es novedad</label>
                                        <input class='checkbox-form-edit' type="checkbox" name="checkboxNovelty-${product.id}" id="checkboxNovelty-${product.id}" value="${product.isNovelty}"/>
                                    </div>
                                    
                                    <div> 
                                        <label class='input-label' for="checkboxTop10-${product.id}">Es top 10</label>
                                        <input class='checkbox-form-edit' type="checkbox" name="checkboxTop10-${product.id}" id="checkboxTop10-${product.id}" value="${product.isTop10}"/>    
                                    </div>  
                                    
                                        </div>
                                </div>

                            </div>

                            <div class="div-text-area">
                            <label class='input-label' for="descriptionBook-${product.id}">Sinopsis</label>
                            <textarea class='text-area-from-edit' type="text" name="descriptionBook-${product.id}" id="descriptionBook-${product.id}" value="${product.description}">${product.description}</textarea>
</div>
                        </div>   
                    </div> 
                    <button class="btn-modal btn-add-cart" id="editProduct${product.id}" onclick="editProduct(${product.id})">Editar</button>
                </div>
            </div>
        `
    });
};

modalToEdit()

function fileUpload(idBook){
    let dataFile = document.getElementById(`fileBook-${idBook}`).files[0];
    let reader = new FileReader();
    reader.readAsDataURL(dataFile);
    reader.onloadend = function () {
        document.getElementById(`imgBook-${idBook}`).src = reader.result;
    }
}

function editProduct(idBook){
    let imgBook = document.getElementById(`imgBook-${idBook}`).src
    let titleBook = document.getElementById(`titleBook-${idBook}`).value
    let authorBook = document.getElementById(`authorBook-${idBook}`).value
    let categoryBook = document.getElementById(`categoryBook-${idBook}`).value
    let genderBook =  document.getElementById(`genderBook-${idBook}`).value
    let priceBook = document.getElementById(`priceBook-${idBook}`).value
    let noveltyBook = document.getElementById(`checkboxNovelty-${idBook}`).checked
    let top10Book = document.getElementById(`checkboxTop10-${idBook}`).checked
    let descriptionBook = document.getElementById(`descriptionBook-${idBook}`).value

    let productFound = products.find((prod)=>{return prod.id === idBook})
    console.log("editProduct -> productFound:", productFound)

    productFound.img = imgBook
    productFound.title = titleBook
    productFound.author = authorBook
    productFound.category = categoryBook
    productFound.gender = genderBook
    productFound.price = priceBook
    productFound.isNovelty = noveltyBook
    productFound.isTop10 = top10Book
    productFound.description = descriptionBook

    listOfProducts()
    closeModalEdit(idBook)
}

/////////////////////////////////////------------CARRITO-------------////////////////////////////////////////////////////////////////////

let cartList = []

function addToCart(bookId){
    slider.innerHTML = ""
    let exists = cartList.some(prod => parseInt(prod.id) === parseInt(bookId))
    if(exists){
        let addProduct = cartList.find(findProd => parseInt(findProd.id) === parseInt(bookId))
        addProduct.quantity = addProduct.quantity + 1 
        addProduct.subTotal = addProduct.price * addProduct.quantity       
    } else{
        const nuevoProducto = {...products[bookId-1]}
        cartList.push({...nuevoProducto, quantity: 1, subTotal:nuevoProducto.price})
    }
    productCounter();
    closeModal(bookId);
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
            <div class="cart-container">
                <img class="cart-1" src="${element.img}" alt="">
                <div class="cart-info-container">
                    <p class="cart-2">${element.title}</p>
                    <p class="cart-3">Ar$ ${element.price}</p>
                    <div class="cart-4"> 
                        <div class="counter-sym dec" onclick="decrease(${element.id})">-</div>
                        <div class="numCounter">${element.quantity}</div>
                        <div class="counter-sym inc" onclick="increase(${element.id})">+</div>
                    </div>
                    <p class="cart-5">Ar$ ${element.subTotal}</p>
                    <div class="cart-6">
                        <i class="fa-regular fa-circle-xmark fa-xl" onclick="deleteProduct(${element.id})"></i>
                    </div> 
                </div>    
            </div>
        `
    })
    createTotal()
    createCartButtons();
};

function increase(bookId){
    let findProduct = cartList.find((el)=> el.id === bookId);
    findProduct.quantity += 1;
    findProduct.subTotal = findProduct.price * findProduct.quantity;
    showCart();
    productCounter();
}

function decrease(bookId){
    let findProduct = cartList.find((el)=> el.id === bookId)
    if(findProduct.quantity >= 1){
    findProduct.quantity -= 1
    findProduct.subTotal = findProduct.price * findProduct.quantity
    }else{
        findProduct.quantity
        findProduct.subTotal
        deleteProduct(bookId)
    }
    showCart();
    productCounter()
}

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
            <div class="title-cart-container total-container">
                <div class="title-product">Total</div>
                <div class="div-title-cart">
                    <div></div>
                    <div class="title-price"></div>
                    <div><p class="title-quantity"></p></div>
                    <div class="title-subTotal total">Ar$ ${total}</div>
                    <div><div></div></div> 
                </div>    
            </div>
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
            <div class="title-cart-container">
                <div class="title-product">Producto</div>
                <div class="div-title-cart">
                    <div></div>
                    <div class="title-price">Precio</div>
                    <div> 
                        <p class="title-quantity">Cantidad</p>
                    </div>
                    <div class="title-subTotal">Subtotal</div>
                    <div>
                        <div></div>
                    </div> 
                </div>    
            </div>
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

const popUpMessage = document.querySelector('.popUpMessage');

function popUp(message){
    popUpMessage.innerHTML = `
        <div id="modal" class="modal">
            <div class="popUp-content">
                <div class="modal-flex-container ">
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

////////////////////-------------FORMULARIO CHECKOUT--------------////////////////////////////////////////////////////////////////////////

// const form = document.createElement("form")

// function createForm(){
//     form.setAttribute("id" , "form")
//     productList.appendChild(form)
// }

function finishBuying(){
    if(cartList.length !== 0){
    form.innerHTML = ""    
    title.innerHTML = `<p class="page-title">Checkout</p>`;
    productList.innerHTML = ""
    createForm();
    fields.forEach((field, index)=> {
        form.innerHTML += `
            <div class='input-container' >
                ${
                    field.option.length > 0 ? 
                    ` 
                        <label class='input-label' for="${field.idField}">${field.label}</label>
                        <select  class='input-field' name="nombre-tarjeta" id="${field.idField}">
                            <option class="option-select" value="">Seleccionar opción</option>
                            ${field.option.map((el)=>{ 
                                return `<option value="${el.nameOption}">${el.nameOption}</option>`
                            })}
                        </select>
                    `
                : 
                    `
                        <label class='input-label' for="${field.idField}">${field.label}</label>
                        <input class='input-field' type="${field.type}" name="${field.name}" id="${field.idField}"/>
                    `
                }
                    
                <p class="errorMessage" id="error-${field.idField}"></p>
            </div>    
        `
    })
    const formButton = document.createElement("button") 
    formButton.innerHTML = "Enviar"
    formButton.setAttribute("class" , "send-checkout-button")
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
        const enteredValue = document.getElementById(el.idField).value
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
    const div = document.getElementById(`error-${id}`)
    div.innerHTML = errorMessage
}

function validation(){
    let trueCounter = []
    fields.map((el)=> {if(el.errorMessage === ""){
        trueCounter.push(true)
    }})
    if(trueCounter.length === fields.length){
        let order = [...cartList]
        console.log("validation -> order:", order)
        title.innerHTML = `
            <p class="page-title confirmation-sending-form">
                <i class="fa-solid fa-circle-check"></i></i>Pedido confirmado. Detalle de su pedido
            </p>
        `
        productList.innerHTML = ""
        order.forEach((el)=>{
            productList.innerHTML += `<p>${el.author}</p>
            
            
            `;

        })
        
        cartList = [];
        productCounter();
        window.scrollTo(0, 0)
    }
}

//////////////////////////////-------FORMULARIO CONTACTO-------////////////////////////////////////////////////////////////

function contactForm(){
    slider.innerHTML = ""
    productList.innerHTML = "";
    title.innerHTML = `<p class="page-title">Contacto</p>`;

    contactFormFields.forEach((field)=>{   
        productList.innerHTML += `
            <div class='input-container contact-form-container' >
                ${
                    field.option.length > 0 ? 
                    ` 
                        <label class='input-label' for="idContactForm${field.idField}">${field.label}</label>
                        <select  class='input-field' name="nombre-tarjeta" id="idContactForm${field.idField}">
                            <option class="option-select" value="">Seleccionar opción</option>
                                ${field.option.map((el)=>{ 
                                    return `<option value="${el.nameOption}">${el.nameOption}</option>`
                                })}
                        </select>
                    `
                : 
                    `
                        <label class='input-label' for="idContactForm${field.idField}">${field.label}</label>
                        ${field.name !== "consulta" ? 
                            `<input class='input-field' type="${field.type}" name="${field.name}" id="idContactForm${field.idField}"/>`
                        :
                            `<textarea class='input-field' type="${field.type}" name="${field.name}" id="idContactForm${field.idField}"></textarea>`
                        }
                    `
                }
                <p class="errorMessage" id="error-${field.idField}"></p>
            </div>    
        `
    })

    const cleanBtn = document.createElement('button')
    cleanBtn.innerHTML = 'Limpiar el formulario'
    cleanBtn.setAttribute('class', 'btn-modal btn-contact-form-cleaner')
    cleanBtn.addEventListener('click', contactFormCleaner)
    productList.appendChild(cleanBtn)

    const sendBtn = document.createElement('button')
    sendBtn.innerHTML = 'Enviar'
    sendBtn.setAttribute('class', 'btn-modal btn-contact-form-cleaner')
    sendBtn.addEventListener('click', contactFormValidation)
    productList.appendChild(sendBtn)
    
    navHandler();
}

function contactFormCleaner(){
    contactFormFields.forEach((field) => {
        document.getElementById(`idContactForm${field.idField}`).value = ""
        document.getElementById(`error-${field.idField}`).innerHTML = ""
    })
}   

function contactFormValidation(e){
    e.preventDefault();
    contactFormFields.forEach((el, index) => {
        const enteredValue = document.getElementById(`idContactForm${el.idField}`).value
            el.value = enteredValue
        if(el.value.match(el.regex)){
            el.errorMessage = ""
            createErrorMessage(el.errorMessage, el.idField) 
        }else{
            el.errorMessage = el.message
            createErrorMessage(el.errorMessage, el.idField) 
        }
    })

    let trueCounter = []
    contactFormFields.map((el)=> {if(el.errorMessage === ""){
        trueCounter.push(true)
    }})
    if(trueCounter.length === contactFormFields.length){
        title.innerHTML = `
            <p class="page-title confirmation-sending-form">
                <i class="fa-solid fa-circle-check"></i></i>Formulario enviado con éxito
            </p>
        `
        productList.innerHTML = "" ;
        cartList = [];
        productCounter();
        window.scrollTo(0, 0)
    }

}