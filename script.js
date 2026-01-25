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