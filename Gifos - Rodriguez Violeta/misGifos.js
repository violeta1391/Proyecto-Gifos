
// FUNCIONES CAMBIO DE TEMA //

window.onload = bodyStyle();

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

//Cambio de ventanas 

function noVisible(elemento) {
    elemento.style.display = 'none';
}
function visible(elemento) {
    elemento.style.display = 'block';
}

function displayFlex(elemento) {
    elemento.style.display = 'flex';
}
// Cambios de Stylos 

function styleComenzar() {
    pCrear.innerHTML = 'Un Chequeo Antes de Empezar';
    noVisible(texto);
    noVisible(ventana);
    noVisible(btnComenzarCaptura);
    visible(video);
    visible(cerrar);
    displayFlex(botonCapturar);
    visible(iconoCamara);
    crearGifs.style.height = '548px';
    crearGifs.style.width = '860px';
}

function styleCapturar() {
    pCrear.innerText = "Capturando tu guifo"
    noVisible(iconoCamara);
    noVisible(botonCapturar);
    visible(contadorTiempo);
    visible(botonListo);
    displayFlex(iconoCirculo);
}

function styleListo() {
    pCrear.innerText = "Vista Previa"
    noVisible(video);
    noVisible(botonListo);
    noVisible(iconoCirculo);
    noVisible(cerrar);
    visible(imgForward);
    displayFlex(botonReCap);
    displayFlex(btnSubirGif);
    visible(barPg);
    imgForward.src = url
    displayFlex(imgForwardTres);
}

function styleRepCap() {
    pCrear.innerText = "Un chequeo antes de empezar"
    noVisible(contadorTiempo);
    noVisible(btnSubirGif);
    noVisible(botonReCap);
    noVisible(imgForward);
    noVisible(imgForwardTres);
    noVisible(barPg);
    visible(botonCapturar);
    visible(iconoCamara);
    visible(video);
    visible(cerrar);
}

function styleSubirGif() {
    pCrear.innerHTML = 'Subiendo Guifo'
    visible(btnCancelarCap);
    visible(cerrar);
    noVisible(btnSubirGif);
    noVisible(botonReCap);
    noVisible(videoGif);
    noVisible(imgForward);
    noVisible(imgForwardTres);
    noVisible(contadorTiempo);

    visible(subiendoGifo);
    barPg.classList.add("barSubiendo");
}

function styleCancelarCap() {
    pCrear.innerHTML = 'Vista Previa'
    noVisible(subiendoGifo);
    noVisible(btnCancelarCap);
    noVisible(copiarDescargarGif);
    noVisible(barPg);
    visible(btnSubirGif);
    visible(botonReCap);
    visible(imgForward);
    visible(contadorTiempo);
}

function styleGifExitoso() {
    pCrear.innerHTML = 'Guifo subido con éxito'
    noVisible(subiendoGifo);
    noVisible(btnCancelarCap);
    noVisible(barPg);
    visible(copiarDescargarGif);
    visible(imgForwardDos);
    imgForwardDos.src = url
    crearGifs.style.height = '391px';
    crearGifs.style.width = '721px';
}


// ************************** //

// CREAR GIFS //

//Comenzar 

btnComenzar.addEventListener('click', () => {
    styleComenzar()
    activarCamara()
});

function activarCamara() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: 434,
            width: 844,
        }
    })
        .then(function (camera) {
            video.srcObject = camera;
            video.play()
        })
};


//Cancelar

btnCancelar.addEventListener('click', () => {
    noVisible(crearGifs);
});


// ************************** //

// CAPTURAR // 

let seconds;
let date = new Date()
date.setHours(00, 00, 00);
let recorder = null;

botonCapturar.addEventListener('click', async () => {

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    capturarGif(stream);

    styleCapturar();
    tiempoCapturar();
});

function capturarGif(stream) {
    recorder = new RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        grabandoGif: function () {
            console.log('Está grabando')
        },
    });
    recorder.startRecording();
}

function tiempoCapturar() {
    let contador = setInterval(function () {
        segundos = date.getSeconds();
        segundos++
        date.setSeconds(segundos);

        let dateTemp = `0${date.getHours()}:0${date.getMinutes()}:0${date.getSeconds()}`
        contadorTiempo.innerHTML = dateTemp

        barPg.max = segundos;

        botonListo.onclick = () => {
            clearInterval(contador);
        }
    }, 1000);
}

//Detener captura 

let blob = null
let url = ""
let progreso = 0;
let clearIncrementSeconds;

botonListo.addEventListener('click', async () => {
    await recorder.stopRecording();
    blob = await recorder.getBlob();
    url = URL.createObjectURL(blob);
    styleListo();
    clearIncrementSeconds = setInterval(barraProgreso, 2000);
});

function barraProgreso() {
    if (progreso < segundos) {
        progreso += 1;
        barPg.value = progreso;
    } else {
        progreso = 0;
        barraProgreso();
    }
};


// Repetir captura 

botonReCap.addEventListener('click', () => {
    styleRepCap()

    date.setHours(00, 00, 00);
    contadorTiempo.innerHTML = "0:0:0"
    clearInterval(clearIncrementSeconds);
});


// Subir gif

const controller = new AbortController();
const signal = controller.signal;

btnSubirGif.addEventListener('click', () => {
    styleSubirGif();
    clearInterval(clearIncrementSeconds);
    eviarGif();
});

function eviarGif() {
    let formData = new FormData();
    formData.append("file", blob, "myGif.gif");

    const options = {
        method: 'POST',
        body: formData,
        signal: signal
    };

    fetch(uploadURL, options)
        .then(response => {
            return response.json();
        })
        .then(json => {
            const gifObject = json;
            guardarGif(gifObject.data.id);
            const copyID = json.data.id;
            const getApiURL = `https://api.giphy.com/v1/gifs/${copyID}?api_key=${apikey}&gif_id=${copyID}`;
            traerURL(getApiURL);

            styleGifExitoso();
        })
        .catch(error => {
            console.log(error)
        })
}

// Cancelar captura 

btnCancelarCap.addEventListener('click', () => {
    controller.abort();
    styleCancelarCap();
    console.log('Captura cancelada');
});


// ************************** //

// GUARDAR GIF //

// Descargar gif o copiar url //

function copiarURL(text) {
    const textOculto = document.createElement("textarea");
    document.body.appendChild(textOculto);
    textOculto.value = text;
    textOculto.select();
    document.execCommand("copy");
    document.body.removeChild(textOculto);
};

let gifURL;

function traerURL(url) {
    useReq(url).then(response => {
        gifURL = response.data.url
    })
};

botonUrl.addEventListener('click', () => {
    try {
        copiarURL(gifURL)
    } catch (e) {
        alert('El enlace no pudo ser copiado');
    }
});

btnGuardar.addEventListener('click', () => {
    invokeSaveAsDialog(blob);
});

listoDos.addEventListener('click', () => {
    contadorTiempo.innerHTML = "0:0:0"
    date.setHours(00, 00, 00);
    window.location = '';
});


// Guardar y mostrar mis gifs //

let arrayGifs = []

function guardarGif(gifID) {
    if (localStorage.getItem('arrayGifs') == null) {
        arrayGifs.push(gifID)
    } else {
        arrayGifs = localStorage.getItem('arrayGifs').split(',')
        arrayGifs.push(gifID)
    }
    localStorage.setItem('arrayGifs', arrayGifs.join())
};

let guardandoGifos = localStorage.getItem('arrayGifs')
const urlTraerGif = `https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${guardandoGifos}`;

function traerMisGifs(output) {
    if (guardandoGifos) {
        fetch(urlTraerGif)
            .then(res => {
                return res.json()

            }).then(response => {
                agregarGif(response, output)
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        pMisGifs.innerHTML = 'No hay GiFs Creados!';
    }
};

function agregarGif(response, output) {
    response.data.forEach(object => {
        const elemento = document.createElement('img');
        output.appendChild(elemento).src = object.images.fixed_height.url;
        elemento.alt = object.title;
    })
};

// Async req - traer gif

async function useReq(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
};


// ************************** //

//Cargar mis gifs //

window.onload = traerMisGifs(misGuifos);

