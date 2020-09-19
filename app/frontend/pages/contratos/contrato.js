$(function () {
    $("#contratoAdd").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    cargarContratosGrilla();

});

// TODO: DAR DE ALTA UN NUEVO CONTRATO
function NuevoContrato() {
    $("#contratoAdd").show();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    cargarIdContrato();
    llenarSelectConLocatarios();
    llenarSelectConInmuebles();
    llenarSelectFechaInicioFin();
}

// TODO: ATRAS
function Atras() {
    $("#contratoAdd").hide();
    $("#contratoList").show();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
}

// TODO: ATRAS
function ListadoDeRegistrosDePago() {
    //para que tome el id registro de pago, dependiendo en que form estamos parados recibo oficial - no oficial - saldos
    var id1 = document.getElementById("reciboNoOfiIdContrato").value;
    var id2 = document.getElementById("reciboOfiIdContrato").value;
    var id3 = document.getElementById("saldoIdContrato").value;

    var idContrato = "";

    if (id1 != "") {
        idContrato = id1;
    } else if (id2 != "") {
        idContrato = id2;
    } else if (id3 != "") {
        idContrato = id3;
    }

    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").show();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    listarRegDePago(idContrato);
    llenarInputs(idContrato);

}

//TODO: REGISTRO DE PAGOS
function listarRegistrosDePagos(idContrato) {
    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").show();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    listarRegDePago(idContrato);
    llenarInputs(idContrato);
}

//TODO: CARGAR COMPROBANTE DE PAGO OFICIAL
function CagarReciboOficial(idRegistroDePago, ban) {
    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").show();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    llenarInputsRecibo(idRegistroDePago, ban);
    llenarSelectConOpcionesSaldoAnteriorRecibo(idRegistroDePago);
}

//TODO: CARGAR COMPROBANTE DE PAGO NO OFICIAL
function CargarReciboNoOficial(idRegistroDePago, ban) {
    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").show();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    llenarInputsRecibo(idRegistroDePago, ban);
}

//TODO: CARGAR COMPROBANTE DE PAGO - SALDO OFICIAL
function ReciboOficialSaldo(idRegistroDePago) {
    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").show();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    llenarInputsReciboSoloSaldo(idRegistroDePago);
}

//TODO: VERIFICAR CUANTOS RECIBOS TIENE UN MISMO REGISTRO DE PAGO
function buscarCuantosRecibosTiene(idRegistroDePago) {
    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    buscarCuantosRecibosTieneEsteRegistro(idRegistroDePago);
}

//TODO: VISUALIZAR RECIBO OFICIAL
function visualizarReciboOficial(idRegistroDePago) {
    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").show();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    visualizarReciboOficialCantidadUno(idRegistroDePago);
}

//TODO: VISUALIZAR RECIBOS DOS
function visualizarDosRecibos(idRegistroDePago) {
    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").show();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    cargarRecibosDeUnMismoRegistroGrilla(idRegistroDePago);

}

//TODO: VISUALIZAR RECIBO SOLO SALDO
function visualizarReciboOficialSoloSaldo(idRegistroDePago) {
    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").show();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    visualizarReciboOficialSaldo(idRegistroDePago);
}

//TODO: VISUALIZAR UN SOLO RECIBO NO OFICIAL
function visualizarReciboNoOficial(idRegistroDePago) {
    $("#contratoAdd").hide();
    $("#contratoList").hide();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").show();
    $("#comprobDePagoSaldoNoOficial").hide();
    $("#visualizarReciboNoOficialSoloSaldo").hide();
    visualizarReciboNoOficialCantidadUno(idRegistroDePago);
}

// LISTAR CONTRATOS
function cargarContratosGrilla() {
    traerTodos(llenarContratosGrilla,
        {
            action: "listar",
        }
    );
}

function traerTodos(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "traerTodos"} : data;

    let uri = EndpointsEnum.CONTRATO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de locatarios")
    });

    funcionAjax.always(function (retorno) {
        console.log("always de promise locatarios")
    });
}

function llenarContratosGrilla(jsonContratos) {
    console.log(jsonContratos);
    jsonContratos = JSON.parse(jsonContratos);

    let tableRaws = "";

    for (var i = 0, l = jsonContratos.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += contruirFilas(jsonContratos[i]);
        tableRaws += "</tr>";
    }

    $("#listado").html(tableRaws);
}

function contruirFilas(Contratos) {

    let fi = Contratos['fechaInicio'];
    var fecha = new Date(fi);
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaInicio = fecha.toLocaleDateString("es-ES", options);

    let ff = Contratos['fechaFin'];
    var fecha1 = new Date(ff);
    var options1 = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaFin = fecha1.toLocaleDateString("es-ES", options1);


    let raw = "";
    raw += "<td style='visibility:hidden; display: none;'>" + Contratos['idContrato'] + "</td>";
    raw += "<td>" + fechaInicio + "</td>";
    raw += "<td>" + fechaFin + "</td>";
    raw += "<td>" + Contratos['nombres'] + " " + Contratos['apellidos'] + "</td>";
    raw += "<td>" + Contratos['domicilio'] + " - Piso: " + Contratos['piso'] + " - Dpto: " + Contratos['departamento'] + " - Localidad: " + Contratos['localidad'] + "</td>";
    raw += "<td>" + Contratos['tipo'] + "</td>";

    raw += "<td>";
    raw += "<button class='miBoton-icon' title='Registros de pagos' onclick='listarRegistrosDePagos(" + Contratos['idContrato'] + ")'>" +
        "<span class='glyphicon glyphicon-usd'></span>";
    raw += "</td> ";

    raw += "<td>";
    raw += "<button class='miBoton-icon' title='Eliminar o Inhabilitar' onclick='EliminarInhabilitarContrato(" + Contratos['idContrato'] + ")'>" +
        "<span class='glyphicon glyphicon-remove'></span>";
    raw += "</td> ";

    return raw;

}

// LLENAR ID CONTRATO
function cargarIdContrato() {

    let uri = EndpointsEnum.CONTRATO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "cargarIdContratoAutomatico",
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        $("#idContrato").val(retorno);
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

// LLENAR SELECT CON CLIENTES
function llenarSelectConLocatarios() {

    let uri = EndpointsEnum.CONTRATO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "cargarSelectConClientes",
        }
    });

    funcionAjax.done(function (retorno) {
        llenarDomLocatarios(retorno);

    });

    funcionAjax.fail(function (retorno) {
        console.log("error al cargar select con alumnos")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de buscar a los alumnos")
    });
}

function llenarDomLocatarios(arrayLocatarios) {

    console.log(arrayLocatarios);
    arrayLocatarios = JSON.parse(arrayLocatarios);
    let options = "";

    //para agregarle placeholder a la lista desplegable
    let optionDefault = "<option value='-1'>Cliente</option>";
    options += optionDefault;

    for (var i = 0, l = arrayLocatarios.length; i < l; i++) {
        options += optionsLocatarios(arrayLocatarios[i]);
    }
    $("#dni").html(options);
    //document.getElementById('provincia').selectedIndex = -1;

}

function optionsLocatarios(locatarios) {
    let option = "";
    option += "<option value='" + locatarios['dni'] + "'>" + locatarios['nombres'] + " " + locatarios['apellidos'] + ", Dni: " + locatarios['dni'] + "</option>";
    return option;
}

// LLENAR SELECT CON INMUEBLES
function llenarSelectConInmuebles() {

    let uri = EndpointsEnum.CONTRATO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "cargarSelectConInmueble",
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        llenarDomInmuebles(retorno);

    });

    funcionAjax.fail(function (retorno) {
        console.log("error al cargar select con alumnos")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de buscar a los alumnos")
    });
}

function llenarDomInmuebles(arrayInmuebles) {

    console.log(arrayInmuebles);
    arrayInmuebles = JSON.parse(arrayInmuebles);
    let options = "";

    //para agregarle placeholder a la lista desplegable
    let optionDefault = "<option value='-1'>Inmuebles</option>";
    options += optionDefault;

    for (var i = 0, l = arrayInmuebles.length; i < l; i++) {
        options += optionsInmuebles(arrayInmuebles[i]);
    }
    $("#idInmueble").html(options);
    //document.getElementById('provincia').selectedIndex = -1;

}

function optionsInmuebles(Inmuebles) {
    let option = "";
    option += "<option value='" + Inmuebles['idInmueble'] + "'>" +
        Inmuebles['domicilio'] + ", Piso: " + Inmuebles['piso'] + ", Dto: " + Inmuebles['departamento'] +
        ", " + Inmuebles['localidad'] + " - " + Inmuebles['tipo'] + "</option>";
    return option;

}

// LLENAR SELECT CON FECHA INICIO Y FIN DEL VENCIMIENTO
function llenarSelectFechaInicioFin() {

    let uri = EndpointsEnum.CONTRATO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "cargarSelectConFechaInicio",
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        llenarDomInicio(retorno);
        llenarDomFin(retorno);

    });

    funcionAjax.fail(function (retorno) {
        console.log("error al cargar select con alumnos")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de buscar a los alumnos")
    });
}

function llenarDomInicio(arrayFechaInicio) {

    console.log(arrayFechaInicio);
    arrayFechaInicio = JSON.parse(arrayFechaInicio);
    let options = "";

    //para agregarle placeholder a la lista desplegable
    let optionDefault = "<option value='1'>1</option>";
    options += optionDefault;

    for (var i = 0, l = arrayFechaInicio.length; i < l; i++) {
        options += optionsFechas(arrayFechaInicio[i]);
    }
    $("#fechaPagoInicio").html(options);
    //document.getElementById('provincia').selectedIndex = -1;

}

function llenarDomFin(arrayFechaFin) {

    console.log(arrayFechaFin);
    arrayFechaFin = JSON.parse(arrayFechaFin);
    let options = "";

    //para agregarle placeholder a la lista desplegable
    let optionDefault = "<option value='10'>10</option>";
    options += optionDefault;

    for (var i = 0, l = arrayFechaFin.length; i < l; i++) {
        options += optionsFechas(arrayFechaFin[i]);
    }
    $("#fechaPagoFin").html(options);
    //document.getElementById('provincia').selectedIndex = -1;

}

function optionsFechas(fecha) {
    let option = "";
    option += "<option value='" + fecha['idFechaPago'] + "'>" + fecha['fecha'] + "</option>";
    return option;
}

// VALIDACIONES PARA GUARDAR UN NUEVO CONTRATO
function validarContratoAntesDeGuardarlo() {

    var datosDelContrato = mapToJson($('#contratoAdd').serializeArray());

    console.log("Validar contrato antes de guardarlo: ", datosDelContrato);

    let uri = EndpointsEnum.CONTRATO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "validarContrato",
            datosDelContrato: datosDelContrato
        }
    });
    funcionAjax.done(function (retorno) {
        console.log(retorno);
        if (!isNaN(retorno)) {
            console.log("holaaaaaa")
            document.getElementById('labelTituloAnio').style.display = 'block';
        }
        $("#labelAnio").val(retorno);
    });
    funcionAjax.fail(function (retorno) {
        console.log("error al guardar user")
    });
    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");
}

// GUARDAR NUEVO CONTRATO
function guardarContrato() {

    var datosDelContrato = mapToJson($('#contratoAdd').serializeArray());

    //primero validamos que esten ok las fechas inicio y fin antes de guardar
    var cantidad = 0;
    var anios = 0;
    // isNaN -> esto valida si no es un string, para que solo entren los numeros
    if (!isNaN(datosDelContrato["labelAnio"])) {
        anios = !isNaN(anios) ? parseInt(anios, 10) : 0; //si es una cadena vacia o cualquier cosa que no sea numero total = 0
        anios = parseInt(cantidad, 10) + parseInt(anios, 10);
        console.log(anios);

        console.log("Guardando contrato: ", datosDelContrato);
        let uri = EndpointsEnum.CONTRATO;
        console.log("Llamando a controller locatarios = " + uri);
        var funcionAjax = $.ajax({
            url: uri,
            method: "POST",
            data: {
                action: "guardarContratoNuevo",
                contratoNuevoParaGuardar: datosDelContrato
            }
        });

        funcionAjax.done(function (retorno) {
            console.log("guardarRegistrosDePagos");
            guardarRegistrosDePagos();
        });

        funcionAjax.fail(function (retorno) {
            console.log("error al guardar user")
        });

        funcionAjax.always(function (retorno) {
            console.log("volvi de guardar el user")
        });
        console.log("Fin llamada controller usuario");

    } else {
        console.error('Error, cantidad no valida');
        window.alert("Corregir las fechas!!!")
    }

}

function guardarRegistrosDePagos() {
    //console.log("ENTRO AL JS de guardarRegistrosDePagos");

    let uri = EndpointsEnum.REGISTRO_DE_PAGO;
    let href = EndpointsEnum.VOLVER_CONTRATOS;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "guardarRegistrosDePagos",
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        location.href = href;
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al guardar user")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");

}

// LISTAR REGISTROS DE PAGOS
function listarRegDePago(idContrato) {
    traerRegistroDePago(llenarRegistroDePagoGrilla,
        {
            action: "listar",
            idContrato: idContrato
        }
    );
}

function traerRegistroDePago(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "traerRegistroDePago"} : data;

    let uri = EndpointsEnum.REGISTRO_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de locatarios")
    });

    funcionAjax.always(function (retorno) {
        console.log("always de promise locatarios")
    });
}

function llenarRegistroDePagoGrilla(RegPago) {

    RegPago = JSON.parse(RegPago);

    let tableRaws = "";

    for (var i = 0, l = RegPago.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += contruirFilasRegistroDePagos(RegPago[i]);
        tableRaws += "</tr>";
    }

    $("#listadoRegistroPagos").html(tableRaws);
}

function contruirFilasRegistroDePagos(RPago) {

    var idCuota = 0;
    var idCuota = RPago['idCompPorContrato'];
    var tipo = RPago['tipo'];

    if (idCuota != 1) {
        if (tipo == "Particular") {
            var resultado = (idCuota - 1) % 12;
        } else if (tipo == "Comercial") {
            var resultado = (idCuota - 1) % 6;
        }
    }

    let raw = "";

    if (resultado == 0) { //Que pinte la fila

        var ban = 1;

        raw += "<td style='visibility:hidden; display: none;'>" + RPago['idRegistroDePago'] + "</td>";
        raw += "<td style='visibility:hidden; display: none;'>" + RPago['idContrato'] + "</td>";
        raw += "<td style='visibility:hidden; display: none;'>" + RPago['idCompPorContrato'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['tipo'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['mesCorto'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['correspondienteAnio'] + "</td>";
        raw += "<td style='font-weight: bold; color: red;'>" + RPago['tipoRegistroDePago'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['valorAlquiler'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['valorExpensas'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['gastosAdministrativos'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['valorDeposito'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['numCuotaAPagar'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['cantCuotasDeposito'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['recibo'] + "</td>";
        raw += "<td style='color: red;'>" + RPago['saldoPendiente'] + "</td>";

    } else if (resultado != 0) {

        var ban = 2;

        raw += "<td style='visibility:hidden; display: none;'>" + RPago['idRegistroDePago'] + "</td>";
        raw += "<td style='visibility:hidden; display: none;'>" + RPago['idContrato'] + "</td>";
        raw += "<td style='visibility:hidden; display: none;'>" + RPago['idCompPorContrato'] + "</td>";
        raw += "<td>" + RPago['tipo'] + "</td>";
        raw += "<td>" + RPago['mesCorto'] + "</td>";
        raw += "<td>" + RPago['correspondienteAnio'] + "</td>";
        raw += "<td style='font-weight: bold;'>" + RPago['tipoRegistroDePago'] + "</td>";
        raw += "<td>" + RPago['valorAlquiler'] + "</td>";
        raw += "<td>" + RPago['valorExpensas'] + "</td>";
        raw += "<td>" + RPago['gastosAdministrativos'] + "</td>";
        raw += "<td>" + RPago['valorDeposito'] + "</td>";
        raw += "<td>" + RPago['numCuotaAPagar'] + "</td>";
        raw += "<td>" + RPago['cantCuotasDeposito'] + "</td>";
        raw += "<td>" + RPago['recibo'] + "</td>";
        raw += "<td>" + RPago['saldoPendiente'] + "</td>";
    }


    if (RPago['tipoRegistroDePago'] == "Oficial") {

        if (RPago['recibo'] == "No") {  //si todavia no se hizo recibo de pago
            raw += "<td>";
            raw += "<button class='miBoton-icon inputOculto' title='Visualizar Recibo'>" + //boton Oculto
                "<span class='glyphicon glyphicon-ok'></span>";
            raw += "</td> ";

            raw += "<td>";                //y que aparezca el boton para generar el recibo
            raw += "<button class='miBoton-icon' title='Generar Comprobante de pago' onclick='CagarReciboOficial(" + RPago['idRegistroDePago'] + "," + ban + ")'>" +
                "<span class='glyphicon glyphicon-share'></span>";
            raw += "</td> ";

        } else if (RPago['recibo'] == "Si") {

            raw += "<td>";               //que aparezca el boton visualizar recibo
            raw += "<button class='miBoton-icon' title='Visualizar Recibo' onclick='buscarCuantosRecibosTiene(" + RPago['idRegistroDePago'] + ")'>" +
                "<span class='glyphicon glyphicon-ok'></span>";
            raw += "</td> ";

            if (RPago['saldoPendiente'] == 0) {  //si el recibo fue hecho, no quedo ningun saldo pendiente, que el boton sea gris y que no haga nada
                raw += "<td>";
                raw += "<button class='miBoton-icon-gris' title='Ya fue generado el recibo'>" + //gris
                    "<span class='glyphicon glyphicon-share'></span>";
                raw += "</td> ";

            } else if (RPago['saldoPendiente'] > 0) {  //rojo
                raw += "<td>";
                raw += "<button class='miBoton-icon-rojo' title='Generar Comprobante de pago' onclick='ReciboOficialSaldo(" + RPago['idRegistroDePago'] + ")'>" +
                    "<span class='glyphicon glyphicon-share'></span>";
                raw += "</td> ";
            }
        }
        return raw;

    } else if (RPago['tipoRegistroDePago'] == "No Oficial") {

        if (RPago['recibo'] == "No") {
            raw += "<td>";
            raw += "<button class='miBoton-icon inputOculto' title='Visualizar Recibo'>" +
                "<span class='glyphicon glyphicon-ok'></span>";
            raw += "</td> ";

            raw += "<td>";
            raw += "<button class='miBoton-icon' title='Generar Comprobante de pago' onclick='CargarReciboNoOficial(" + RPago['idRegistroDePago'] + "," + ban + ")'>" +
                "<span class='glyphicon glyphicon-share'></span>";
            raw += "</td> ";
        } else if (RPago['recibo'] == "Si") {

            raw += "<td>";
            raw += "<button class='miBoton-icon' title='Visualizar Recibo no Oficial' onclick='buscarCuantosRecibosTiene(" + RPago['idRegistroDePago'] + ")'>" +
                "<span class='glyphicon glyphicon-ok'></span>";
            raw += "</td> ";

            if (RPago['saldoPendiente'] == 0) {  //si el recibo fue hecho, no quedo ningun saldo pendiente, que el boton sea gris y que no haga nada
                raw += "<td>";
                raw += "<button class='miBoton-icon-gris' title='Ya fue generado el recibo'>" +
                    "<span class='glyphicon glyphicon-share'></span>";
                raw += "</td> ";
            }
        }
        return raw;
    }
}

// LLENAR INPUTS CON DATOS PERSONALES PARA REGISTRO DE PAGO
function llenarInputs(idContrato) {
    console.debug("trayendo datos de contrato");

    let uri = EndpointsEnum.REGISTRO_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);


    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "mostrarDatosParaCabeceraDeRegistrosDePago",
            idContrato: idContrato
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        cargarDatosDeContrato(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function cargarDatosDeContrato(datosContrato) {

    let fi = datosContrato['fechaInicio'];
    var fechaIni = new Date(fi);
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaInicio = fechaIni.toLocaleDateString("es-ES", options);

    let ff = datosContrato['fechaFin'];
    var fechaF = new Date(ff);
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaFin = fechaF.toLocaleDateString("es-ES", options);


    $("#inputFechaInicio").val(fechaInicio);
    $("#inputFechaFin").val(fechaFin);
    $("#inputNumeroDeContrato").val(datosContrato["idContrato"]);
    $("#inputDesde").val(datosContrato["fechaPagoInicio"]);
    $("#inputHasta").val(datosContrato["fechaPagoFin"]);


    $("#inputNombreApellido").val(datosContrato["nombres"] + " " + datosContrato["apellidos"] + ", Dni: " + datosContrato["dni"]);

    $("#inputDomicilio").val(datosContrato["tipo"] + " - " + datosContrato["domicilio"] + ",  Piso: " + datosContrato["piso"] + ",  Dto.: " + datosContrato["departamento"] + ", " + datosContrato["localidad"] + ", " + datosContrato["nombre"]);


}

// LLENAR INPUTS RECIBOS OFICIAL Y NO OFICIAL
function llenarInputsRecibo(idRegistroDePago, ban) {

    let uri2 = EndpointsEnum.COMPROBANTE_DE_PAGO;
    //console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri2,
        method: "POST",
        data: {
            action: "cargarComprobanteDePago",
            idRegistroDePago: idRegistroDePago
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        cargarDatosEnRecibo(JSON.parse(retorno), ban);

    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function cargarDatosEnRecibo(datosParaCargarRecibo, ban) {

    /*====================================================
    ban = 1 -> Fila en color rojo, paso periodo y se debe actualizar el valor del alquiler (c/6 meses comercial y c/12 vivienda)
    ban = 2 -> Fila color normal, resto de los meses
    =====================================================*/

    if (ban == 1) {
        alert("Actualizar el valor del alquiler mensual");
        document.getElementById('reciboOfiAlquilerMensual').readOnly = false;
        document.getElementById('reciboNoOfiAlquilerMensual').readOnly = false;
    } else if (ban == 2) {
        document.getElementById('reciboOfiAlquilerMensual').readOnly = true;
        document.getElementById('reciboNoOfiAlquilerMensual').readOnly = true;
    }

    var fecha = new Date();
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaHoy = fecha.toLocaleDateString("es-ES", options);

    if (datosParaCargarRecibo["tipoRegistroDePago"] == "Oficial") {

        $("#reciboOfiFechaHoy").val(fechaHoy);
        $("#reciboOfiNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
        $("#reciboOfiUnidadFuncional").val(datosParaCargarRecibo["torre"]);

        //inputs ocultos
        $("#reciboOfiIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
        $("#reciboOfiIdContrato ").val(datosParaCargarRecibo["idContrato"]);
        $("#reciboOfiTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);

        $("#reciboOfiDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombrePais"]);
        $("#reciboOfiCliente").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
        $("#reciboOfiCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
        $("#reciboOfiCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
        $("#reciboOfiAlquilerMensual").val(datosParaCargarRecibo["valorAlquiler"]);
        $("#reciboOfiExpensas").val(datosParaCargarRecibo["valorExpensas"]);
        $("#reciboOfiGastosAdministrativos").val(datosParaCargarRecibo["gastosAdministrativos"]);
        $("#reciboOfiDeposito").val(datosParaCargarRecibo["valorDeposito"]);
        $("#reciboOfiNumCuota").val(datosParaCargarRecibo["numCuotaAPagar"]);
        $("#reciboOfiCuota").val(datosParaCargarRecibo["cantCuotasDeposito"]);
        $("#reciboOfiSubTotal").val(datosParaCargarRecibo["subTotal"]);
        $("#reciboOfiTotalDias").val(datosParaCargarRecibo["diasMora"]);
        $("#reciboOfiInteresPorMora").val(datosParaCargarRecibo["interesPorMora"]);
        $("#reciboOfiOtrosConceptos").val(datosParaCargarRecibo["otrosConceptos"]);
        $("#reciboOfiSaldoAnterior").val(datosParaCargarRecibo["saldoAnterior"]);
        $("#reciboOfiTotal").val(datosParaCargarRecibo["totalImporteAPagar"]);
        $("#reciboOfiImporteRecibido").val(datosParaCargarRecibo["totalImporteAPagar"]);
        $("#reciboOfiSaldoPendiente").val(datosParaCargarRecibo["saldoPendiente"]);


    } else if (datosParaCargarRecibo["tipoRegistroDePago"] == "No Oficial") {

        $("#reciboNoOfiFechaHoy").val(fechaHoy);
        $("#reciboNoOfiNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
        $("#reciboNoOfiUnidadFuncional").val(datosParaCargarRecibo["torre"]);
        $("#reciboNoOfiIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
        $("#reciboNoOfiIdContrato ").val(datosParaCargarRecibo["idContrato"]);
        $("#reciboNoOfiTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
        $("#reciboNoOfiDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombrePais"]);
        $("#reciboNoOficialCliente").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
        $("#reciboNoOfiCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
        $("#reciboNoOfiCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
        $("#reciboNoOfiAlquilerMensual").val(datosParaCargarRecibo["valorAlquiler"]);
        $("#reciboNoOfiSubTotal").val(datosParaCargarRecibo["subTotal"]);
        $("#reciboNoOfiInteresPorMora").val(datosParaCargarRecibo["interesPorMora"]);
        $("#reciboNoOfiTotal").val(datosParaCargarRecibo["totalImporteAPagar"]);

    }

}

// LLENAR INPUTS RECIBOS SOLO SALDO
function llenarInputsReciboSoloSaldo(idRegistroDePago) {
    //console.debug("trayendo datos de registro de pago");

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "cargarComprobanteDePagoSoloSaldo",
            idRegistroDePago: idRegistroDePago
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        cargarDatosEnReciboSoloSaldoPendiente(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function cargarDatosEnReciboSoloSaldoPendiente(datosParaCargarReciboSaldo) {

    var fecha = new Date();
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaHoy = fecha.toLocaleDateString("es-ES", options);

    $("#saldoFecha").val(fechaHoy);
    $("#saldoNumeroComprobante").val(datosParaCargarReciboSaldo["numeroComprobante"]);
    $("#saldoUnidadFuncional").val(datosParaCargarReciboSaldo["torre"]);
    $("#saldoIdRegistroPago").val(datosParaCargarReciboSaldo["idRegistroDePago"]);
    $("#saldoIdContrato ").val(datosParaCargarReciboSaldo["idContrato"]);
    $("#saldoTipoComprobante ").val(datosParaCargarReciboSaldo["tipoRegistroDePago"]);
    $("#saldoDomicilio").val(datosParaCargarReciboSaldo["domicilio"] + ",  Piso: " + datosParaCargarReciboSaldo["piso"] + ",  Dto.: " + datosParaCargarReciboSaldo["departamento"] + ",  Localidad: " + datosParaCargarReciboSaldo["localidad"] + ", " + datosParaCargarReciboSaldo["nombrePais"]);
    $("#saldoLocatario").val(datosParaCargarReciboSaldo["nombres"] + " " + datosParaCargarReciboSaldo["apellidos"] + ", DNI: " + datosParaCargarReciboSaldo["dni"]);
    $("#saldoCorrespondienteMes").val(datosParaCargarReciboSaldo["mesCorto"]);
    $("#saldoCorrespondienteAnio").val(datosParaCargarReciboSaldo["correspondienteAnio"]);

    $("#saldoSaldoPendiente").val(datosParaCargarReciboSaldo["saldoAnterior"]);
    $("#saldoTotal").val(datosParaCargarReciboSaldo["saldoAnterior"]);
    $("#saldoTotalImporteRecibido").val(datosParaCargarReciboSaldo["saldoAnterior"]);
}

// LLENAR SELECT CON OPCIONES SALDO ANTERIOR RECIBO
function llenarSelectConOpcionesSaldoAnteriorRecibo(idRegistroDePago) {

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "sumarSaldoAnteriores",
            idRegistroDePago: idRegistroDePago
        }
    });

    funcionAjax.done(function (retorno) {
        //console.log(retorno);
        llenarDomSaldoAnterior(retorno);

    });

    funcionAjax.fail(function (retorno) {
        console.log("error al cargar select con alumnos")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de buscar a los alumnos")
    });
}

function llenarDomSaldoAnterior(arraySaldoAnterior) {

    console.log(arraySaldoAnterior);
    arraySaldoAnterior = JSON.parse(arraySaldoAnterior);

    let options = "";

    let optionDefault2 = "<option value=" + arraySaldoAnterior['saldoPendiente'] + "> " + arraySaldoAnterior['saldoPendiente'] + "</option>";
    let optionDefault = "<option value='0'>0</option>";
    options += optionDefault2;
    options += optionDefault;

    for (var i = 0, l = arraySaldoAnterior.length; i < l; i++) {
        options += arraySaldoAnterior[i];
    }
    $("#reciboOfiSaldoAnterior").html(options);
    $("#reciboNoOfiSaldoAnterior").html(options);
}

// INPUTS FORM COMPROBANTE DE PAGO CON ONCHANGE OFICIAL
function EditarValoresReciboOficial() {

    var alquilerMensual = document.getElementById("reciboOfiAlquilerMensual").value;
    var expensas = document.getElementById("reciboOfiExpensas").value;
    var gastosAdministrativos = document.getElementById("reciboOfiGastosAdministrativos").value;
    var deposito = document.getElementById("reciboOfiDeposito").value;

    var interesPorMora = document.getElementById("reciboOfiInteresPorMora").value;
    var otrosConceptos = document.getElementById("reciboOfiOtrosConceptos").value;
    var saldoAnterior = document.getElementById("reciboOfiSaldoAnterior").value;

    var recibido = document.getElementById("reciboOfiImporteRecibido").value;

    if (alquilerMensual == "") {
        alquilerMensual = 0;
    }
    if (expensas == "") {
        expensas = 0;
    }
    if (gastosAdministrativos == "") {
        gastosAdministrativos = 0;
    }
    if (deposito == "") {
        deposito = 0;
    }
    if (interesPorMora == "") {
        interesPorMora = 0;
    }
    if (otrosConceptos == "") {
        otrosConceptos = 0;
    }
    if (saldoAnterior == "") {
        saldoAnterior = 0;
    }
    if (recibido == "") {
        recibido = 0;
    }

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "EditarValoresReciboOficial",
            alquilerMensual: alquilerMensual,
            expensas: expensas,
            gastosAdministrativos: gastosAdministrativos,
            deposito: deposito,
            interesPorMora: interesPorMora,
            otrosConceptos: otrosConceptos,
            saldoAnterior: saldoAnterior,
            recibido: recibido

        }
    });

    funcionAjax.done(function (retorno) {

        let valores = JSON.parse(retorno);
        console.log(valores);

        $("#reciboOfiSubTotal").val(valores["subTotal"]);
        $("#reciboOfiTotal").val(valores["totalImporteAPagar"]);
        $("#reciboOfiSaldoPendiente").val(valores["saldoPendiente"]);
        $("#reciboOfiImporteRecibido").val(valores["totalImporteRecibido"]);
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al buscar el entrenado por dni")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de buscar el entrenado por dni")
    });
}

// INPUTS FORM COMPROBANTE DE PAGO CON ONCHANGE NO OFICIAL
function EditarValoresReciboNoOficial() {

    var alquilerMensual = document.getElementById("reciboNoOfiAlquilerMensual").value;
    var interesPorMora = document.getElementById("reciboNoOfiInteresPorMora").value;

    if (alquilerMensual == "") {
        alquilerMensual = 0;
    }
    if (interesPorMora == "") {
        interesPorMora = 0;
    }

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "EditarValoresReciboNoOficial",
            alquilerMensual: alquilerMensual,
            interesPorMora: interesPorMora,
        }
    });

    funcionAjax.done(function (retorno) {

        let valores = JSON.parse(retorno);
        console.log(valores);

        $("#reciboNoOfiSubTotal").val(valores["subTotal"]);
        $("#reciboNoOfiTotal").val(valores["totalImporteAPagar"]);

    });

    funcionAjax.fail(function (retorno) {
        console.log("error al buscar el entrenado por dni")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de buscar el entrenado por dni")
    });
}

// INPUTS FORM COMPROBANTE DE PAGO CON ONCHANGE OFICIAL IMPORTE RECIBIDO
function EditarValoresReciboOficialImporteRecibido() {


    var importeTotal = document.getElementById("reciboOfiTotal").value;
    var recibido = document.getElementById("reciboOfiImporteRecibido").value;

    if (importeTotal == "") {
        importeTotal = 0;
    }
    if (recibido == "") {
        recibido = 0;
    }

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "EditarValorImporteRecibido",
            importeTotal: importeTotal,
            recibido: recibido

        }
    });

    funcionAjax.done(function (retorno) {

        let valores = JSON.parse(retorno);
        console.log(valores);

        $("#reciboOfiSaldoPendiente").val(valores);

    });

    funcionAjax.fail(function (retorno) {
        console.log("error al buscar el entrenado por dni")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de buscar el entrenado por dni")
    });
}

// GUARDAR COMPROBANTE DE PAGO OFICIAL Y NO OFICIAL
function GuardarComprobanteDePago(num) {

    console.log("voy a mostrar parametro", num);

    if (num == 1) { //RECIBO OFICIAL

        var numeroComprobante = document.getElementById("reciboOfiNumeroComprobante").value;
        var correspondienteMes = document.getElementById("reciboOfiCorrespondienteMes").value;
        var correspondienteAnio = document.getElementById("reciboOfiCorrespondienteAnio").value;
        var idRegistroPago = document.getElementById("reciboOfiIdRegistroPago").value;
        var idContrato = document.getElementById("reciboOfiIdContrato").value;
        var tipoComprobante = document.getElementById("reciboOfiTipoComprobante").value;
        var tipoRecibo = 'Recibo';
        var alquilerMensual = document.getElementById("reciboOfiAlquilerMensual").value;
        var expensas = document.getElementById("reciboOfiExpensas").value;
        var gastosAdm = document.getElementById("reciboOfiGastosAdministrativos").value;
        var deposito = document.getElementById("reciboOfiDeposito").value;
        var numCuota = document.getElementById("reciboOfiNumCuota").value;
        var cuotas = document.getElementById("reciboOfiCuota").value;
        var interesPorMora = document.getElementById("reciboOfiInteresPorMora").value;
        var otrosConceptos = document.getElementById("reciboOfiOtrosConceptos").value;
        var saldoAnterior = document.getElementById("reciboOfiSaldoAnterior").value;
        var totalImporteAPagar = document.getElementById("reciboOfiTotal").value;
        var totalImporteRecibido = document.getElementById("reciboOfiImporteRecibido").value;
        var estado = 'Activo';


    } else if (num == 2) {  //RECIBO NO OFICIAL

        var numeroComprobante = document.getElementById("reciboNoOfiNumeroComprobante").value;
        var correspondienteMes = document.getElementById("reciboNoOfiCorrespondienteMes").value;
        var correspondienteAnio = document.getElementById("reciboNoOfiCorrespondienteAnio").value;
        var idRegistroPago = document.getElementById("reciboNoOfiIdRegistroPago").value;
        var idContrato = document.getElementById("reciboNoOfiIdContrato").value;
        var tipoComprobante = document.getElementById("reciboNoOfiTipoComprobante").value;
        var tipoRecibo = 'Recibo';
        var alquilerMensual = document.getElementById("reciboNoOfiAlquilerMensual").value;
        var expensas = 0;
        var gastosAdm = 0;
        var deposito = 0;
        var cuotas = 0;
        var numCuota = 0;
        var interesPorMora = document.getElementById("reciboNoOfiInteresPorMora").value;
        var otrosConceptos = 0;
        var saldoAnterior = 0;
        var totalImporteAPagar = document.getElementById("reciboNoOfiTotal").value;
        var totalImporteRecibido = document.getElementById("reciboNoOfiTotal").value;
        var estado = 'Activo';
    }

    console.log("Guardando comprobante de pago: ", numeroComprobante, idRegistroPago, idContrato, tipoComprobante, tipoRecibo, correspondienteMes, correspondienteAnio,
        alquilerMensual, expensas, gastosAdm, deposito, cuotas, numCuota, interesPorMora, otrosConceptos, saldoAnterior, totalImporteAPagar, totalImporteRecibido, estado);

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller comprobante de pagos = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "guardarComprobanteDePago",
            numeroComprobante: numeroComprobante,
            idRegistroPago: idRegistroPago,
            idContrato: idContrato,
            tipoComprobante: tipoComprobante,
            tipoRecibo: tipoRecibo,
            correspondienteMes: correspondienteMes,
            correspondienteAnio: correspondienteAnio,
            alquilerMensual: alquilerMensual,
            expensas: expensas,
            gastosAdm: gastosAdm,
            deposito: deposito,
            cuotas: cuotas,
            numCuota: numCuota,
            interesPorMora: interesPorMora,
            otrosConceptos: otrosConceptos,
            saldoAnterior: saldoAnterior,
            totalImporteAPagar: totalImporteAPagar,
            totalImporteRecibido: totalImporteRecibido,
            estado: estado

        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        ListadoDeRegistrosDePago();
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al guardar user")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");

}

//BUSCAR CUANTOS RECIBOS TIENE UN MISMO REGISTRO DE PAGO
function buscarCuantosRecibosTieneEsteRegistro(idRegistroDePago) {

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);
    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "buscarCuantosRecibosTieneEsteRegistro",
            idRegistroDePago: idRegistroDePago
        }
    });
    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        visualizarRecibo(JSON.parse(retorno));
    });
    funcionAjax.fail(function (retorno) {
        console.log("error al guardar user")
    });
    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");
}

function visualizarRecibo(retorno) {
    let cant = retorno["cantidadDeRecibos"];
    let idRegistroDePago = retorno["idRegistroDePago"];
    let tipo = retorno["tipoComprobanteDePago"];

    if (cant == 1) {
        if (tipo == "Oficial") {
            visualizarReciboOficial(idRegistroDePago);
        } else if (tipo == "No Oficial") {
            visualizarReciboNoOficial(idRegistroDePago);
        }
    } else if (cant == 2) {
        visualizarDosRecibos(idRegistroDePago);
    }
}

// GUARDAR COMPROBANTE DE PAGO solo SALDO
function GuardarComprobanteDePagoSoloSaldo() {
    var numeroComprobante = document.getElementById("saldoNumeroComprobante").value;
    var idRegistroPago = document.getElementById("saldoIdRegistroPago").value;
    var idContrato = document.getElementById("saldoIdContrato").value;
    var tipoComprobante = document.getElementById("saldoTipoComprobante").value;
    var tipoRecibo = 'Saldo';
    var correspondienteMes = document.getElementById("saldoCorrespondienteMes").value;
    var correspondienteAnio = document.getElementById("saldoCorrespondienteAnio").value;
    var alquilerMensual = 0;
    var expensas = 0;
    var gastosAdm = 0;
    var deposito = 0;
    var cuotas = 0;
    var numCuota = 0;
    var interesPorMora = 0;
    var otrosConceptos = 0;
    var totalImporteAPagar = document.getElementById("saldoTotal").value;
    var totalImporteRecibido = document.getElementById("saldoTotalImporteRecibido").value;
    var saldoPendiente = 0;
    var estado = 'Activo';

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "guardarComprobanteDePagoSoloSaldo",
            numeroComprobante: numeroComprobante,
            idRegistroPago: idRegistroPago,
            idContrato: idContrato,
            tipoComprobante: tipoComprobante,
            tipoRecibo: tipoRecibo,
            correspondienteMes: correspondienteMes,
            correspondienteAnio: correspondienteAnio,
            alquilerMensual: alquilerMensual,
            expensas: expensas,
            gastosAdm: gastosAdm,
            deposito: deposito,
            cuotas: cuotas,
            numCuota: numCuota,
            interesPorMora: interesPorMora,
            otrosConceptos: otrosConceptos,
            totalImporteAPagar: totalImporteAPagar,
            totalImporteRecibido: totalImporteRecibido,
            saldoPendiente: saldoPendiente,
            estado: estado
        }
    });
    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        ListadoDeRegistrosDePago();
    });
    funcionAjax.fail(function (retorno) {
        console.log("error al guardar user")
    });
    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");
}

// ELIMINAR O INHABILITAR CONTRATO
function EliminarInhabilitarContrato(idContrato) {

    let uri = EndpointsEnum.CONTRATO;
    console.log("Llamando a controller locatarios = " + uri);

    if (!confirm('Desea eliminar el contrato?')) {
        console.log("no se eliminara");
    } else {
        var funcionAjax = $.ajax({
            url: uri,
            method: "POST",
            data: {
                action: "eliminarInhabilitarContrato",
                idContrato: idContrato
            }
        });
        funcionAjax.done(function (retorno) {
            console.debug("Done: ", retorno);
            if (retorno == "ERROR") {
                window.alert("El contrato no se puede eliminar, tiene recibos realizados");
            } else if (retorno == "OK") {
                window.alert("Contrato eliminado correctamente");
                cargarContratosGrilla();
            }
        });
        funcionAjax.fail(function (retorno) {
            console.error(retorno);
        });
    }

}

// TODO: VISUALIZAR RECIBO OFICIAL CANTIDAD DOS - LISTAR
function cargarRecibosDeUnMismoRegistroGrilla(idRegistroDePago) {

    traerTodosRec(llenarRecGrilla,
        {
            action: "listarRecibosDeUnMismoRegistro",
            idRegistroDePago: idRegistroDePago
        }
    );
}

function traerTodosRec(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "traerTodosRec"} : data;

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller comprobante de pagos = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de locatarios")
    });

    funcionAjax.always(function (retorno) {
        console.log("always de promise locatarios")
    });
}

function llenarRecGrilla(jsonRec) {
    console.log(jsonRec);
    jsonRec = JSON.parse(jsonRec);

    let tableRaws = "";

    for (var i = 0, l = jsonRec.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += contruirFilasRecibos(jsonRec[i]);
        tableRaws += "</tr>";
    }

    $("#listRecibos").html(tableRaws);
}

function contruirFilasRecibos(Rec) {

    let raw = "";
    raw += "<td>" + Rec['tipoComprobanteDePago'] + "</td>";
    raw += "<td>" + Rec['tipoRecibo'] + "</td>";
    raw += "<td>" + Rec['numeroComprobante'] + "</td>";
    raw += "<td style='visibility:hidden; display: none;'>" + Rec['totalImporteAPagar'] + "</td>";
    raw += "<td style='visibility:hidden; display: none;'>" + Rec['valorAlquiler'] + "</td>";
    raw += "<td style='visibility:hidden; display: none;'>" + Rec['idRegistroDePago'] + "</td>";


    if (Rec['tipoComprobanteDePago'] == "Oficial") {

        if (Rec['tipoRecibo'] == "Recibo") {
            raw += "<td>";
            raw += "<button class='miBoton-icon' title='Visualizar Recibo' onclick='visualizarReciboOficial(" + Rec['idRegistroDePago'] + ")'>" +
                "<span class='glyphicon glyphicon-ok'></span>";
            raw += "</td> ";
            return raw;

        } else if (Rec['tipoRecibo'] == "Saldo") {
            raw += "<td>";
            raw += "<button class='miBoton-icon' title='Visualizar Recibo Saldo' onclick='visualizarReciboOficialSoloSaldo(" + Rec['idRegistroDePago'] + ")'>" +
                "<span class='glyphicon glyphicon-ok'></span>";
            raw += "</td> ";
            return raw;
        }

    } else if (Rec['tipoComprobanteDePago'] == "No Oficial") {

        if (Rec['tipoRecibo'] == "Recibo") {
            raw += "<td>";
            raw += "<button class='miBoton-icon' title='Visualizar Recibo' onclick='visualizarReciboNoOficial(" + Rec['idRegistroDePago'] + ")'>" +
                "<span class='glyphicon glyphicon-ok'></span>";
            raw += "</td> ";
            return raw;
        }
    }
}

// TODO: VISUALIZAR RECIBO OFICIAL
function visualizarReciboOficialCantidadUno(idRegistroDePago) {
    console.log("hoy sabado ");
    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller Comprobante de pago = " + uri);
    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "visualizarRecibo",
            idRegistroDePago: idRegistroDePago
        }
    });
    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        cargarVisualizacionRecibo(JSON.parse(retorno));
        convertirNumeroALetra(1);
    });
    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function cargarVisualizacionRecibo(datosParaCargarRecibo) {

    let alquilerMensual = datosParaCargarRecibo["valorAlquiler"];
    let expensas = datosParaCargarRecibo["valorExpensas"];
    let gasAdm = datosParaCargarRecibo["valorGastosAdm"];
    let deposito = datosParaCargarRecibo["valorDeposito"];
    let tipoComprobante = datosParaCargarRecibo["tipoComprobanteDePago"];

    let subTotal = alquilerMensual + expensas + gasAdm + deposito;

    var fecha = new Date();
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaHoy = fecha.toLocaleDateString("es-ES", options);


    $("#visualizacionFecha").val(fechaHoy);
    $("#visualizacionNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
    $("#visualizacionUnidadFuncional").val(datosParaCargarRecibo["torre"]);

    //inputs ocultos
    $("#visualizacionIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
    $("#visualizacionIdContrato ").val(datosParaCargarRecibo["idContrato"]);
    $("#visualizacionTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
    $("#visualizacionIdComprobanteDePago ").val(datosParaCargarRecibo["idComprobanteDePago"]);

    $("#visualizacionDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombre"]);
    $("#visualizacionLocatario").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
    $("#visualizacionCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
    $("#visualizacionCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
    $("#visualizacionAlquilerMensual").val("$ " + datosParaCargarRecibo["valorAlquiler"]);
    $("#visualizacionExpensas").val("$ " + datosParaCargarRecibo["valorExpensas"]);
    $("#visualizacionGastosAdministrativos").val("$ " + datosParaCargarRecibo["valorGastosAdm"]);
    $("#visualizacionDeposito").val("$ " + datosParaCargarRecibo["valorDeposito"]);
    $("#visualizacionCuota").val(datosParaCargarRecibo["cantCuotasDeposito"]);
    $("#visualizacionNumCuota").val(datosParaCargarRecibo["numCuotaAPagar"]);
    $("#visualizacionSubTotal").val("$ " + subTotal);
    $("#visualizacionInteresPorMora").val("$ " + datosParaCargarRecibo["interesPorMora"]);
    $("#visualizacionTotalDias").val(datosParaCargarRecibo["diasMora"]);
    $("#visualizacionOtrosConceptos").val("$ " + datosParaCargarRecibo["otrosConceptos"]);
    $("#visualizacionSaldoAnterior").val("$ " + datosParaCargarRecibo["saldoAnterior"]);
    $("#visualizacionTotal").val("$ " + datosParaCargarRecibo["totalImporteAPagar"]);
    $("#visualizacionImporteRecibido").val("$ " + datosParaCargarRecibo["totalImporteRecibido"]);
    $("#visualizacionSaldoPendiente").val("$ " + datosParaCargarRecibo["saldoPendienteSinModificar"]);

}

// TODO: VISUALIZAR RECIBO NO OFICIAL
function visualizarReciboNoOficialCantidadUno(idRegistroDePago) {

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);
    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "visualizarRecibo",
            idRegistroDePago: idRegistroDePago
        }
    });
    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        cargarVisualizacionReciboNoOficial(JSON.parse(retorno));
        convertirNumeroALetra(2);
    });
    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function cargarVisualizacionReciboNoOficial(datosParaCargarRecibo) {

    let alquilerMensual = datosParaCargarRecibo["valorAlquiler"];
    let subTotal = alquilerMensual;

    var fecha = new Date();
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaHoy = fecha.toLocaleDateString("es-ES", options);

    $("#noOfiFecha").val(fechaHoy);
    $("#noOfiNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
    $("#noOfiUnidadFuncional").val(datosParaCargarRecibo["torre"]);
    $("#noOfiIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
    $("#noOfiIdContrato ").val(datosParaCargarRecibo["idContrato"]);
    $("#noOfiTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
    $("#noOfiIdComprobanteDePago ").val(datosParaCargarRecibo["idComprobanteDePago"]);
    $("#noOfiDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombre"]);
    $("#noOfiLocatario").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
    $("#noOfiCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
    $("#noOfiCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
    $("#noOfiAlquilerMensual").val("$ " + datosParaCargarRecibo["valorAlquiler"]);
    $("#noOfiExpensas").val("$ " + datosParaCargarRecibo["valorExpensas"]);
    $("#noOfiGastosAdministrativos").val("$ " + datosParaCargarRecibo["valorGastosAdm"]);
    $("#noOfiDeposito").val("$ " + datosParaCargarRecibo["valorDeposito"]);
    $("#noOfiCuota").val(datosParaCargarRecibo["cantCuotasDeposito"]);
    $("#noOfiNumCuota").val(datosParaCargarRecibo["numCuotaAPagar"]);
    $("#noOfiSubTotal").val("$ " + subTotal);
    $("#noOfiInteresPorMora").val("$ " + datosParaCargarRecibo["interesPorMora"]);
    $("#noOfiTotal").val("$ " + datosParaCargarRecibo["totalImporteAPagar"]);
}

// TODO: VISUALIZAR RECIBO OFICIAL solo SALDO
function visualizarReciboOficialSaldo(idRegistroDePago) {

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "visualizarReciboOficialSoloSaldo",
            idRegistroDePago: idRegistroDePago
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        cargarVisualizacionReciboOficialSaldo(JSON.parse(retorno));
        convertirNumeroALetra(3);
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function cargarVisualizacionReciboOficialSaldo(Saldo) {

    var fecha = new Date();
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaHoy = fecha.toLocaleDateString("es-ES", options);


    $("#visuFecha").val(fechaHoy);
    $("#visuNumeroComprobante").val(Saldo["numeroComprobante"]);
    $("#visuUnidadFuncional").val(Saldo["torre"]);
    $("#visuIdRegistroPago").val(Saldo["idRegistroDePago"]);
    $("#visuIdContrato ").val(Saldo["idContrato"]);
    $("#visuTipoComprobante ").val(Saldo["tipoRegistroDePago"]);
    $("#visuIdComprobanteDePago ").val(Saldo["idComprobanteDePago"]);
    $("#visuDomicilio").val(Saldo["domicilio"] + ",  Piso: " + Saldo["piso"] + ",  Dto.: " + Saldo["departamento"] + ",  Localidad: " + Saldo["localidad"] + ", " + Saldo["nombrePais"]);
    $("#visuLocatario").val(Saldo["nombres"] + " " + Saldo["apellidos"] + ", DNI: " + Saldo["dni"]);
    $("#visuCorrespondienteMes").val(Saldo["mesCorto"]);
    $("#visuCorrespondienteAnio").val(Saldo["correspondienteAnio"]);
    $("#visuSaldoPendiente").val(Saldo["totalImporteAPagar"]);
    $("#visuTotal").val(Saldo["totalImporteAPagar"]);
    $("#visuTotalImporteRecibido").val(Saldo["totalImporteAPagar"]);

}

//PDF
function printPdfReciboOficial() {
    var numeroComprobante = document.getElementById("visualizacionNumeroComprobante").value;

    var divHeight = $('#bodyReciboOficial').height();
    var divWidth = $('#bodyReciboOficial').width();
    var ratio = divHeight / divWidth;
    var body = document.getElementById('bodyReciboOficial');
    html2canvas(body)
        .then(function (canvas) {
            document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width + 0, height + 20);
            doc.save('ReciboOficial-' + numeroComprobante + '.pdf');
        });
}

function printPdfReciboNoOficial() {
    var numeroComprobante = document.getElementById("noOfiNumeroComprobante").value;

    var divHeight = $('#bodyReciboNoOficial').height();
    var divWidth = $('#bodyReciboNoOficial').width();
    var ratio = divHeight / divWidth;
    var body = document.getElementById('bodyReciboNoOficial');
    html2canvas(body)
        .then(function (canvas) {
            document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width + 0, height + 20);
            doc.save('ReciboNoOficial-' + numeroComprobante + '.pdf');
        });
}

function printPdfReciboOficialSoloSaldo() {
    var numeroComprobante = document.getElementById("visuNumeroComprobante").value;

    var divHeight = $('#bodyReciboOficialSoloSaldo').height();
    var divWidth = $('#bodyReciboOficialSoloSaldo').width();
    var ratio = divHeight / divWidth;
    var body = document.getElementById('bodyReciboOficialSoloSaldo');
    html2canvas(body)
        .then(function (canvas) {
            document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width + 0, height + 20);
            doc.save('ReciboOficialSoloSaldo-' + numeroComprobante + '.pdf');
        });
}

function printPdfReciboNoOficialSoloSaldo() {
    var numeroComprobante = document.getElementById("saldo3NumeroComprobante").value;

    var divHeight = $('#bodyReciboNoOficialSoloSaldo').height();
    var divWidth = $('#bodyReciboNoOficialSoloSaldo').width();
    var ratio = divHeight / divWidth;
    var body = document.getElementById('bodyReciboNoOficialSoloSaldo');
    html2canvas(body)
        .then(function (canvas) {
            document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width + 0, height + 20);
            doc.save('ReciboNoOficialSoloSaldoNumero-' + numeroComprobante + '.pdf');
        });
}

// CONVERTIR NUMERO A LETRA RECIBO OFICIAL
function convertirNumeroALetra(num) {

    /* ===================================
    num = 1 - Recibo Oficial
    num = 2 - Recibo No Oficial
    num = 3 - Recibo Oficial Saldo
    =====================================*/

    if (num == 1) {
        var idComprobanteDePago = document.getElementById("visualizacionIdComprobanteDePago").value; //OFICIAL
    } else if (num == 2) {
        var idComprobanteDePago = document.getElementById("noOfiIdComprobanteDePago").value; //NO OFICIAL
    } else if (num == 3) {
        var idComprobanteDePago = document.getElementById("visuIdComprobanteDePago").value; //OFICIAL SALDO
    }

    console.log("mostrando importe para pasar a letra: ", idComprobanteDePago);
    let uri = EndpointsEnum.CIFRALETRA;
    console.log("Llamando a Importe en letra controller = " + uri);
    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "convertirCifraEnLetra",
            idComprobanteDePago: idComprobanteDePago
        }
    });
    funcionAjax.done(function (retorno) {
        console.log(retorno);
        if (num == 1) {
            $("#visualizacionImporteRecibidoEnLetra").val(retorno); //OFICIAL
        } else if (num == 2) {
            $("#noOfiImporteRecibidoEnLetra").val(retorno);  //NO OFICIAL
        } else if (num == 3) {
            $("#visuImporteRecibidoEnLetra").val(retorno); //OFICIAL SALDO
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

// CONVERTIR NUMERO A LETRA RECIBO NO OFICIAL
// function convertirNumeroALetra() {
//
//     var idRegistroDePago = mapToJson($('#noOfiIdRegistroPago').serializeArray());
//
//     console.log("mostrando importe a letra: ", idRegistroDePago);
//     let uri = EndpointsEnum.CIFRALETRA;
//     console.log("Llamando a Importe en letra controller = " + uri);
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "convertirCifraEnLetra",
//             idRegistroDePago: idRegistroDePago
//         }
//     });
//     funcionAjax.done(function (retorno) {
//         console.log(retorno);
//         $("#noOfiImporteRecibidoEnLetra").val(retorno);
//     });
//     funcionAjax.fail(function (retorno) {
//         console.log("error al guardar user")
//     });
//     funcionAjax.always(function (retorno) {
//         console.log("volvi de guardar el user")
//     });
//     console.log("Fin llamada controller usuario");
// }
