
const fondo = document.body;

// Constantes Giphy

const apikey = '3rgcn6ZM7C3d5wVCYy2YuN7r1CrNpR1O';

const uploadURL = `https://upload.giphy.com/v1/gifs?api_key=${apikey}`; 

const path = `https://api.giphy.com/v1/gifs/`; 

const searchQ = 'search?q=&'; 

const trending = 'trending?';


// ************************** //

//BUSCADOR DE GIFS

const inputOp = document.getElementById('inputBuscador');

const buscadorPrincipal = document.getElementById('buscadorPrincipal');

const sugerencias = document.getElementById("sugerencias")

const buscarButton = document.getElementById('buscarButton');

// Opciones del buscador 

const opciones = document.getElementById("opcionesBuscador");

const opUno = document.getElementById('opUno');
const opDos = document.getElementById('opDos');
const opTres = document.getElementById('opTres');

// Buscar gif y localStorage

const botonesHistorial = document.getElementById('botonesHistorial');

const parBusquedas = document.getElementById('parBusquedas'); // searchOutputTitle

const busqueda = document.getElementById('busqueda'); //searchOutTitleText



const tendencias = document.getElementById('secTend'); //searchOutput

const busquedas = document.getElementById('resultsBusq');

const secBusquedas = document.getElementById('busquedas');


// ************************** //

// MIS GUIF0S 

// Constantes de Botones 

const btnComenzar = document.getElementById('btnComenzar'); 

const botonCapturar = document.getElementById('botonCapturar'); 

const botonListo = document.getElementById('botonListo'); 

const botonReCap = document.getElementById('botonReCap'); 

const btnSubirGif = document.getElementById('btnSubirGif'); 

const btnCancelarCap = document.getElementById('btnCancelarCap'); 

const botonUrl = document.getElementById('botonUrl'); 

const btnGuardar = document.getElementById('btnGuardar'); 

const listoDos = document.getElementById('listoDos'); 


// Constantes: imagenes, iconos y párrafos

const iconoCirculo = document.getElementById('iconoCirculo'); 

const iconoCamara = document.getElementById('iconoCamara'); 

const imgForward = document.getElementById('imgForward'); 

const imgForwardDos = document.getElementById('imgForwardDos') 

const cerrar = document.getElementById('cerrar');

const video = document.getElementById('videoGif'); 

const pCrear = document.getElementById('pCrear'); 

const pMisGifs = document.getElementById('pMisGifs');  


// Contador de tiempo 

const barPg = document.getElementById('barPg'); 

const pTiempo = document.getElementById('pTiempo'); 

const contadorTiempo = document.getElementById('contadorTiempo');


// Constantes Secciones 

const misGuifos = document.getElementById('misGuifos');

const capturarGifo = document.getElementById('capturarGifo'); 

const subiendoGifo = document.getElementById('subiendoGifo'); 

const misGifs = document.getElementById('misGifs');

const crearGifs = document.getElementById('crearGifs');

const ventana = document.getElementById('ventana');

const texto = document.getElementById('texto');

const copiarDescargarGif = document.getElementById('copiarDescargarGif');

