 // Variable global para almacenar los detalles del libro actual
let currentBookDetails = null;
 
 // Cargamos los detalles de cada libro en la página detalles usando vue

new Vue({
    el: '#detalle-app',
    data: {
        selectedBook: null,
    },
    methods: {
        fetchBookDetails() {
            // Obtenemos el ID del libro de la URL
            const urlParams = new URLSearchParams(window.location.search);
            const bookId = urlParams.get('id');

            if (!bookId) {
                console.error('Error: Book ID is missing in the URL');
                return;
            }

            
            const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('Book details:', data);
                    currentBookDetails = data;
                    this.selectedBook = data;  
                })
                .catch(error => console.error('Error fetching book details:', error));
        },
        goBack() {
            // Redirige a index.html
            window.location.href = 'index.html';
        },
    },
    mounted() {
        // Cargamos los detalles del libro al cargar la página
        this.fetchBookDetails();
    },
});