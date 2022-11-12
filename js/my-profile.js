let primerNombre = document.getElementById('pnombre');
let segundoNombre = document.getElementById('snombre');
let primerApellido = document.getElementById('papellido');
let segundoApellido = document.getElementById('sapellido');
let emailUsuario = document.getElementById('email');
let imagenPerfil = document.getElementById('imagen');
let telefono = document.getElementById('telefono');

let datosUsuario = JSON.parse(localStorage.getItem('usuario'))

document.addEventListener ('DOMContentLoaded', () => {

    primerNombre.value = `${datosUsuario.primerNombre}`;
    segundoNombre.value = `${datosUsuario.segundoNombre}`;
    primerApellido.value = `${datosUsuario.primerApellido}`;
    segundoApellido.value = `${datosUsuario.segundoApellido}`;
    emailUsuario.value = `${datosUsuario.email}`;
    telefono.value = `${datosUsuario.telefono}`;

});

(function () {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated')

          if (primerNombre.value != '' && primerApellido.value != '' && emailUsuario.value != '') {

            datosUsuario = {

                primerNombre : `${primerNombre.value}`,
                segundoNombre : `${segundoNombre.value}`,
                primerApellido : `${primerApellido.value}`,
                segundoApellido : `${segundoApellido.value}`,
                email : `${email.value}`,
                telefono : `${telefono.value}`

            }

            localStorage.setItem('usuario', JSON.stringify(datosUsuario));

          }

        }, false)
      })

})();