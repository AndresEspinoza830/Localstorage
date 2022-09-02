//Variables
const listaTweets = document.getElementById('id__lista__tweets');


//Event Listeners

const eventListeners = () =>{

    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    //Borrar Tweets
    listaTweets.addEventListener('click' , borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded' , localStorageListo);

}

//Añadir tweet al formulario
const agregarTweet = (e) =>{
    e.preventDefault();

    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;

    //Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList='borrar__tweet';
    botonBorrar.innerText='X';

    //Crear el elemento y añadirle el contenido a la lista
    const li= document.createElement('li');
    li.innerText= tweet;

    //Añade el boton de borrar de borrar al tweet
    li.appendChild(botonBorrar);
    //Añade el tweet a la lista
    listaTweets.appendChild(li);

    agregarTweetLocalStorage(tweet);

}

//Elimina el tweet del DOM 
const borrarTweet = (e) =>{
    e.preventDefault();
    if(e.target.className === 'borrar__tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }  
}

//Mostrar datos del localstorage en la lista
const localStorageListo = () =>{
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    tweets.map((tweet) => {
        
        //Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList='borrar__tweet';
        botonBorrar.innerText='X';
    
        //Crear el elemento y añadirle el contenido a la lista
        const li= document.createElement('li');
        li.innerText= tweet;
    
        //Añade el boton de borrar de borrar al tweet
        li.appendChild(botonBorrar);
        //Añade el tweet a la lista
        listaTweets.appendChild(li);
    })
}


//Agrega tweet a local storage
const agregarTweetLocalStorage = (tweet) =>{
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    //Añadir el nuevo tweet
    tweets.push(tweet);

    //Convertir de string a arreglo para local storage
    localStorage.setItem('tweets' , JSON.stringify(tweets));
}


//Comprar que haya elementos en localStorage, retorna un arreglo
const obtenerTweetsLocalStorage =() =>{
    let tweets;

     //Revisamos los valores del localstorage
     if(localStorage.getItem('tweets') === null){
        tweets = [];
     }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
     }
     return tweets;
}

//Eliminar tweet del localstorage
 const borrarTweetLocalStorage = (tweet) =>{

    let tweets, tweetBorrar;

    //Elimina la X del tweet
    tweetBorrar=tweet.substring(0, tweet.length-1);

    tweets = obtenerTweetsLocalStorage();

    tweets.map((tweet ,index) =>{
        if(tweetBorrar == tweet){
            tweets.splice(index,1);
        }
    });

    localStorage.setItem('tweets' , JSON.stringify(tweets));
    
 }


eventListeners();

