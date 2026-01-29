// Componente obligatorio (requisito 8.1)
app = Vue.createApp({})

app.component('producto-item', {
    props: ['p'],
    template: `
        <li @click="$emit('ver', p.id)" class="producto-item">
            {{ p.nombre }} - {{ p.precio }} €
        </li>
    `
})

// Aplicación principal
app = Vue.createApp({

    data() {
        return {
            vista: 'inicio',

            productos: [],
            producto: null,

            carrito: [],

            idiomaActual: 'es',

            form: {
            nombre: '',
            email: '',
            cuenta: '',
            telefono: '',
            direccion: '',
            ciudad: ''
            },

            usuario: null
        }
    },

    computed: {
        recomendado() {
            return this.productos.length > 0 ? this.productos[0] : null
        },

        total() {
            return this.carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toFixed(2)
        },

        totalUnidadesCarrito() {
            return this.carrito.reduce((acc, p) => acc + p.cantidad, 0)
        }
    },

    methods: {

        cambiarVista(v) {
            this.vista = v
        },

        // AJAX: obtener todos los productos
        cargarProductos() {
            fetch("php/getProductos.php")
                .then(r => r.json())
                .then(data => {
                    this.productos = data
                })
        },

        // AJAX: obtener un producto por ID
        verProducto(id) {
            fetch("php/getProducto.php?id=" + id)
                .then(r => r.json())
                .then(data => {
                    this.producto = data
                    this.vista = 'detalle'
                })
        },

        // Carrito
        addCarrito(prod) {
            let existe = this.carrito.find(p => p.id == prod.id)

            if (existe) {
                existe.cantidad++
            } else {
                this.carrito.push({ ...prod, cantidad: 1 })
            }

            localStorage.setItem("carrito", JSON.stringify(this.carrito))
        },

        removeCarrito(id) {
            this.carrito = this.carrito.filter(p => p.id != id)
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
        },

        cargarCarrito() {
            let c = localStorage.getItem("carrito")
            if (c) this.carrito = JSON.parse(c)
        },

        // Registro AJAX
        registrar() {
            fetch("php/registrarUsuario.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.form)
            })
                .then(r => r.json())
                .then(data => {
                    alert("Usuario registrado correctamente")
                    this.usuario = { nombre: this.form.nombre, email: this.form.email };
                    sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
                })
        },

        cerrarSesion() {
        this.usuario = null;
        sessionStorage.removeItem("usuario");
        },

        // Idioma
        toggleIdioma() {
            this.idiomaActual = this.idiomaActual === 'es' ? 'en' : 'es'
        },

        // CONFIRMAR PEDIDO
        confirmarPedido() {
            alert("Pedido confirmado (simulado)")
            this.carrito = []
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
        },

        // CANCELAR PEDIDO
        cancelarPedido() {
            if (confirm("¿Seguro que quieres cancelar el pedido?")) {
                this.carrito = []
                localStorage.setItem("carrito", JSON.stringify(this.carrito))
            }
        }
    },

    mounted() {
        this.cargarProductos()
        this.cargarCarrito()

        const u = sessionStorage.getItem("usuario");
        if (u) this.usuario = JSON.parse(u);
    }

})

app.mount('#app')