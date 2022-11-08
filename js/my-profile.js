document.addEventListener('DOMContentLoaded', ()=>{
   
    comprobrar();
    obtenerDatos();

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
    event.preventDefault()
    event.stopPropagation()
    guardarDatos();
  }
     document.body.classList.add('was-validated');
   })

function guardarDatos(){
let informacionPerfil = [];
let datos = new Object();

datos.nombre = document.getElementById('nombrePerfil').value;
 datos.segNombre = document.getElementById('segundo').value;
datos.apellido = document.getElementById('apellidoPerfil').value;
datos.segApellido = document.getElementById('segApellido').value;
datos.telefono = document.getElementById('telefono').value; 
datos.imagen = '';

informacionPerfil.push(datos);
localStorage.setItem('infoPerfil', JSON.stringify(informacionPerfil));
}

function obtenerDatos(){
  let obtenido = JSON.parse(localStorage.getItem('infoPerfil'));
  console.log(obtenido);

  if (obtenido !== null){
    document.getElementById('nombrePerfil').value = obtenido[0].nombre;
    document.getElementById('segundo').value = obtenido[0].segNombre;
    document.getElementById('apellidoPerfil').value = obtenido[0].apellido;
    document.getElementById('segApellido').value = obtenido[0].segApellido;
    document.getElementById('telefono').value = obtenido[0].telefono;
  }

  if(obtenido[0].imagen == ""){
    document.getElementById('emailFoto').src = "/img/perfil.png"
  }

}







