function validar() {
    // var datosLogin = mapToJson($('#formLogin').serializeArray());
    // console.log("recibiendo datos de logeo: ", datosLogin);
    //
    // let uri = EndpointsEnum.LOGIN;
    // console.log("Volver al listado de inmuebles = " + uri);

    let href = EndpointsEnum.VOLVER_MENU_PRINCIPAL;

    // var funcionAjax = $.ajax({
    //     url: uri,
    //     method: "POST",
    //     data: {
    //         action: "validar",
    //         datosLogin: datosLogin
    //     }
    // });
    // funcionAjax.done(function (retorno) {
    //     console.debug("Done: ", retorno);
    //     if (retorno == "ERROR1"){
    //         window.alert("los campos de dni y contraseña deben ser completados");
    //     }else if (retorno == "ERROR2") {
    //         window.alert("el dni o contraseña son incorrectos");
    //     }else{
             location.href = href;
    //     }
    // });
    // funcionAjax.fail(function (retorno) {
    //     console.log("error al guardar user")
    // });
    // funcionAjax.always(function (retorno) {
    //     console.log("volvi de guardar el user")
    // });
    // console.log("Fin llamada controller usuario");
}

function ingresarAlSistema() {

    var datosCorrectos = mapToJson($('#formLogin').serializeArray());
    console.log("datos correctos para ingresar al sistema: ", datosCorrectos);

    let uri = EndpointsEnum.LOGIN;
    console.log("Volver al listado de inmuebles = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
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