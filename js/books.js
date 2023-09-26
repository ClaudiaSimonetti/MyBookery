// cartas y modal 

// // Obtener todos los botones de apertura de modal
// const btnsModal = document.querySelectorAll('.btn-modal');

// // Agregar un evento de clic a cada botón de apertura de modal
// btnsModal.forEach(btn => {
//     btn.addEventListener('click', () => {
//         const targetModalId = btn.getAttribute('data-target');
//         const modal = document.getElementById(targetModalId);

//         // Mostrar el modal
//         modal.style.display = 'block';

//         // Agregar un evento de clic al botón de cierre del modal
//         const cerrarModal = modal.querySelector('.cerrar-modal');
//         cerrarModal.addEventListener('click', () => {
//             modal.style.display = 'none';
//         });

//         // Cerrar el modal cuando se hace clic fuera de él
//         window.addEventListener('click', (e) => {
//             if (e.target === modal) {
//                 modal.style.display = 'none';
//             }
//         });
//     });
// });

// Obtener todos los botones "Ver Detalles"
const btnModals = document.querySelectorAll('.btn-modal');

// Agregar un evento clic a cada botón
btnModals.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // Obtener el modal correspondiente al botón clickeado
        const modal = document.getElementById(`modal${index + 1}`);
        
        // Mostrar el modal
        modal.style.display = 'block';

        // Agregar un evento clic al botón de cerrar dentro del modal
        const cerrarModal = modal.querySelector('.cerrar-modal');
        cerrarModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Agregar un evento clic al botón "Agregar al Carrito"
        const addToCartBtn = modal.querySelector(`#addToCart${index + 1}`);
        addToCartBtn.addEventListener('click', () => {
            // Aquí puedes agregar la lógica para agregar el libro al carrito
            // Puedes utilizar una variable para llevar un registro de los libros en el carrito
            // Por ejemplo: let carrito = [];

            // Luego, puedes agregar el libro al carrito, por ejemplo:
            // carrito.push({ title: "Título del Libro 1", price: XX.XX });

            // Y actualizar el contador del carrito (`.unit-counter`) con la cantidad de libros en el carrito.
        });
    });
});