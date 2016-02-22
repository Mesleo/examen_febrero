/**
 * Created by Javier Benítez del Pozo on 09/02/2016.
 *
 * Examen Febrero 2016 JavaScript
 */

(function(){

    var inputNombre = document.getElementById('nombre');
    var inputApellidos = document.getElementById('apellidos');
    var inputDni = document.getElementById('dni');
    var selectSexo = document.getElementById('sexo');
    var checkCondiciones = document.getElementById('aceptarCondiciones');
    var muestraUsuario = document.getElementById('muestra_usuario');
    var lista_usuarios = document.getElementById('lista_usuarios');
    var spanNombre = document.getElementById('spanNombre');
    var spanApellidos = document.getElementById('spanApellidos');
    var spanDni = document.getElementById('spanDni');
    var spanCondiciones = document.getElementById('spanCondiciones');
    var usuario;

    function enviarFormulario() {
        esValidoNombre();
        esValidoApellido();
        esValidoDni();
        aceptarCondiciones();
        if (spanNombre.innerHTML == "" && spanApellidos.innerHTML == "" && spanCondiciones.innerHTML == ""
            && spanDni.innerHTML == "") {
            usuario = new Usuario(inputNombre.value, inputApellidos.value, inputDni.value, selectSexo.value);
            usuario.crearCookies();
            usuario.mostrar();
            usuario.crearListItem();
        }else{
            muestraUsuario.innerHTML = '<h3>No se ha podido crear el usuario</h3>';
        }
    }

    function Usuario(nombre, apellidos, dni, sexo){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.sexo = sexo;
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function eliminarCookie(){
        document.cookie="nombre_Usuario=; expires=Thu, 18 Dec 1980 12:00:00 UTC";
        document.cookie="apellidos_Usuario=; expires=Thu, 18 Dec 1980 12:00:00 UTC";
        document.cookie="dni=; expires=Thu, 18 Dec 1980 12:00:00 UTC";
        document.cookie="sexo=; expires=Thu, 18 Dec 1980 12:00:00 UTC";
    }

    function validarNombreApllidos(value){
        var regex = new RegExp('^[\\wÁÉÍÓÚÑáéíóúñ_-]{4,50}$');
        return regex.test(value);
    }

    function validarDni(value){
        var regex = /^[0-9]{8}[A-z]{1}$/i;
        return regex.test(value.trim());
    }

    Usuario.prototype.mostrar = function(){
        muestraUsuario.innerHTML = '<p>Nombre: '+this.nombre+'</p>' +
            '<p>Apellidos: '+this.apellidos+'</p>' +
            '<p>DNI: '+this.dni+'</p>' +
            '<p>Sexo: '+this.sexo+'</p>';
    };

    Usuario.prototype.crearListItem = function(){
        var li = document.createElement('li');
        var content = document.createTextNode('Nombre: '+this.nombre +
            '. Apellidos: '+this.apellidos +
            '. DNI: '+this.dni +
            '. Sexo: '+this.sexo);
        li.appendChild(content);
        lista_usuarios.appendChild(li);
    };

    Usuario.prototype.crearCookies = function(){
        setCookie("nombre_Usuario", this.nombre, 50000);
        setCookie("apellidos_Usuario", this.apellidos, 50000);
        setCookie("dni", this.dni,  50000);
        setCookie("sexo", this.sexo,  50000);
    };

    function esValidoApellido() {
        if (inputApellidos.value.trim() == "") {
            spanApellidos.innerHTML = 'El campo "apellidos" no puede estar vacío.';
        } else spanApellidos.innerHTML = "";
    }

    function esValidoDni() {
        if (!validarDni(inputDni.value)) {
            spanDni.innerHTML = 'Formato de DNI incorrecto (8 dígitos y una letra: 01234567X).'
        } else spanDni.innerHTML = "";
    }

    function esValidoNombre() {
        if (!validarNombreApllidos(inputNombre.value)) {
            spanNombre.innerHTML = 'Formato de nombre incorrecto (Mínimo 4 caracteres alfanuméricos).';
        } else spanNombre.innerHTML = "";
    }

    function aceptarCondiciones() {
        if (!checkCondiciones.checked) {
            spanCondiciones.innerHTML = 'Debes aceptar las condiciones';
        } else spanCondiciones.innerHTML = "";
    }

    function limpiar(){
        inputNombre.value = "";
        inputApellidos.value = "";
        inputDni.value = "";
        selectSexo.value = "Hombre";
        spanApellidos.innerHTML = "";
        spanCondiciones.innerHTML = "";
        spanDni.innerHTML = "";
        spanNombre.innerHTML = "";
        checkCondiciones.checked = false;
        muestraUsuario.innerHTML = "";
        eliminarCookie();
    }


    function init(){

        document.getElementById('limpiar').addEventListener('click', function(){
            limpiar();
        });

        inputNombre.addEventListener('blur',function(){
            esValidoNombre(inputNombre, spanNombre);
        });
        inputApellidos.addEventListener('blur',function(){
            esValidoApellido();
        });
        inputDni.addEventListener('blur',function(){
            esValidoDni();
        });
        checkCondiciones.addEventListener('blur',function(){
            aceptarCondiciones();
        });
        document.getElementById('enviar').addEventListener('click', enviarFormulario, false);

    }

    window.addEventListener('load', init, false);
}());