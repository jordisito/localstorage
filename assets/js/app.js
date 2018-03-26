const listaTareasForm = document.querySelector(".ListaTareas-form"),
    listaTareasList = document.querySelector(".ListaTareas-list");

eventos();

function eventos() {
    listaTareasForm.addEventListener('submit', agregarTweets);
    // eliminar tweets
    listaTareasList.addEventListener('click', eliminarTweets);
    // mostrar elementos localStorage
    // cuando carga toda la pagina
    document.addEventListener('DOMContentLoaded', mostrarLocalStorageListo);
}

// agrega tweet al DOM
function agregarTweets(e) {
    e.preventDefault();
    let tweet = document.getElementById('tweet');

    // crear eliminar x de eliminar
    let botonEliminar = document.createElement('a');
    botonEliminar.classList = "botonEliminar";
    botonEliminar.setAttribute('href', '#');
    botonEliminar.innerText = "X";
    // crear elemento y añadir li
    let tweetList = document.createElement('li');

    if (tweet.value !== '') {
        tweetList.innerHTML = tweet.value;
        tweetList.classList = "ListaTareas-tweets-item";

        listaTareasList.appendChild(tweetList);
        tweetList.appendChild(botonEliminar);

        agregarTweetLocalStorage(tweet.value);
    }

    tweet.value = "";
}
// mostrarLocalStorageListo
function mostrarLocalStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet) {
        // crear eliminar x de eliminar
        let botonEliminar = document.createElement("a");
        botonEliminar.classList = "botonEliminar";
        botonEliminar.setAttribute("href", "#");
        botonEliminar.innerText = "X";
        // crear elemento y añadir li
        let tweetList = document.createElement("li");

        tweetList.innerHTML = tweet;
        tweetList.classList = "ListaTareas-tweets-item";

        listaTareasList.appendChild(tweetList);
        tweetList.appendChild(botonEliminar);
    });
}

// elimina tweet del DOM
function eliminarTweets(e) {
    e.preventDefault();
    if (e.target.className === 'botonEliminar') {
        e.target.parentElement.remove();
    }
    eliminarTweetsLocalStorage(e.target.parentElement.textContent);
}

// agregar a localStorage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.push(tweet);

    // convertir de string a arreglo para localStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// comprobar que haya elemenrtos en localStorage, y guardamos en un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;

    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function eliminarTweetsLocalStorage(tweet) {
    let tweets, tweetsBorrar;
    // elimina la x del tweet
    tweetsBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if (tweetsBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}