const email = document.getElementById('email');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const celular = document.getElementById('celular');
const desde = document.getElementById('hasta');
const hasta = document.getElementById('desde');
const cuit = document.getElementById('cuit');
//selecciono todos los input con el name="afip"
const condicionAnteAfip = document.querySelectorAll('input[name="afip"]');
const provincia = document.getElementById('provincia');
const mensaje = document.getElementById('txt');
const btnEnviar = document.getElementById('btn-enviar');
const regexEmail = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
const regexCelular = /^\+?[0-9]{10,13}$/;
//regexUser.test(value)
let condiAnteAfip = '';
let horarioDeContato = '';

const reset = () => {
    email.value = '';
    nombre.value = '';
    apellido.value = '';
    celular.value = '';
    cuit.value = '';
    provincia.value = '';
    mensaje.value = '';
}

const crearId = () => {
    const ids = [];
    let id;
    do {
        id = Math.floor(Math.random() * 1000);
    } while (ids.includes(id));
    ids.push(id);
    return id;
}
const validarEntradasDeContacto = (email, celular, horarioDesde, horarioHasta) => {

    const datosContacto = {
        email: '',
        celular: '',
        horario: ''
    }
    if (!regexEmail.test(email)) {
        return 'Ingresaste un email no valido o nulo!🚨';
    } else {
        datosContacto.email = email;
    }
    if (!regexCelular.test(celular)) {
        return 'Ingresaste un numero de celular no valido!🚨';
    } else {
        datosContacto.celular = celular;
    }

    if (horarioDesde < horarioHasta || horarioDesde == horarioHasta) {
        return 'El franja horaria elegida no es valido!🚨';
    } else {
        datosContacto.horario = `De ${horarioDesde}, hasta ${horarioHasta}`;
    }

    return datosContacto;
}

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    //obtener la opción seleccionada
    for (const radio of condicionAnteAfip) {
        if (radio.checked) {
            condiAnteAfip = radio.value;
            break;
        }
    }
    const contacto = validarEntradasDeContacto(email.value, celular.value, desde.value, hasta.value);

    if (typeof contacto == 'object') {
        const { email, celular, horario } = contacto;
        const nuevoCliente = new Cliente(crearId(), nombre.value, apellido.value, email, celular, cuit.value, condiAnteAfip, provincia.value, horario, mensaje.value);
        console.log(nuevoCliente);
        Swal.fire({
            icon: "success",
            title: "Su mensaje se envió de manera  Exitosa",
            text: `Gracias por contactarte ${nuevoCliente.nombre}, ${nuevoCliente.apellido}\nTu email registrado es ${nuevoCliente.email}`
        });
        reset();
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${contacto}`,
        });
        reset();
    }


})