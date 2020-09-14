$(function () {
    $("#inmuebleNuevoLis").show();
    CargarListadoInmueble();
});

//LISTAR INMUEBLES
function CargarListadoInmueble() {
    obtenerInmuebles(llenarTablaInmuebles,
        {
            action: "listar"
        }
    );
}

function obtenerInmuebles(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log("data",data)
    };
    data = data === undefined ? {action: "obtenerInmuebles"} : data;

    let uri = EndpointsEnum.INMUEBLE;

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);  //hecho

    funcionAjax.fail(function (retorno) { //fallar
        console.log("error al llamar back de usuario")
    });

    funcionAjax.always(function (retorno) {
    });
}

function llenarTablaInmuebles(jsonInmueble) {
    jsonInmueble = JSON.parse(jsonInmueble);
    let tableRaws = "";

    for (var i = 0, l = jsonInmueble.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += construirFilaDeInmueble(jsonInmueble[i]);
        tableRaws += "</tr>";
    }

    $("#listadoInmuebles").html(tableRaws);
}

function construirFilaDeInmueble(inmueble) {
    let raw = "";
    raw += "<td style = 'text-align: center;word-wrap: break-word;' hidden='true'>" + inmueble['idInmueble'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + inmueble['tipo'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + inmueble['torre'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + inmueble['piso'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + inmueble['departamento'] + "</td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + inmueble['domicilio'] + " </td>";
    raw += "<td style = 'text-align: center; word-wrap: break-word;'>" + inmueble['localidad'] + "</td>";

    raw += "<td style = 'text-align: center;width: 100px;word-wrap: break-word;'>";
    raw += "<button class='miBoton-icon' title='Editar inmueble' onclick='mostrarFormInmuebleEditar(" + inmueble['idInmueble'] + ")'>" +
        "<span class='glyphicon glyphicon-pencil'></span>";
    raw += "</button></td> ";

    return raw;
}