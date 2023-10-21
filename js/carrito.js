let cartList = loadCartFromLocalStorage();
let productList = document.getElementById('detalle-app');
productCounter();

const precios = [50, 75, 100, 150, 200];
function generarPrecioAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * precios.length);
    return precios[indiceAleatorio];
   
}

function productCounter() {
    const cartCounter = document.getElementById('cartCounter');
    if (cartCounter) {
        cartCounter.textContent = cartList.length.toString();
    }
}
function openCartModal() {


    if (currentBookDetails && typeof currentBookDetails === 'object' && currentBookDetails.volumeInfo) {
        const { title, authors } = currentBookDetails.volumeInfo;
        // Generar un precio aleatorio
        const price = generarPrecioAleatorio();

        const cartItem = {

            title,
            author: authors ? authors.join(', ') : 'Desconocido',
            price,
            quantity: 1,
        };

        cartList.push(cartItem);
        saveCartToLocalStorage(cartList);
        productCounter();
        const modalContent = `
            <div id="carrito-modal" class="modal">
                <div class="modal-content centered">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <h2>Detalles del Producto</h2>
                    <p>Libro: ${title}</p>
                    <p>Autor: ${cartItem.author}</p>
                    <p>Precio: ${cartItem.price}</p>
                    <button class="btn-modal-cart center-btn" onclick="showCart()">Ver Carrito</button>
                    <button class="btn-modal-cart center-btn " onclick="closeModal()">Cancelar</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalContent);
        const carritoModal = document.getElementById('carrito-modal');
        carritoModal.style.display = 'block';
    } else {
        console.error('Error: No hay detalles del libro actual o los detalles no son válidos.');
    }
}


function closeModal() {
    console.log('Cerrando modal del carrito...');

    const carritoModal = document.getElementById('carrito-modal');
    carritoModal.style.display = 'none';
}


function createConfirmationModalContent() {
    return `
        <div id="confirmation-modal" class="modal">
            <div class="modal-content">
                <div class="modal-flex-container">
                    <div class="modal-info ">
                        <p class="message-modal">Detalles del Producto:</p>
                        <!-- Mostrar detalles de la compra aquí -->
                        ${createPurchaseDetailsHTML()}
                        <button class="btn-modal-cart" onclick="finishBuying()">Ver Carrito</button>
                        <button class="btn-modal-cart" onclick="closePopUp()">Cancelar</button>
                    </div>   
                </div> 
            </div>
        </div>
    `;
}



let formParent = document.getElementById("miFormularioParent");

function createForm() {
    const formContainer = document.createElement("div");

    fields.forEach((field, index) => {
        formContainer.innerHTML += `
            <div class='input-container'>
                <label class='input-label' for="${field.name}">${field.name}</label>
                <input class='input-field' type="${field.type}" name="${field.name}" id="${field.name}"/>
                <p class="errorMessage" id="${field.idField}"></p>
            </div>    
        `;
    });

    const formButton = document.createElement("button");
    formButton.innerHTML = "Enviar";
    formButton.setAttribute("class", "btn-modal-cart");
    formButton.addEventListener("click", submit);

    formContainer.appendChild(formButton);

    // Asegúrate de que formParent existe antes de intentar agregar el formulario
    if (formParent) {
        formParent.appendChild(formContainer);
    } else {
        console.error("Elemento del formulario padre no encontrado.");
    }
}
function showCart() {
    closeModal();
    productList.innerHTML = "";
    let totalPrice = 0;

    // Título del carrito
    const cartTitleElement = document.createElement('h3');
    cartTitleElement.textContent = 'Carrito de Compras';
    cartTitleElement.style.textAlign = 'center';
    productList.appendChild(cartTitleElement);

    // Contador de elementos y precio total
    const cartInfoContainer = document.createElement('div');
    cartInfoContainer.style.textAlign = 'center';

    const cartCountElement = document.createElement('p');
    cartCountElement.textContent = `Cantidad de Elementos: ${cartList.length}`;
    cartInfoContainer.appendChild(cartCountElement);

    // Muestra los detalles del carrito
    if (cartList.length !== 0) {
        cartList.forEach((element, index) => {
            // Crea un elemento para cada producto en el carrito
            const cartProductElement = document.createElement('div');
            cartProductElement.classList.add('cart');
            cartProductElement.innerHTML = `
                
                <p>${element.title} - ${element.author}</p>
                <p>Precio Unitario: ${element.price}$</p>
                <button class="btn-modal-cart" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
            `;
            // Añade un margen o padding al botón de eliminar
            cartProductElement.style.marginBottom = '10px'; // Puedes ajustar el valor según sea necesario

            // Agrega el elemento al contenedor
            productList.appendChild(cartProductElement);
            // Suma el precio al total
            totalPrice += parseFloat(element.price);
        });

        // Agrega el precio total al contenedor
        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = `Total a Pagar: ${totalPrice}$`;
        cartInfoContainer.appendChild(totalPriceElement);

        // Agrega el contenedor al productList
        productList.appendChild(cartInfoContainer);

        // Botones alineados y centrados en una sola línea
        const buttonsContainer = document.createElement('div');
        buttonsContainer.setAttribute('class', 'botones');
        buttonsContainer.style.display = 'flex'; // Asegúrate de que sea un contenedor flexbox
        buttonsContainer.style.justifyContent = 'center'; // Centra los elementos horizontalmente
        buttonsContainer.style.alignItems = 'center'; // Centra los elementos verticalmente

        // Botón Vaciar Carrito
        const clearButton = document.createElement('button');
        clearButton.innerHTML = 'Vaciar Carrito';
        clearButton.setAttribute('class', 'btn-modal-cart boton');
        clearButton.addEventListener('click', clearCart);
        buttonsContainer.appendChild(clearButton);

        // Botón Pagar
        const finishButton = document.createElement('button');
        finishButton.innerHTML = 'Pagar   <i class="fa-solid fa-credit-card"></i>';
        finishButton.setAttribute('class', 'btn-modal-cart boton');
        finishButton.addEventListener('click', finishBuying);
        buttonsContainer.appendChild(finishButton);

        // Botón Seguir Comprando (siempre presente)
        const continueShoppingButton = document.createElement('button');
        continueShoppingButton.innerHTML = 'Seguir Comprando';
        continueShoppingButton.setAttribute('class', 'btn-modal-cart boton');
        continueShoppingButton.addEventListener('click', continueShopping);
        buttonsContainer.appendChild(continueShoppingButton);

        // Agrega los botones al productList
        productList.appendChild(buttonsContainer);

    } else {
        // Muestra un mensaje si no hay productos en el carrito
        const noItemsMessage = document.createElement('p');
        noItemsMessage.textContent = 'No hay productos en el carrito.';
        productList.appendChild(noItemsMessage);

        // Agrega el botón "Seguir Comprando" independientemente de si hay productos o no
        const continueShoppingButton = document.createElement('button');
        continueShoppingButton.innerHTML = 'Seguir Comprando';
        continueShoppingButton.setAttribute('class', 'btn-modal-cart boton');
        continueShoppingButton.addEventListener('click', continueShopping);
        productList.appendChild(continueShoppingButton);
    }
}


function continueShopping() {
    // Lógica para redirigir a index.html u otra página de productos
    window.location.href = 'index.html';
}

function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItem(index) {
    // Elimina el elemento del carrito en la posición index
    cartList.splice(index, 1);
    // Guarda la lista actualizada en el localStorage
    saveCartToLocalStorage(cartList);
    // Actualiza la interfaz del carrito después de eliminar un elemento
    showCart();
    productCounter();
}

function clearCart() {
    // Vacía el carrito
    cartList = [];
    // Guarda la lista vacía en el localStorage
    saveCartToLocalStorage(cartList);
    // Actualiza la interfaz del carrito después de vaciarlo
    showCart();
    productCounter();
}


function finalizePurchase() {
    // Obtener los valores de los campos del formulario
    const formData = {};
    let formIsValid = true;

    fields.forEach((field, index) => {
        const inputElement = document.getElementById(field.name);

        const errorMessageElement = document.getElementById(field.idField);

        
    }); 
    if (formIsValid) {
        localStorage.setItem('formData', JSON.stringify(formData));

        // Redirigir a la página de confirmación
        window.location.href = 'confirmacion.html';
    }
}
const form = document.createElement("div");
const title = document.getElementById('yourTitleId');

function finishBuying() {
    if (cartList.length !== 0) {
        // form.innerHTML = "";
        // title.innerHTML = `<p class="page-title">Checkout</p>`;
        productList.innerHTML = "";
        createForm();
    } else {
        popUp("El carrito debe contener al menos 1 producto.");
        openPopUp();
    }
}

function submit(e) {
    e.preventDefault();
    fields.forEach((el, index) => {
        const enteredValue = document.getElementById(el.name).value;
        el.value = enteredValue;
        if (el.value.match(el.regex)) {
            el.errorMessage = "";
            createErrorMessage(el.errorMessage, el.idField);
        } else {
            el.errorMessage = el.message;
            createErrorMessage(el.errorMessage, el.idField);
        }
    });
    validation();
}

function createErrorMessage(errorMessage, id) {
    const div = document.getElementById(`${id}`);
    div.innerHTML = errorMessage;
}

function validation() {
    if (
        fields[0].errorMessage === "" &&
        fields[1].errorMessage === "" &&
        fields[2].errorMessage === "" &&
        fields[3].errorMessage === "" &&
        fields[4].errorMessage === "" &&
        fields[5].errorMessage === "" &&
        fields[6].errorMessage === "" &&
        fields[7].errorMessage === "" &&
        fields[8].errorMessage === "" &&
        fields[9].errorMessage === ""
    ) {
        title.innerHTML = `<p class="page-title confirmation-sending-form">
                                <i class="fa-solid fa-circle-check"></i> Formulario enviado con éxito
                            </p>`;
        productList.innerHTML = "";
        cartList = [];
        productCounter();
        window.scrollTo(0, 0);
    }
}

