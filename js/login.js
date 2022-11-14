(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }else{
          event.preventDefault()
          event.stopPropagation()
          sessionStorage.setItem('name',document.getElementById('usuario').value)
          window.location.href = "index.html"
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

