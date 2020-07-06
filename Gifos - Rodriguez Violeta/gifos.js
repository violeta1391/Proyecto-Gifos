
// FUNCIONES CAMBIO DE TEMA //

function myFunNigth() {
    localStorage.setItem('fondo', "styleNight")
    fondo.classList.add("styleNight");
}

function myFunDay() {
    localStorage.setItem('fondo', "styleDay")
    fondo.classList.remove("styleNight");
}

function bodyStyle() {
    const color = localStorage.getItem('fondo')
    if (color === null) {
        console.log("tema predeterminado")
    } if (color === "styleDay") {
        fondo.classList.remove("styleNight");
    }
    else {
        fondo.classList.add("styleNight");
    }
}

window.onload = bodyStyle();


// FUNCION VISIBLE - NO VISIBLE // 

function noVisible(elemento) {
    elemento.style.display = 'none';
}
function visible(elemento) {
    elemento.style.display = 'block';
}

// Borrar contenido anterior

function cambiarContenido(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
};

// FUNCION BUSCAR GIF //   

function buscarGifos(q, idDiv, n, j) {
    const urlGifos = `${path}${j}api_key=${apikey}&limit=${n}&q=${q}`;
    fetch(urlGifos).then(function (res) {
        return res.json()
    }).then(function (json) {
        console.log(json.data[0].images.fixed_width.url)
        const resultados = document.getElementById(idDiv)
        let resultsHTML = ' '
        json.data.forEach(function (obj) {
            console.log(obj)
            resultsHTML += `<div>
                                <img src="${obj.images.fixed_width.url}"
                                     alt = "${obj.title}">
                                <p  class="pNoVisible" id="pNoVisible">"${obj.title}"</p>                            
                            </div>`
        })
        resultados.innerHTML = resultsHTML
    }).catch(function (err) {
        console.log(err.message)
    })
}

// FUNCION VER MAS //

function verMas(q, pSug) {
    buscarGifos(q, 'results', 20, searchQ);
    document.querySelectorAll(".tendencias div p")[0].innerHTML = pSug;
    noVisible(sugerencias);
}

// ************************** //

//BUSCADOR DE GIFS

// Opciones del buscador 

inputOp.addEventListener('click', function (e) {
    e.preventDefault()
    visible(opciones);
})
inputOp.addEventListener('input', function (e) { 
    e.preventDefault()
    noVisible(opciones);
})

opUno.addEventListener('click', function (e) {
    e.preventDefault()
    noVisible(opciones);
    verMas('kittens', 'Kittens')
})
opDos.addEventListener('click', function (e) {
    e.preventDefault()
    noVisible(opciones);
    verMas('puppies', 'Puppies')
})
opTres.addEventListener('click', function (e) {
    e.preventDefault()
    noVisible(opciones);
    verMas('unicornios', 'Unicorns')
})


// ************************** //

//SUGERENCIAS 

window.onload = cuatroSugerencias();

function cuatroSugerencias() {
    buscarGifos('jonathan vanness honey', 'jVannes', 1, searchQ);
    buscarGifos('sailor mercury', 'sailorM', 1, searchQ);
    buscarGifos('fab five', 'fabFive', 1, searchQ);
    buscarGifos('unicornio', 'unicorns', 1, searchQ);   
}

// ************************** //

// TENDENCIAS

window.onload = funTendencias();

function funTendencias() {
    buscarGifos('', 'results', 15, trending);
}

// ************************** //


// LocalStorage 

let btnHistorial = localStorage.getItem('botonesHistorial');
let historyArray = [];

if (btnHistorial === null || btnHistorial === undefined) {
    console.log('No save query');
} else {
    historyArray.splice(-1, 0, btnHistorial.split(','));
    historyArray[0].forEach((q) => {
        const urlHistory = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=10`

        const historyButton = document.createElement('button');
        botonesHistorial.appendChild(historyButton).innerHTML = `#${q}`;

        historyButton.addEventListener('click', () => {
            useRequest(urlHistory).then(response => {

                cambiarContenido(busquedas);
                noVisible(sugerencias);
                noVisible(tendencias);
                visible(secBusquedas);

                agregarGif(response, busquedas);
                busqueda.innerHTML = `${q}`;             
            });
        });
    });
}


// Buscar gif

buscarButton.addEventListener('click', e => {
    e.preventDefault();

    const q = document.getElementById('inputBuscador').value;
    const urlApi = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=10`;

    cambiarContenido(busquedas);
    noVisible(sugerencias);
    noVisible(tendencias); 

    useRequest(urlApi).then(response => {
        
        agregarGif(response, busquedas);

        visible(secBusquedas);

        const historyButton = document.createElement('button');
        botonesHistorial.appendChild(historyButton).innerHTML = `#${q}`;
        historyArray.push(q);        
        localStorage.setItem('botonesHistorial', historyArray);
        
        busqueda.innerHTML = `${q}`;
        inputOp.value = '';
        inputOp.placeholder = 'Busca gifs, hashtags, temas, busca lo que quieras…';

    })
});

function agregarGif(response, output) {
    response.data.forEach(object => {
        let createdElement = document.createElement('img');
        output.appendChild(createdElement).src = object.images.fixed_height.url;
        createdElement.alt = object.title;
    })
};


// Traer Hashtags

function getHashtags(gif) {
    let hashtags = ""
    let slugArray = gif.slug.split('-')
    slugArray.pop()

    if (slugArray.length !== 0) {

        slugArray = slugArray.map(e => `#${error}`)

        if (slugArray.length > 3) {
            slugArray.splice(2, slugArray.length - 1)
        }
        hashtags = slugArray.join(' ')
    } else {

        if (gif.title != "") {

            let title = gif.title.trim()
            title = title.substring(0, title.indexOf(" GIF"))
            hashtags = title.split(' ').map(error => `#${error}`).join(' ')
        }
    }
    return hashtags;
}

// Async req - traer gif

async function useRequest(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

// Treaer gif del LocalStorage

let guardandoGifos = localStorage.getItem('arrayGifs')
const urlTraerGif = `https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${guardandoGifos}`; 

function traerMisGifs(output) {
    if (guardarGif) {
        fetch(urlTraerGif)
            .then(res => {
                return res.json()

            }).then(response => {
                agregarGif(response, output)
            })
            .catch(error => {
                console.log(error)
            })
    }
}