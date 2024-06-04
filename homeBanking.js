const user = document.querySelector('#user');
const password = document.querySelector('#password');
const btnEnviar = document.querySelector('#btn-enviar');
const ojo = document.querySelector('#ojo');

const { usuario, contrasena } = cuenta.datosDeIngresoUser;


const reset = () => {
    user.value = '';
    password.value = '';
}

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    if (user.value != usuario || password.value != contrasena) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Alguno de los datos ingresados no es correcto!🚨`,
        });
        reset();
    } else {
        window.location.href = "./interiorCajero.html";
        reset();
    }
})

ojo.addEventListener('click', (e) => {
    ojo.classList.toggle('fa-eye');
    ojo.classList.toggle('fa-eye-slash');
    if (ojo.classList[2] == 'fa-eye-slash') {
        password.setAttribute('type', 'password');
    } else {
        password.setAttribute('type', 'text');
    }
})