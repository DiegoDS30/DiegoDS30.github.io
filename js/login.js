(function () {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')

        /* Saving the email value in the local storage. */
        
        localStorage.setItem('usuario', email.value);
      }, false)
    })
  })()
