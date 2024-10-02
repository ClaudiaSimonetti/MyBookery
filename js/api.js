fetch('https://api.bluelytics.com.ar/json/last_price')
.then(response => response.json())  
.then(data => getExchange(data))   
// .catch(err => console.log('Hubo un error', err)); 