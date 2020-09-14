$(function () {
    $("#inmuebleNuevoLis").show();
    $("#inmuebleNuevoAdd").hide();
    $("#inmuebleNuevoEdit").hide();
    $("#localidadNuevoAdd").hide();
    CargarListadoInmueble();
});

function InmuebleAdd() {
    $("#inmuebleNuevoAdd").show();
    $("#inmuebleNuevoLis").hide();
    $("#inmuebleNuevoEdit").hide();
    $("#localidadNuevoAdd").hide();
    llenarSelectConLocalidades();
}

function mostrarListadoInmuebles() {
    $("#inmuebleNuevoAdd").hide();
    $("#inmuebleNuevoLis").show();
    $("#inmuebleNuevoEdit").hide();
    $("#localidadNuevoAdd").hide();
    CargarListadoInmueble();
}

function mostrarFormInmuebleEditar(id) {
    $("#inmuebleNuevoAdd").hide();
    $("#inmuebleNuevoLis").hide();
    $("#inmuebleNuevoEdit").show();
    $("#localidadNuevoAdd").hide();
    llenarSelectConLocalidadesParaEditar();
    loadInmuebleData(id);
}

function mostrarFormLocalidadPpal() {
    $("#inmuebleNuevoAdd").hide();
    $("#inmuebleNuevoLis").hide();
    $("#inmuebleNuevoEdit").hide();
    $("#localidadNuevoAdd").show();
    loadLocalidadesGrid();
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
    var inmuebleNuevoParaGuardar = mapToJson($('#inmuebleNuevoAdd').serializeArray());

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

//LLENAR SELECT CON LOCADIDADES PARA EDITAR
function llenarSelectConLocalidadesParaEditar() {

    let uri = EndpointsEnum.LOCALIDAD;

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "listarLocalidades"
        }
    });

    funcionAjax.done(function (retorno) {
        fillDomEdit(retorno);
    });

    funcionAjax.fail(function (retorno) {
        console.log("Error al cargar Localidades")
    });
}

function fillDomEdit(arrayLocalidad) {
    arrayLocalidad = JSON.parse(arrayLocalidad);

    let options = "";

    for (var i = 0, l = arrayLocalidad.length; i < l; i++) {
        options += optionsLocalidad(arrayLocalidad[i]);
    }
    $("#editIdlocalidad").html(options);

}

function optionsLocalidad(localidad) {
    let option = "";
    option += "<option value=" + localidad['idLocalidad'] + ">" + localidad['localidad'] + "</option>";
    return option;
}

//LLENAR INPUT PARA EDITAR INMUEBLE
function loadInmuebleData(id) {

    let uri = EndpointsEnum.INMUEBLE;

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "traerInmueblePorId",
            inmueble: id
        }
    });

    funcionAjax.done(function (retorno) {
        fillEditionForm(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function fillEditionForm(inmueble) {
    $("#editIdInmueble").val(inmueble["idInmueble"]);
    $("#editTipo").val(inmueble["tipo"]);
    $("#editTorre").val(inmueble["torre"]);
    $("#editPiso").val(inmueble["piso"]);
    $("#editDepartamento").val(inmueble["departamento"]);
    $("#editDomicilio").val(inmueble["domicilio"]);
    $("#editIdlocalidad").val(inmueble["idLocalidad"]);
}

//GUARDAR INMUEBLE EDITADO
function guardarInmuebleEditado() {

    var inmuebleEditado = mapToJson($('#inmuebleNuevoEdit').serializeArray());

    let uri = EndpointsEnum.INMUEBLE;

    let href = EndpointsEnum.VOLVER_INMUEBLES;

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "guardarInmuebleEditado",
            inmuebleEditado: inmuebleEditado
        }
    });

    funcionAjax.done(function (retorno) {
        if (retorno != null) {
            location.href = href;
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

//LISTAR LOCALIDADES
function loadLocalidadesGrid() {
    getAllLocalidades(fillLocalidadesGrid,
        {
            action: "listarLocalidades",
        }
    );
}

function getAllLocalidades(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "getAll"} : data;

    let uri = EndpointsEnum.LOCALIDAD;

    let funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de Localidades")
    });

    funcionAjax.always(function (retorno) {
        console.log("always de promise clientes")
    });
}

function fillLocalidadesGrid(jsonLocalidades) {

    jsonLocalidades = JSON.parse(jsonLocalidades);

    let tableRaws = "";

    for (var i = 0, l = jsonLocalidades.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += buildRawFromLocalidades(jsonLocalidades[i]);
        tableRaws += "</tr>";
    }

    $("#listadoLocalidades").html(tableRaws);
}

function buildRawFromLocalidades(loc) {

    let raw = "";
    raw += "<td>" + loc['idLocalidad'] + "</td>";
    raw += "<td>" + loc['localidad'] + "</td>";
    raw += "<td>" + loc['cp'] + "</td>";
    raw += "<td>" + loc['nombre'] + "</td>";

    raw += "<td>";
    raw += "<td>";
    raw += "<button class='miBoton-icon' title='Editar Localidad' onclick='mostrarFormLocalidadEditar(" + loc['idLocalidad'] + ")'>" +
        "<span class='glyphicon glyphicon-pencil'></span>";
    raw += "</button></td> ";

    return raw;

}