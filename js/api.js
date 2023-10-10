function searchBooks() {
    // Obtiene el valor del campo de búsqueda
    var searchTerm = document.getElementById('searchInput').value;

    // Construye la URL de la API de Google Books
    var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(searchTerm);

    // Realiza la solicitud a la API utilizando fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Maneja los datos de la respuesta
            displayResults(data.items);
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(books) {
    // Limpia los resultados anteriores
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    // Muestra cada libro en los resultados
    books.forEach(book => {
        var title = book.volumeInfo.title;
        var authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconocido';
        var image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'; // Imagen de relleno si no hay imagen disponible

        // Crea un elemento de resultado
        var resultItem = document.createElement('div');
        resultItem.className = 'carta';
        resultItem.innerHTML = `
            <img src="${image}" alt="Imagen del libro ${title}">
            <h2>${title}</h2>
            <p>Autores: ${authors}</p>
            <button class="btn-modal" data-target="modal1">Ver Detalles</button>
        `;

        // Agrega el resultado al contenedor
        resultsContainer.appendChild(resultItem);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Llama a la función para cargar las cartas de misterio al cargar la página
    loadMysteryBooks();
});

function loadMysteryBooks() {
    // Construye la URL de la API de Google Books para libros de misterio
    var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:mystery&maxResults=5';

    // Realiza la solicitud a la API utilizando fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Maneja los datos de la respuesta y muestra las cartas en la página
            displayMysteryResults(data.items);
        })
        .catch(error => console.error('Error:', error));
}

function displayMysteryResults(books) {
    // Obtén el contenedor donde se mostrarán las cartas
    var resultsContainer = document.getElementById('mysteryBooks');

    // Muestra cada libro en los resultados
    books.forEach(book => {
        var title = book.volumeInfo.title;
        var authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconocido';
        var image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

        // Crea un elemento de resultado
        var resultItem = document.createElement('div');
        resultItem.className = 'carta';
        resultItem.innerHTML = `
            <img src="${image}" alt="Imagen del libro ${title}">
            <h2>${title}</h2>
            <p>Autores: ${authors}</p>
            <button class="btn-modal" data-target="modal1">Ver Detalles</button>
        `;

        // Agrega el resultado al contenedor
        resultsContainer.appendChild(resultItem);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Llama a la función para cargar las cartas de cocina al cargar la página
    loadCookingBooks();
});

function loadCookingBooks() {
    // Construye la URL de la API de Google Books para libros de cocina
    var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:cooking&maxResults=5';

    // Realiza la solicitud a la API utilizando fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Maneja los datos de la respuesta y muestra las cartas en la página
            displayCookingResults(data.items);
        })
        .catch(error => console.error('Error:', error));
}

function displayCookingResults(books) {
    // Obtén el contenedor donde se mostrarán las cartas de cocina
    var resultsContainer = document.getElementById('cookingBooks');

    // Muestra cada libro en los resultados
    books.forEach(book => {
        var title = book.volumeInfo.title;
        var authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconocido';
        var image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

        // Crea un elemento de resultado
        var resultItem = document.createElement('div');
        resultItem.className = 'carta';
        resultItem.innerHTML = `
            <img src="${image}" alt="Imagen del libro ${title}">
            <h2>${title}</h2>
            <p>Autores: ${authors}</p>
            <button class="btn-modal" data-target="modal1">Ver Detalles</button>
        `;

        // Agrega el resultado al contenedor
        resultsContainer.appendChild(resultItem);
    });
}




