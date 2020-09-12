$(function () {
    $("#listarRecibos").show();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#visualizarReciboSaldoOficial").hide();
    listarRecibos();
});

// TODO: Visualizar recibo Oficial
function visualizarReciboOficial(idComprobantesDePago) {
    $("#listarRecibos").hide();
    $("#visualizarReciboOficial").show();
    $("#visualizarReciboNoOficial").hide();
    $("#visualizarReciboSaldoOficial").hide();
    cargarReciboOficial(idComprobantesDePago);
}

// TODO: Visualizar recibo Oficial solo saldo
function visualizarReciboOficialSoloSaldo(idComprobantesDePago) {
    $("#listarRecibos").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#visualizarReciboSaldoOficial").show();
    cargarReciboOficialSoloSaldo(idComprobantesDePago);
}

// TODO: Visualizar recibo No Oficial
function visualizarReciboNoOficial(idComprobantesDePago) {
    $("#listarRecibos").hide();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboNoOficial").show();
    $("#visualizarReciboSaldoOficial").hide();
    cargarReciboNoOficial(idComprobantesDePago);
}

// TODO: boton Atras
function Atras() {
    $("#listarRecibos").show();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#visualizarReciboSaldoOficial").hide();
    listarRecibos();
}


// LISTAR COMPROBANTES DE PAGOS
function listarRecibos() {
    listadoCompDePago(llenarComprobantesDePagosGrilla,
        {
            action: "listarRecibos",
        }
    );
}

function listadoCompDePago(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "listadoCompDePago"} : data;

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
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

function llenarComprobantesDePagosGrilla(jsonCompPagos) {
    //console.log(jsonCompPagos);

    jsonCompPagos = JSON.parse(jsonCompPagos);

    let tableRaws = "";

    for (var i = 0, l = jsonCompPagos.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += contruirFilasComprobantesDePagos(jsonCompPagos[i]);
        tableRaws += "</tr>";
    }

    $("#listadoCompDePago").html(tableRaws);
}

function contruirFilasComprobantesDePagos(compPagos) {

    let fc = compPagos['fechaComprobante'];
    var fecha = new Date(fc);
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaComprobante = fecha.toLocaleDateString("es-ES", options);

    let raw = "";
    raw += "<td style='visibility:hidden; display: none;'>" + compPagos['idComprobantesDePago'] + "</td>";
    raw += "<td>" + compPagos['numeroComprobante'] + "</td>";
    raw += "<td style='visibility:hidden; display: none;'>" + compPagos['idContrato'] + "</td>";
    raw += "<td style='visibility:hidden; display: none;'>" + compPagos['idRegistroDePago'] + "</td>";
    raw += "<td>" + fechaComprobante + "</td>";
    raw += "<td>" + compPagos['tipoComprobanteDePago'] + "</td>";
    raw += "<td>" + compPagos['tipoRecibo'] + "</td>";
    raw += "<td>" + compPagos['mesCorto'] + "</td>";
    raw += "<td>" + compPagos['correspondienteAnio'] + "</td>";
    raw += "<td>" + compPagos['totalImporteAPagar'] + "</td>";
    raw += "<td>" + compPagos['totalImporteRecibido'] + "</td>";
    raw += "<td>" + compPagos['saldoPendiente'] + "</td>";
    raw += "<td>" + compPagos['saldoPendienteSinModificar'] + "</td>";

    raw += "<td>";
    raw += "<button class='miBoton-icon' title='Generar Comprobante de pago' onclick='buscarDatosRecibo(" + compPagos['idComprobantesDePago'] + ")'>" +
        "<span class='glyphicon glyphicon-share'></span>";
    raw += "</td> ";

    return raw;
}

// BUSCAR DATOS DEL RECIBO
function buscarDatosRecibo(idComprobantesDePago) {
    console.debug("trayendo datos de recibo");

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "datosRecibo",
            idComprobantesDePago: idComprobantesDePago
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        cargarDatosDeRecibo(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function cargarDatosDeRecibo(datos) {

    let idComprobantesDePago = datos["idComprobantesDePago"];
    let tipoComprobante = datos["tipoComprobanteDePago"];
    let tipoRecibo = datos["tipoRecibo"];


    if (tipoComprobante == "Oficial") {

        if(tipoRecibo == "Recibo"){
            visualizarReciboOficial(idComprobantesDePago);

        }else if(tipoRecibo == "Saldo"){
            visualizarReciboOficialSoloSaldo(idComprobantesDePago);
        }

    } else if (tipoComprobante == "No Oficial") {

        if(tipoRecibo == "Recibo"){
            visualizarReciboNoOficial(idComprobantesDePago);

        }else if(tipoRecibo == "Saldo"){
            visualizarReciboNoOficialSoloSaldo(idComprobantesDePago);

        }
    }

}

// RECIBO OFICIAL
function cargarReciboOficial(idComprobantesDePago) {
    console.debug("trayendo datos de recibo");

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "visualizarRecibo2",
            idComprobantesDePago: idComprobantesDePago
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        verReciboOficial(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function verReciboOficial(datosParaCargarRecibo) {

    $("#unoFecha").val(datosParaCargarRecibo["fechaComprobante"]);
    $("#unoNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
    $("#unoUnidadFuncional").val(datosParaCargarRecibo["torre"]);
    $("#unoIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
    $("#unoIdContrato ").val(datosParaCargarRecibo["idContrato"]);
    $("#unoTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
    $("#unoDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombrePais"]);
    $("#unoLocatario").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
    $("#unoCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
    $("#unoCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
    $("#unoAlquilerMensual").val(datosParaCargarRecibo["valorAlquiler"]);
    $("#unoExpensas").val(datosParaCargarRecibo["valorExpensas"]);
    $("#unoGastosAdministrativos").val(datosParaCargarRecibo["valorGastosAdm"]);
    $("#unoDeposito").val(datosParaCargarRecibo["valorDeposito"]);
    $("#unoNumCuota").val(datosParaCargarRecibo["numCuotaAPagar"]);
    $("#unoCuota").val(datosParaCargarRecibo["cantCuotasDeposito"]);

    let alquilerMensual = datosParaCargarRecibo["valorAlquiler"];
    let expensas = datosParaCargarRecibo["valorExpensas"];
    let gasAdm = datosParaCargarRecibo["valorGastosAdm"];
    let deposito = datosParaCargarRecibo["valorDeposito"];

    var total = alquilerMensual + expensas + gasAdm + deposito;

    $("#unoSubTotal").val(total);

    //$("#unoSubTotal").val(datosParaCargarRecibo["subTotal"]);
    $("#unoTotalDias").val(datosParaCargarRecibo["diasMora"]);
    $("#unoInteresPorMora").val(datosParaCargarRecibo["interesPorMora"]);
    $("#unoOtrosConceptos").val(datosParaCargarRecibo["otrosConceptos"]);
    $("#unoSaldoAnterior").val(datosParaCargarRecibo["saldoAnterior"]);
    $("#unoTotal").val(datosParaCargarRecibo["totalImporteAPagar"]);
    $("#unoImporteRecibido").val(datosParaCargarRecibo["totalImporteRecibido"]);
    $("#unoSaldoPendiente").val(datosParaCargarRecibo["saldoPendienteSinModificar"]);

}

// RECIBO NO OFICIAL
function cargarReciboNoOficial(idComprobantesDePago) {
    console.debug("trayendo datos de recibo");

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "visualizarRecibo2",
            idComprobantesDePago: idComprobantesDePago
        }
    });
    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        verReciboNoOficial(JSON.parse(retorno));
    });
    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function verReciboNoOficial(datosParaCargarRecibo) {

    $("#dosFecha").val(datosParaCargarRecibo["fechaComprobante"]);
    $("#dosNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
    $("#dosUnidadFuncional").val(datosParaCargarRecibo["torre"]);
    $("#dosIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
    $("#dosIdContrato ").val(datosParaCargarRecibo["idContrato"]);
    $("#dosTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
    $("#dosDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombrePais"]);
    $("#dosLocatario").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
    $("#dosCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
    $("#dosCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
    $("#dosAlquilerMensual").val(datosParaCargarRecibo["valorAlquiler"]);

    $("#dosSubTotal").val(datosParaCargarRecibo["valorAlquiler"]);


    $("#dosInteresPorMora").val(datosParaCargarRecibo["interesPorMora"]);

    $("#dosTotal").val(datosParaCargarRecibo["totalImporteAPagar"]);


}

// RECIBO OFICIAL SALDO
function cargarReciboOficialSoloSaldo(idComprobantesDePago) {
    console.debug("trayendo datos de recibo");

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "visualizarRecibo2",
            idComprobantesDePago: idComprobantesDePago
        }
    });
    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        verReciboOficialSoloSaldo(JSON.parse(retorno));
    });
    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function verReciboOficialSoloSaldo(datosParaCargarRecibo) {

    $("#tresFecha").val(datosParaCargarRecibo["fechaComprobante"]);
    $("#tresNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
    $("#tresUnidadFuncional").val(datosParaCargarRecibo["torre"]);
    $("#tresIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
    $("#tresIdContrato ").val(datosParaCargarRecibo["idContrato"]);
    $("#tresTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
    $("#tresDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombrePais"]);
    $("#tresLocatario").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
    $("#tresCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
    $("#tresCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
    $("#tresSaldoPendiente").val(datosParaCargarRecibo["totalImporteAPagar"]);
    $("#tresTotal").val(datosParaCargarRecibo["totalImporteAPagar"]);
    $("#tresImporteRecibido").val(datosParaCargarRecibo["totalImporteRecibido"]);

}

// RECIBO NO OFICIAL SALDO
function cargarReciboNoOficialSoloSaldo(idComprobantesDePago) {
    console.debug("trayendo datos de recibo");

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "visualizarRecibo2",
            idComprobantesDePago: idComprobantesDePago
        }
    });
    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);
        verReciboNoOficialSoloSaldo(JSON.parse(retorno));
    });
    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function verReciboNoOficialSoloSaldo(datosParaCargarRecibo) {

    $("#cuatroFecha").val(datosParaCargarRecibo["fechaComprobante"]);
    $("#cuatroNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
    $("#cuatroUnidadFuncional").val(datosParaCargarRecibo["torre"]);
    $("#cuatroIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
    $("#cuatroIdContrato ").val(datosParaCargarRecibo["idContrato"]);
    $("#cuatroTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
    $("#cuatroDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombrePais"]);
    $("#cuatroLocatario").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
    $("#cuatroCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
    $("#cuatroCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
    $("#cuatroSaldoPendiente").val(datosParaCargarRecibo["totalImporteAPagar"]);
    $("#cuatroTotal").val(datosParaCargarRecibo["totalImporteAPagar"]);
    $("#cuatroImporteRecibido").val(datosParaCargarRecibo["totalImporteRecibido"]);

}

function printPdfReciboOficial() {
    //let uriPage = EndpointsEnum.VOLVER_RECIBOS;
    var numeroComprobante = document.getElementById("unoNumeroComprobante").value;

    var divHeight = $('#bodyReciboOficial1').height();
    var divWidth = $('#bodyReciboOficial1').width();
    var ratio = divHeight / divWidth;
    var body = document.getElementById('bodyReciboOficial1');
    html2canvas(body)
        .then(function(canvas){
            document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width+0, height+20);
            doc.save('ReciboOficial-' + numeroComprobante + '.pdf');
        });
    //location.href = uriPage;
}

function printPdfReciboNoOficial() {
    //let uriPage = EndpointsEnum.VOLVER_RECIBOS;
    var numeroComprobante = document.getElementById("dosNumeroComprobante").value;

    var divHeight = $('#bodyReciboNoOficial1').height();
    var divWidth = $('#bodyReciboNoOficial1').width();
    var ratio = divHeight / divWidth;
    var body = document.getElementById('bodyReciboNoOficial1');
    html2canvas(body)
        .then(function(canvas){
            document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width+0, height+20);
            doc.save('ReciboNoOficial-' + numeroComprobante + '.pdf');
            //location.href = uriPage;
        });

}

function printPdfReciboOficialSoloSaldo() {
    //let uriPage = EndpointsEnum.VOLVER_RECIBOS;
    var numeroComprobante = document.getElementById("tresNumeroComprobante").value;

    var divHeight = $('#bodyReciboOficialSoloSaldo1').height();
    var divWidth = $('#bodyReciboOficialSoloSaldo1').width();
    var ratio = divHeight / divWidth;
    var body = document.getElementById('bodyReciboOficialSoloSaldo1');
    html2canvas(body)
        .then(function(canvas){
            document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width+0, height+20);
            doc.save('ReciboOficialSoloSaldo-' + numeroComprobante + '.pdf');
        });
    //location.href = uriPage;
}


