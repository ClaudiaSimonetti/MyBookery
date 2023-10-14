// $(document).ready(function () {
//     new Vue({
//         el: '#app',
//         data: {
//             searchTerm: '',
//             searchResults: [],
//             mysteryBooks: [],
//             cookingBooks: [],
//             selectedBook: null,
//         },
//         methods: {
//             searchBooks: function () {
//                 var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(this.searchTerm);
        
//                 fetch(apiUrl)
//                     .then(response => response.json())
//                     .then(data => {
//                         this.searchResults = data.items;
//                     })
//                     .catch(error => console.error('Error:', error));
//             },
//             loadMysteryBooks() {
//                 var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:mystery';

//                 fetch(apiUrl)
//                     .then(response => response.json())
//                     .then(data => {
//                         this.mysteryBooks = data.items;
//                     })
//                     .catch(error => console.error('Error:', error));
//             },
//             loadCookingBooks() {
//                 var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:cooking';

//                 fetch(apiUrl)
//                     .then(response => response.json())
//                     .then(data => {
//                         this.cookingBooks = data.items;
//                     })
//                     .catch(error => console.error('Error:', error));
//             },
//             openModal(book) {
//                 console.log('openModal called!');
//                 this.selectedBook = book;
//             },
//             addToCart(book) {
//                 console.log('addToCart called!');
//                 // Lógica para agregar al carrito
//             },
//         },
//         mounted() {
//             this.loadMysteryBooks();
//             this.loadCookingBooks();
//         },
//     });
// });

$(document).ready(function () {
    new Vue({
        el: '#app',
        data: {
            searchTerm: '',
            searchResults: [],
            mysteryBooks: [],
            cookingBooks: [],
            selectedBook: null,
            
      
   },
        methods: {
            searchBooks: function () {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(this.searchTerm);

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.searchResults = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },
            loadMysteryBooks() {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:mystery';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.mysteryBooks = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },
            loadCookingBooks() {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:cooking';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.cookingBooks = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },
            // openModal(book) {
            //     console.log('openModal called!', book);
            
            //     if (!book) {
            //         console.error('Error: Book is null or undefined');
            //         return;
            //     }
            
            //     // Si los detalles del libro no están cargados, realiza una nueva solicitud a la API
            //     const apiUrl = `https://www.googleapis.com/books/v1/volumes/${book.id}`;
            //     fetch(apiUrl)
            //         .then(response => response.json())
            //         .then(data => {
            //             console.log('API response:', data);
            //             this.selectedBook = data;
            
            //             // Mostrar el modal después de asegurarse de que los datos estén actualizados
            //             this.$nextTick(() => {
            //                 console.log('Setting isModalVisible to true');
            //                 this.isModalVisible = true;
            //             });
            //         })
            //         .catch(error => console.error('Error fetching book details:', error));
            // },
            
            // closeModal() {
            //     console.log('closeModal called!');
            //     this.selectedBook = null;
            //     console.log('Selected Book after closing modal:', this.selectedBook);
            // },

            redirectToDetails(book) {
                // Redireccionar a la nueva página de detalles
                window.location.href = `detalle.html?id=${book.id}`;
            },


            addToCart(book) {
                console.log('addToCart called!');
                // Lógica para agregar al carrito
            },
        },
        mounted() {
            this.loadMysteryBooks();
            this.loadCookingBooks();
            
        },
    });
});