// ------ CARRITO -------
const { createApp } = Vue;

createApp({
  data() {
    return {
      carrito: [] // empieza vacío
    };
  },
  methods: {
    mostrarCarrito() {
      console.log("Carrito abierto");
    }
  }
}).mount("#app");







// ------ CARROUSEL -------


const track = document.querySelector(".carrusel-track");
const slides = document.querySelectorAll(".slide");

let index = 1;
const DELAY = 2000;




function actualizarCarrusel(animate = true){
  track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
  track.style.transform = `translateX(-${index * 100}%)`;
}



// Posición inicial
actualizarCarrusel(false);

// Autoplay
setInterval(() => {
  index++;
  actualizarCarrusel();

  // Si llegamos al clon final
  if (index === slides.length - 1) {
    setTimeout(() => {
      index = 1;
      actualizarCarrusel(false);
    }, 500);
  }

  // Si llegamos al clon inicial (por seguridad)
  if (index === 0) {
    setTimeout(() => {
      index = slides.length - 2;
      actualizarCarrusel(false);
    }, 500);
  }
}, DELAY);




// ------ login -------

^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
^\+?[0-9]{7,15}$
