$(function () {
    $("#RlistarRecibos").show();
    $("#RvisualizarReciboOficial").hide();
    $("#RvisualizarReciboNoOficial").hide();
    $("#RvisualizarReciboSaldoOficial").hide();
    listarRecibos();
});

// TODO: Visualizar recibo Oficial
function visualizarReciboOficial(idComprobantesDePago) {
    $("#RlistarRecibos").hide();
    $("#RvisualizarReciboOficial").show();
    $("#RvisualizarReciboNoOficial").hide();
    $("#RvisualizarReciboSaldoOficial").hide();
    cargarReciboOficial(idComprobantesDePago);
}

// TODO: Visualizar recibo Oficial solo saldo
function visualizarReciboOficialSoloSaldo(idComprobantesDePago) {
    $("#RlistarRecibos").hide();
    $("#RvisualizarReciboOficial").hide();
    $("#RvisualizarReciboNoOficial").hide();
    $("#RvisualizarReciboSaldoOficial").show();
    cargarReciboOficialSoloSaldo(idComprobantesDePago);
}

// TODO: Visualizar recibo No Oficial
function visualizarReciboNoOficial(idComprobantesDePago) {
    $("#RlistarRecibos").hide();
    $("#RvisualizarReciboOficial").hide();
    $("#RvisualizarReciboNoOficial").show();
    $("#RvisualizarReciboSaldoOficial").hide();
    cargarReciboNoOficial(idComprobantesDePago);
}

// TODO: boton Atras
function Atras() {
    $("#RlistarRecibos").show();
    $("#RvisualizarReciboOficial").hide();
    $("#RvisualizarReciboNoOficial").hide();
    $("#RvisualizarReciboSaldoOficial").hide();
    listarRecibos();
}


// LISTAR COMPROBANTES DE PAGOS
function listarRecibos() {
    console.log("holaaaaa");
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

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de comprobantes de pago")
    });
    funcionAjax.always(function (retorno) {
        console.log("always de promise comprobantes de pago")
    });
}

function llenarComprobantesDePagosGrilla(jsonCompPagos) {

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

    $("#RlistarRecibos").show();
    let fc = compPagos['fechaComprobante'];
    var fecha = new Date(fc);
    var options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    var fechaComprobante = fecha.toLocaleDateString("es-ES", options);

    let raw = "";
    raw += "<td style = 'text-align: center;word-wrap: break-word;' hidden='true'>" + compPagos['idComprobanteDePago'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + compPagos['numeroComprobante'] + "</td>";
    raw += "<td style='visibility:hidden; display: none;'>" + compPagos['idContrato'] + "</td>";
    raw += "<td style='visibility:hidden; display: none;'>" + compPagos['idRegistroDePago'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + fechaComprobante + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + compPagos['tipoComprobanteDePago'] + "</td>";
    raw += "<td style = 'text-align: center;word-wrap: break-word;' hidden='true'>" + compPagos['tipoRecibo'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + compPagos['mesCorto'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + compPagos['correspondienteAnio'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + compPagos['totalImporteAPagar'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + compPagos['totalImporteRecibido'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + compPagos['saldoPendiente'] + "</td>";
    raw += "<td td style = 'text-align: center;word-wrap: break-word;' hidden='true'>" + compPagos['saldoPendienteSinModificar'] + "</td>";

    raw += "<td>";
    raw += "<button class='miBoton-icon' title='Generar Comprobante de pago' onclick='buscarDatosRecibo(" + compPagos['idComprobanteDePago'] + ")'>" +
        "<span class='glyphicon glyphicon-share'></span>";
    raw += "</td> ";

    return raw;
}

// BUSCAR DATOS DEL RECIBO
function buscarDatosRecibo(idComprobanteDePago) {

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "datosRecibo",
            idComprobanteDePago: idComprobanteDePago
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

    let idComprobantesDePago = datos["idComprobanteDePago"];
    let tipoComprobante = datos["tipoComprobanteDePago"];
    let tipoRecibo = datos["tipoRecibo"];

    if (tipoComprobante == "Oficial") {

        if (tipoRecibo == "Recibo") {
            visualizarReciboOficial(idComprobantesDePago);

        } else if (tipoRecibo == "Saldo") {
            visualizarReciboOficialSoloSaldo(idComprobantesDePago);
        }

    } else if (tipoComprobante == "No Oficial") {
        visualizarReciboNoOficial(idComprobantesDePago);
    }
}

// RECIBO OFICIAL
function cargarReciboOficial(idComprobantesDePago) {

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;

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
        convertirNumeroALetra(1);
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function verReciboOficial(datosParaCargarRecibo) {

    let fechaComprobante = datosParaCargarRecibo["fechaComprobante"];
    var fechaFor = fechaComprobante.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');

    $("#unoFecha").val(fechaFor);
    $("#unoNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
    $("#unoUnidadFuncional").val(datosParaCargarRecibo["torre"]);
    $("#unoIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
    $("#unoIdComprobanteDePago ").val(datosParaCargarRecibo["idComprobanteDePago"]);
    $("#unoIdContrato ").val(datosParaCargarRecibo["idContrato"]);
    $("#unoTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
    $("#unoDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombrePais"]);
    $("#unoLocatario").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
    $("#unoCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
    $("#unoCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
    $("#unoAlquilerMensual").val("$ " + datosParaCargarRecibo["valorAlquiler"]);
    $("#unoExpensas").val("$ " + datosParaCargarRecibo["valorExpensas"]);
    $("#unoGastosAdministrativos").val("$ " + datosParaCargarRecibo["valorGastosAdm"]);
    $("#unoDeposito").val("$ " + datosParaCargarRecibo["valorDeposito"]);
    $("#unoNumCuota").val(datosParaCargarRecibo["numCuotaAPagar"]);
    $("#unoCuota").val(datosParaCargarRecibo["cantCuotasDeposito"]);

    let alquilerMensual = datosParaCargarRecibo["valorAlquiler"];
    let expensas = datosParaCargarRecibo["valorExpensas"];
    let gasAdm = datosParaCargarRecibo["valorGastosAdm"];
    let deposito = datosParaCargarRecibo["valorDeposito"];

    var total = alquilerMensual + expensas + gasAdm + deposito;

    $("#unoSubTotal").val("$ " + total);

    //$("#unoSubTotal").val(datosParaCargarRecibo["subTotal"]);
    $("#unoTotalDias").val(datosParaCargarRecibo["diasMora"]);
    $("#unoInteresPorMora").val("$ " + datosParaCargarRecibo["interesPorMora"]);
    $("#unoOtrosConceptos").val("$ " + datosParaCargarRecibo["otrosConceptos"]);
    $("#unoSaldoAnterior").val("$ " + datosParaCargarRecibo["saldoAnterior"]);
    $("#unoTotal").val("$ " + datosParaCargarRecibo["totalImporteAPagar"]);
    $("#unoImporteRecibido").val("$ " + datosParaCargarRecibo["totalImporteRecibido"]);
    $("#unoSaldoPendiente").val("$ " + datosParaCargarRecibo["saldoPendienteSinModificar"]);

}

// RECIBO NO OFICIAL
function cargarReciboNoOficial(idComprobantesDePago) {
    console.debug("trayendo datos de recibo");

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;

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
        convertirNumeroALetra(2);
    });
    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function verReciboNoOficial(datosParaCargarRecibo) {

    let fechaComprobante = datosParaCargarRecibo["fechaComprobante"];
    var fechaFor = fechaComprobante.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');

    $("#dosFecha").val(fechaFor);
    $("#dosNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
    $("#dosUnidadFuncional").val(datosParaCargarRecibo["torre"]);
    $("#dosIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
    $("#dosIdContrato ").val(datosParaCargarRecibo["idContrato"]);
    $("#dosTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
    $("#dosIdComprobanteDePago ").val(datosParaCargarRecibo["idComprobanteDePago"]);
    $("#dosDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombrePais"]);
    $("#dosLocatario").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
    $("#dosCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
    $("#dosCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
    $("#dosAlquilerMensual").val("$ " + datosParaCargarRecibo["valorAlquiler"]);

    $("#dosSubTotal").val("$ " + datosParaCargarRecibo["valorAlquiler"]);


    $("#dosInteresPorMora").val("$ " + datosParaCargarRecibo["interesPorMora"]);

    $("#dosTotal").val("$ " + datosParaCargarRecibo["totalImporteAPagar"]);
}

// RECIBO OFICIAL SALDO
function cargarReciboOficialSoloSaldo(idComprobantesDePago) {
    console.debug("trayendo datos de recibo");

    let uri = EndpointsEnum.COMPROBANTE_DE_PAGO;

    let funcionAjax = $.ajax({
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
        convertirNumeroALetra(3);
    });
    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function verReciboOficialSoloSaldo(datosParaCargarRecibo) {

    let fechaComprobante = datosParaCargarRecibo["fechaComprobante"];
    let fechaFor = fechaComprobante.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');

    $("#tresFecha").val(fechaFor);
    $("#tresNumeroComprobante").val(datosParaCargarRecibo["numeroComprobante"]);
    $("#tresUnidadFuncional").val(datosParaCargarRecibo["torre"]);
    $("#tresIdRegistroPago").val(datosParaCargarRecibo["idRegistroDePago"]);
    $("#tresIdContrato ").val(datosParaCargarRecibo["idContrato"]);
    $("#tresTipoComprobante ").val(datosParaCargarRecibo["tipoRegistroDePago"]);
    $("#tresIdComprobanteDePago ").val(datosParaCargarRecibo["idComprobanteDePago"]);
    $("#tresDomicilio").val(datosParaCargarRecibo["domicilio"] + ",  Piso: " + datosParaCargarRecibo["piso"] + ",  Dto.: " + datosParaCargarRecibo["departamento"] + ",  Localidad: " + datosParaCargarRecibo["localidad"] + ", " + datosParaCargarRecibo["nombrePais"]);
    $("#tresLocatario").val(datosParaCargarRecibo["nombres"] + " " + datosParaCargarRecibo["apellidos"] + ", DNI: " + datosParaCargarRecibo["dni"]);
    $("#tresCorrespondienteMes").val(datosParaCargarRecibo["mesCorto"]);
    $("#tresCorrespondienteAnio").val(datosParaCargarRecibo["correspondienteAnio"]);
    $("#tresSaldoPendiente").val("$ " + datosParaCargarRecibo["totalImporteAPagar"]);
    $("#tresTotal").val("$ " + datosParaCargarRecibo["totalImporteAPagar"]);
    $("#tresImporteRecibido").val("$ " + datosParaCargarRecibo["totalImporteRecibido"]);
}

//PDF
function printPdfReciboOficial() {
    var numeroComprobante = document.getElementById("unoNumeroComprobante").value;

    var divHeight = $('#bodyReciboOficial1').height();
    var divWidth = $('#bodyReciboOficial1').width();
    var ratio = divHeight / divWidth;
    var body = document.getElementById('bodyReciboOficial1');
    html2canvas(body)
        .then(function (canvas) {
            //document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width + 0, height + 20);
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
        .then(function (canvas) {
            //document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width + 0, height + 20);
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
        .then(function (canvas) {
            //document.body.appendChild(canvas);
            var imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF();
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            height = ratio * width;
            doc.addImage(imgData, 'JPEG', 0, 10, width + 0, height + 20);
            doc.save('ReciboOficialSoloSaldo-' + numeroComprobante + '.pdf');
        });
    //location.href = uriPage;
}

// CONVERTIR NUMERO A LETRA RECIBO OFICIAL
function convertirNumeroALetra(num) {

    /* ===================================
    num = 1 - Recibo Oficial
    num = 2 - Recibo No Oficial
    num = 3 - Recibo Oficial Saldo
    =====================================*/

    if (num == 1) {
        var idComprobanteDePago = document.getElementById("unoIdComprobanteDePago").value; //OFICIAL
    } else if (num == 2) {
        var idComprobanteDePago = document.getElementById("dosIdComprobanteDePago").value; //NO OFICIAL
    } else if (num == 3) {
        var idComprobanteDePago = document.getElementById("tresIdComprobanteDePago").value; //OFICIAL SALDO
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
            $("#unoImporteRecibidoEnLetra").val(retorno); //OFICIAL
        } else if (num == 2) {
            $("#dosImporteRecibidoEnLetra").val(retorno);  //NO OFICIAL
        } else if (num == 3) {
            $("#tresImporteRecibidoEnLetra").val(retorno); //OFICIAL SALDO
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

function buscarPorMes()
{
    $mes = $("#buscarPorMes").val();
    if($mes != 0) {
        listadoCompDePago(llenarComprobantesDePagosGrilla,
            {
                action: "traerRecibosPorMes",
                mes: $("#buscarPorMes").val()
            }
        );
    }
    else
    {
        listadoCompDePago(llenarComprobantesDePagosGrilla,
            {
                action: "listarRecibos",
            }
        );
    }
}
