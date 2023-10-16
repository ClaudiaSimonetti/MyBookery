// Cargamos la info de los libro con la api usando vue

$(document).ready(function () {
    new Vue({
        el: '#app',
        data: {
            searchTerm: '',
            searchResults: [],
            mysteryBooks: [],
            cookingBooks: [],
            historiaBooks: [],
            romanceBooks: [],
            fantasyBooks: [],
            selfHelpBooks: [],
            scienceFictionBooks: [],
            bestsellerBooks: [],
            newBooks: [],
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


            loadHistoriaBooks() {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:historia';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.historiaBooks = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },



            loadRomanceBooks() {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:romance';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.romanceBooks = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },

            loadFantasyBooks() {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:fantasy';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.fantasyBooks = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },

            loadSelfHelpBooks() {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:self-help';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.selfHelpBooks = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },

            loadScienceFictionBooks() {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:science%20fiction';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.scienceFictionBooks = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },
            loadBestsellerBooks() {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:bestseller';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.bestsellerBooks = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },

            loadNewBooks() {
                var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:new';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.newBooks = data.items;
                    })
                    .catch(error => console.error('Error:', error));
            },

            redirectToDetails(book) {
                // Redireccionar a la nueva página de detalles
                window.location.href = `detalle.html?id=${book.id}`;
            },


            addToCart(book) {
                console.log('addToCart called!');

            },
        },
        mounted() {
            this.loadMysteryBooks();
            this.loadCookingBooks();
            this.loadHistoriaBooks();
            this.loadRomanceBooks();
            this.loadFantasyBooks();
            this.loadSelfHelpBooks();
            this.loadScienceFictionBooks();
            this.loadBestsellerBooks();
            this.loadNewBooks();

        },
    });
});

