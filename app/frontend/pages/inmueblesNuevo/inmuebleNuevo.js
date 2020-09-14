$(function () {
    $("#inmuebleNuevoLis").show();
    $("#inmuebleNuevoAdd").hide();
    CargarListadoInmueble();
});

function InmuebleAdd() {
    $("#inmuebleNuevoAdd").show();
    $("#inmuebleNuevoLis").hide();
    llenarSelectConLocalidades();
}

function mostrarFormInmueblePpal() {
    $("#inmuebleNuevoAdd").show();
    $("#inmuebleNuevoLis").hide();
    CargarListadoInmueble();
}

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

//LLENAR SELECT LOCALIDADES
function llenarSelectConLocalidades() {

    let uri = EndpointsEnum.LOCALIDAD;

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "listarLocalidades"
        }
    });

    funcionAjax.done(function (retorno) {
        fillDom(retorno);
    });

    funcionAjax.fail(function (retorno) {
        console.log("Error al cargar Localidades")
    });

    funcionAjax.always(function (retorno) {
    });
}

function fillDom(arrayLocalidad) {

    arrayLocalidad = JSON.parse(arrayLocalidad);
    let options = "";

    //para agregarle placeholder a la lista desplegable
    let optionDefault = "<option value='-1'>Localidad</option>";
    options +=optionDefault;

    for (var i = 0, l = arrayLocalidad.length; i < l; i++) {
        options += optionsLocalidad(arrayLocalidad[i]);
    }
    $("#idLocalidad").html(options);
}

function optionsLocalidad(localidad) {
    let option = "";
    option += "<option value=" + localidad['idLocalidad'] + ">" + localidad['localidad'] + "</option>";
    return option;
}

//GUARDAR INMUEBLE
function guardarInmueble() {
    var inmuebleNuevoParaGuardar = mapToJson($('#inmuebleAdd').serializeArray());

    let uri = EndpointsEnum.INMUEBLE;
    let href = EndpointsEnum.VOLVER_INMUEBLES;


    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "guardarInmuebleNuevo",
            inmueble: inmuebleNuevoParaGuardar
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        location.href = href;
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al guardar inmueble")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");
}