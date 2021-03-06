$(function () {
    $("#variableAdd").hide();
    CargarListadoVariables();
});

// TODO: VARIABLES LIST
function mostrarFormPpal() {
    $("#variableList").show();
    $("#variableAdd").hide();
    CargarListadoVariables();
}

function CargarListadoVariables() {
    obtenerVariables(llenarTablaVariables,
        {
            action: "listarVariables"
        }
    );
}

function obtenerVariables(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log("data",data)
    };
    data = data === undefined ? {action: "obtenerVariables"} : data;

    let uri = EndpointsEnum.VARIABLES;

    let funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);  //hecho

    funcionAjax.fail(function (retorno) { //fallar
        console.log("error al llamar back")
    });

    funcionAjax.always(function (retorno) {
    });
}

function llenarTablaVariables(jsonUsers) {
    jsonUsers = JSON.parse(jsonUsers);
    let tableRaws = "";

    for (var i = 0, l = jsonUsers.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += construirFilaDeVariable(jsonUsers[i]);
        tableRaws += "</tr>";
    }

    $("#listado").html(tableRaws);
}

function construirFilaDeVariable(PorcentajeDeVariable) {

    let raw = "";
    raw += "<td style = 'word-wrap: break-word;'>" + PorcentajeDeVariable['variable'] + "</td>";
    raw += "<td style = 'word-wrap: break-word;'>" + PorcentajeDeVariable['porcentaje'] + "</td>";
    raw += "<td style = 'word-wrap: break-word;'>" + PorcentajeDeVariable['fecha'] + "</td>";

    return raw;
}

// TODO: VARIABLE ADD

function mostrarFormAdd() {
    $("#variableAdd").show();
    $("#variableList").hide();
    llenarSelectConVariables();
}

function llenarSelectConVariables() {
    let uri = EndpointsEnum.VARIABLES;

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "cargarSelectConVariables"
        }
    });

    funcionAjax.done(function (retorno) {
        fillDom(retorno);
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al cargar")
    });

    funcionAjax.always(function (retorno) {
    });
}

function fillDom(arrayVariable) {

    arrayVariable = JSON.parse(arrayVariable);
    let options = "";

    //para agregarle placeholder a la lista desplegable
    let optionDefault = "<option value='-1'>Variable</option>";
    options +=optionDefault;

    for (var i = 0, l = arrayVariable.length; i < l; i++) {
        options += optionsVariable(arrayVariable[i]);
    }
    $("#idVariable").html(options);
}

function optionsVariable(variable) {
    let option = "";
    option += "<option value=" + variable['idVariable'] + ">" + variable['variable'] + "</option>";
    return option;
}

function guardarVariable() {
    let variableNuevoParaGuardar = mapToJson($('#variableAdd').serializeArray());

    if(variableNuevoParaGuardar["idVariable"] == "-1"){
        window.alert("debe seleccionar un tipo de variable");
    }

    let uri = EndpointsEnum.VARIABLES;
    let href = EndpointsEnum.VOLVER_VARIABLES;
    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "guardarVariableNuevo",
            variable: variableNuevoParaGuardar
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        location.href = href;
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al guardar")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar")
    });
    console.log("Fin llamada controller");
}
