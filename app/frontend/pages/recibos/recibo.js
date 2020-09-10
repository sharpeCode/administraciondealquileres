$(function () {
    $("#listarRecibos").show();
    $("#visualizarReciboOficial").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#visualizarReciboSaldoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
    listarRecibos();
});

// TODO: Visualizar recibos solo lectura
function visualizarReciboSoloLectura(idRegistroDePago) {
    $("#contratoAdd").hide();
    $("#contratoList").show();
    $("#contratoDatosCompletos").hide();
    $("#registroDePagoList").hide();
    $("#comprobanteDePagoOficial").hide();
    $("#recibosList").hide();
    $("#comprobanteDePagoNoOficial").hide();
    $("#visualizarReciboOficialCantidadUno").hide();
    $("#visualizarReciboOficialCantidadDos").hide();
    $("#comprobDePagoSaldoOficial").hide();
    $("#visualizarReciboOficialSoloSaldo").hide();
    $("#visualizarReciboNoOficial").hide();
    $("#comprobDePagoSaldoNoOficial").hide();
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

    var funcionAjax = $.ajax({
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/RecibosController.php",
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
    raw += "<td>" + compPagos['numeroComprobante'] + "</td>";
    raw += "<td>" + compPagos['idContrato'] + "</td>";
    raw += "<td>" + compPagos['idRegistroDePago'] + "</td>";
    raw += "<td>" + fechaComprobante + "</td>";
    raw += "<td>" + compPagos['tipoComprobanteDePago'] + "</td>";
    raw += "<td>" + compPagos['mesCorto'] + "</td>";
    raw += "<td>" + compPagos['correspondienteAnio'] + "</td>";
    raw += "<td>" + compPagos['totalImporteAPagar'] + "</td>";
    raw += "<td>" + compPagos['totalImporteRecibido'] + "</td>";
    raw += "<td>" + compPagos['saldoPendiente'] + "</td>";
    raw += "<td>" + compPagos['saldoPendienteSinModificar'] + "</td>";

    raw += "<td>";
    raw += "<button class='miBoton-icon' title='Generar Comprobante de pago' onclick='buscarDatosRecibo(" + compPagos['idRegistroDePago'] + ")'>" +
        "<span class='glyphicon glyphicon-share'></span>";
    raw += "</td> ";

    return raw;
}

// BUSCAR DATOS DEL RECIBO
function buscarDatosRecibo(idRegistroDePago) {
    console.debug("trayendo datos de recibo");

    var funcionAjax = $.ajax({
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/ComprobanteDePagoController.php",
        method: "POST",
        data: {
            action: "visualizarRecibo",
            idRegistroDePago: idRegistroDePago
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

function cargarDatosDeRecibo(datosParaCargarRecibo) {


    if (datosParaCargarRecibo["tipoComprobanteDePago"] == "Oficial") {

        $("#listarRecibos").hide();
        $("#visualizarReciboOficial").show();
        $("#visualizarReciboNoOficial").hide();
        $("#visualizarReciboSaldoOficial").hide();
        $("#comprobDePagoSaldoNoOficial").hide();

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

        $("#unoSubTotal").val(datosParaCargarRecibo["subTotal"]);
        $("#unoTotalDias").val(datosParaCargarRecibo["diasMora"]);
        $("#unoInteresPorMora").val(datosParaCargarRecibo["interesPorMora"]);
        $("#unoOtrosConceptos").val(datosParaCargarRecibo["otrosConceptos"]);
        $("#unoSaldoAnterior").val(datosParaCargarRecibo["saldoAnterior"]);
        $("#unoTotal").val(datosParaCargarRecibo["totalImporteAPagar"]);
        $("#unoImporteRecibido").val(datosParaCargarRecibo["totalImporteRecibido"]);
        $("#unoSaldoPendiente").val(datosParaCargarRecibo["saldoPendienteSinModificar"]);


    } else if (datosParaCargarRecibo["tipoComprobanteDePago"] == "No Oficial") {

        $("#listarRecibos").hide();
        $("#visualizarReciboOficial").hide();
        $("#visualizarReciboNoOficial").show();
        $("#visualizarReciboSaldoOficial").hide();
        $("#comprobDePagoSaldoNoOficial").hide();

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
        $("#dosTotalDias").val(datosParaCargarRecibo["diasMora"]);
        $("#dosInteresPorMora").val(datosParaCargarRecibo["interesPorMora"]);
        $("#dosOtrosConceptos").val(datosParaCargarRecibo["otrosConceptos"]);
        $("#dosSaldoAnterior").val(datosParaCargarRecibo["saldoAnterior"]);
        $("#dosTotal").val(datosParaCargarRecibo["totalImporteAPagar"]);
        $("#dosImporteRecibido").val(datosParaCargarRecibo["totalImporteRecibido"]);
        $("#dosSaldoPendiente").val(datosParaCargarRecibo["saldoPendienteSinModificar"]);

    }

}

function demoFromHTML()
{
    // var doc = new jsPDF();
    // doc.text(20, 20, 'Sharp Code COMPANY!');
    // doc.text(20, 30, 'Esto de imprimir en pdf es una cagada');
    //
    //
    // doc.setLineWidth(0.9);
    // doc.line(20, 25, 200, 25);
    // doc.setDrawColor(255,40,40); // draw red lines
    //
    //
    // doc.save('Recibo.pdf');

    var doc = new jsPDF();
    var elementHTML = $('#bodyReciboOficial').html();
    var specialElementHandlers = {
        '#elementH': function (element, renderer) {
            return true;
        }
    };
    doc.fromHTML(elementHTML, 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });

    doc.setLineWidth(0.9);
    doc.line(20, 25, 200, 25);

// Save the PDF
    doc.save('sample-document.pdf');

}

