const salir = document.getElementById('salir');
const display = document.getElementById('display');
const saldo = document.getElementById('saldo');
const deposito = document.getElementById('deposito');
const extraccion = document.getElementById('extraccion');
const resumen = document.getElementById('resumen');
const cambioDeClave = document.getElementById('cambio-de-clave');
const btnOperacion = document.getElementById('btn-operacion');
const inputMonto = document.createElement('input');
inputMonto.type = 'number';
inputMonto.classList.add('monto');
let bandera = true;
let operaciones = [];
const modalContenido = document.getElementById('modal-contenido');
const modal = document.getElementById('modal');
const cerrarModal = document.getElementById('cerrarModal');

// Evento para cerrar el modal
cerrarModal.addEventListener('click', () => {
    modalContenido.innerHTML = '';
    modal.style.display = 'none';
});

//función depositar
function depositar(monto) {
    if (monto <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error: El monto a depositar debe ser un valor positivo.🚨",
        });

    } else {
        cuenta.saldo += monto;
        display.children[0].style.display = 'flex';
        display.children[1].style.display = 'flex';
        display.children[1].textContent = `Se ha depositado 💲${monto} correctamente. Su nuevo saldo es de: 💲${cuenta.saldo}✔`;

    }
}
//función extracción 
function retirar(monto) {
    if (monto <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error: El monto a retirar debe ser un valor positivo.🚨",
        });
        return; // No se realiza el retiro si el monto es inválido
    }

    if (monto > cuenta.saldo) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error: El monto a retirar excede su saldo disponible.🚨",
        });
        return; // No se realiza el retiro si el monto supera el saldo
    }

    if (monto > cuenta.limiteRetiroDiario) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error: El monto a retirar excede el límite diario de retiro.🚨",
        });
        return; // No se realiza el retiro si el monto supera el límite diario
    }

    cuenta.saldo -= monto;
    display.children[0].style.display = 'flex';
    display.children[1].style.display = 'flex';
    display.children[1].textContent = `Se ha retirado 💲${monto} correctamente. Su nuevo saldo es de: 💲${cuenta.saldo}`;
}
//función listar operaciones
function listOperaciones(arreglo) {
    modal.style.display = 'block';
    modal.children[0].children[0].textContent = 'Resumen de Actividad de la cuenta';
    modalContenido.parentElement.classList.remove('centrar');
    for (let i = 0; i < arreglo.length; i++) {
        modalContenido.insertAdjacentHTML('afterbegin', `<h4>Operación📝:</h4> <ul> <li>Tipo: ${arreglo[i].tipo}</li><li>Fecha: ${arreglo[i].fecha}</li><li>Monto: $${arreglo[i].monto}</li><li>Saldo: $${arreglo[i].saldo}</li></ul><hr>`);
    }
}
//función no operaciones
function sinOperaciones() {
    modal.style.display = 'block';
    modal.children[0].children[0].textContent = 'Resumen de Actividad de la cuenta';
    modalContenido.parentElement.classList.add('centrar');
    modalContenido.insertAdjacentHTML('afterbegin', `<h4>Usted no realizo operaciones todavía ⚠</h4>`);
}
//función agregar input
function agregarInput(texto) {
    inputMonto.placeholder = texto;
    display.children[0].style.display = 'none';
    display.children[1].style.display = 'none';
    display.appendChild(inputMonto);
    return true;
}

//consultar saldo
saldo.addEventListener('click', (e) => {

    if (bandera) {
        display.children[0].style.display = 'flex';
        display.children[1].style.display = 'flex';
        inputMonto.style.display = 'none';
        display.children[1].textContent = `Su saldo es de 💲${cuenta.saldo}`;
        bandera = true;
        btnOperacion.style.width = '0';
    } else {
        display.children[1].textContent = `Su saldo es de 💲${cuenta.saldo}`;
        btnOperacion.style.width = '0';
        bandera = false;
    }

})
//depositar
deposito.addEventListener('click', (e) => {
    if (agregarInput('Ingrese el deposito!')) {
        inputMonto.style.display = 'flex';
        btnOperacion.style.width = '40%';

    } else {
        agregarInput('Ingrese el deposito!');
        btnOperacion.style.width = '40%';
    }

})
//extraccion
extraccion.addEventListener('click', (e) => {
    if (agregarInput('Ingrese la extracción!')) {
        inputMonto.style.display = 'flex';
        btnOperacion.style.width = '40%';
    } else {
        agregarInput('Ingrese la extracción!');
        btnOperacion.style.width = '40%';
    }
})

btnOperacion.addEventListener('click', () => {
    if (inputMonto.placeholder.includes('deposito')) {
        depositar(Number(inputMonto.value));
        const operacion = {};
        operacion.tipo = 'Deposito';
        operacion.fecha = new Date();
        operacion.monto = inputMonto.value;
        operacion.saldo = cuenta.saldo;
        operaciones.push(operacion);
        inputMonto.value = '';
    } else if (inputMonto.placeholder.includes('extracción')) {
        retirar(Number(inputMonto.value));
        const operacion1 = {};
        operacion1.tipo = 'Extracción';
        operacion1.fecha = new Date();
        operacion1.monto = inputMonto.value;
        operacion1.saldo = cuenta.saldo;
        operaciones.push(operacion1);
        inputMonto.value = '';
    }
})
//resumen
resumen.addEventListener('click', (e) => {
    operaciones.length == 0 ? sinOperaciones() : listOperaciones(operaciones);
});
//cambio de clave en construcción
cambioDeClave.addEventListener('click', (e) => {
    modal.style.display = 'block';
    modal.children[0].children[0].textContent = '';
    modalContenido.parentElement.classList.add('centrar');
    modalContenido.insertAdjacentHTML('afterbegin', `<h4>Esta funcionalidad esta en construcción‼\n Próximamente estará disponible...😎 </h4>`);
    display.children[0].style.display = 'flex';
    display.children[1].style.display = 'flex';
})

//salir
salir.addEventListener('click', (e) => {
    window.location.replace('./homeBanking.html');
})