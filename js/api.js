// new Vue({
//     el: '#app',
//     data: {
//       searchTerm: '',
//       searchResults: [],
//       mysteryBooks: [],
//       cookingBooks: [],
//     },
//     methods: {
//       searchBooks() {
//         var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(this.searchTerm);

//         fetch(apiUrl)
//           .then(response => response.json())
//           .then(data => {
//             this.searchResults = data.items;
//             // También actualiza los resultados de misterio y cocina con los resultados generales
//             this.mysteryBooks = data.items;
//             this.cookingBooks = data.items;
//           })
//           .catch(error => console.error('Error:', error));
//       },
//       loadMysteryBooks() {
//         var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:mystery&maxResults=5';

//         fetch(apiUrl)
//           .then(response => response.json())
//           .then(data => {
//             this.mysteryBooks = data.items;
//           })
//           .catch(error => console.error('Error:', error));
//       },
//       loadCookingBooks() {
//         var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:cooking&maxResults=5';

//         fetch(apiUrl)
//           .then(response => response.json())
//           .then(data => {
//             this.cookingBooks = data.items;
//           })
//           .catch(error => console.error('Error:', error));
//       },
//     },
//     mounted() {
//       // Llama a las funciones para cargar los libros al cargar la página
//       this.loadMysteryBooks();
//       this.loadCookingBooks();
//     },
//   });

// new Vue({
//     el: '#app',
//     data: {
//         searchTerm: '',
//         searchResults: [],
//         mysteryBooks: [],
//         cookingBooks: [],
//     },
//     methods: {
//         testClick() {
//             console.log('Button clicked!');
//           },
//         searchBooks() {
//             console.log('searchBooks clicked!');
//         },
//         loadMysteryBooks() {
//             var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:mystery&maxResults=5';

//             fetch(apiUrl)
//                 .then(response => response.json())
//                 .then(data => {
//                     this.mysteryBooks = data.items;
//                 })
//                 .catch(error => console.error('Error:', error));
//         },
//         loadCookingBooks() {
//             var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:cooking&maxResults=5';

//             fetch(apiUrl)
//                 .then(response => response.json())
//                 .then(data => {
//                     this.cookingBooks = data.items;
//                 })
//                 .catch(error => console.error('Error:', error));
//         },
//     },
//     mounted() {
//         this.loadMysteryBooks();
//         this.loadCookingBooks();
//     },
// });


new Vue({
    el: '#app',
    data: {
        searchTerm: '',
        searchResults: [],
        mysteryBooks: [],
        cookingBooks: [],
    },
    methods: {
        
        searchBooks: function () {
            console.log('searchBooks inside Vue called!');
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
    },
    mounted() {
        this.loadMysteryBooks();
        this.loadCookingBooks();
    },
});

function searchBooks() {
    console.log('searchBooks outside Vue called!');
    var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(this.searchTerm);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            this.searchResults = data.items;
        })
        .catch(error => console.error('Error:', error));
}