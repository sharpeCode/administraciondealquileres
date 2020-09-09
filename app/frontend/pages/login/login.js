function validar() {

    var datosLogin = mapToJson($('#formLogin').serializeArray());
    console.log("recibiendo datos de logeo: ", datosLogin);

    var funcionAjax = $.ajax({
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/LoginController.php",
        method: "POST",
        data: {
            action: "validar",
            datosLogin: datosLogin
        }
    });
    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        if (retorno == "ERROR1"){
            window.alert("los campos de dni y contraseña deben ser completados");
        }else if (retorno == "ERROR2") {
            window.alert("el dni o contraseña son incorrectos");
        }else{
            location.href = "http://administraciondealquileres.herokuapp.com/app/frontend/pages/principal/menuPrincipal.page.php";
        }
    });
    funcionAjax.fail(function (retorno) {
        console.log("error al guardar user")
    });
    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");
}

function ingresarAlSistema() {
    var datosCorrectos = mapToJson($('#formLogin').serializeArray());
    console.log("datos correctos para ingresar al sistema: ", datosCorrectos);

    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/LoginController.php",
        method: "POST",
        data: {
            action: "ingresar",
            datosCorrectos: datosCorrectos
        }
    });
    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        //location.href = "http://localhost:90/EASY/seguimientos-personalizados/app/frontend/pages/user/user.page.php";
        if (retorno == "ERROR4") {
            console.log("no existe ninguna session abierta, por favor logearse")
        }else if(retorno == "ERROR3"){
            window.alert("el usuario se encuentra inactivo");
        }else {
           console.log("ESTAMOS DENTRO DEL SISTEMA")
        }
    });
    funcionAjax.fail(function (retorno) {
        console.log("error al guardar user")
    });
    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");


}