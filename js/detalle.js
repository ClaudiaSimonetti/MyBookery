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

            // Realizamos la solicitud a la API para obtener detalles del libro
            const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('Book details:', data);
                    this.selectedBook = data;  // Corrige esta línea para asignar a selectedBook en lugar de bookDetails
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