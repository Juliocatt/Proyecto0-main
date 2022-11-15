document.addEventListener('DOMContentLoaded', ()=>{
   
    comprobrar();
    obtenerDatos();

    let email = sessionStorage.name
    document.getElementById('emailPerfil').value = email;

    document.getElementById('agregarImagen').addEventListener('change', ()=>{
      let foto = document.getElementById('emailFoto');
      let inputCarga = document.getElementById('agregarImagen').files[0];
      let fileReader = new FileReader();

      if (inputCarga){
        fileReader.readAsDataURL(inputCarga);
      }

      fileReader.addEventListener('load', ()=>{
        foto.src = fileReader.result;
      })

    })
})

   document.getElementById('formPerfil').addEventListener('submit', (event)=>{
     if (!formPerfil.checkValidity()) {
       event.preventDefault()
       event.stopPropagation() 
       }else{
        guardarDatos();
      }
     document.body.classList.add('was-validated');
   })

function guardarDatos(){
let datos = {};

datos.nombre = document.getElementById('nombrePerfil').value;
datos.segNombre = document.getElementById('segundo').value;
datos.apellido = document.getElementById('apellidoPerfil').value;
datos.segApellido = document.getElementById('segApellido').value;
datos.telefono = document.getElementById('telefono').value; 
datos.imagen = document.getElementById('emailFoto').src;

localStorage.setItem('infoPerfil', JSON.stringify(datos));
}

function obtenerDatos(){
  let obtenido = JSON.parse(localStorage.getItem('infoPerfil'));

  if (obtenido !== null){
    document.getElementById('nombrePerfil').value = obtenido.nombre;
    document.getElementById('segundo').value = obtenido.segNombre;
    document.getElementById('apellidoPerfil').value = obtenido.apellido;
    document.getElementById('segApellido').value = obtenido.segApellido;
    document.getElementById('telefono').value = obtenido.telefono;
    document.getElementById('emailFoto').src = obtenido.imagen;
  }else{
    document.getElementById('emailFoto').src = "img/perfil.png"
  }

  if (sessionStorage.name == null){
    document.getElementById('nombrePerfil').value = "";
    document.getElementById('segundo').value = "";
    document.getElementById('apellidoPerfil').value = "";
    document.getElementById('segApellido').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('emailFoto').src = "img/perfil.png"
  }

}







