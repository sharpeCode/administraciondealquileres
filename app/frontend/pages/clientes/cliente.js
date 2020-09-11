// TODO: FORM PPAL
$(function () {
    $("#clienteAdd").hide();
    $("#clienteEdit").hide();
    $("#clienteDetail").hide();
    loadClienteGrid();
});

function loadClienteGrid() {
    getAll(fillClienteGrid,
        {
            action: "listarClientes",
        }
    );
}

function fillClienteGrid(jsonLocatarios) {
    jsonLocatarios = JSON.parse(jsonLocatarios);

    let tableRaws = "";

    for (var i = 0, l = jsonLocatarios.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += buildRawFromCliente(jsonLocatarios[i]);
        tableRaws += "</tr>";
    }

    $("#listado").html(tableRaws);
}

function buildRawFromCliente(cliente){
    //cambiar formato fecha de AAAA-MM-DD a DD-MM-AAAA
    let fe = cliente['fechaNacimiento'];
    var fecha = new Date(fe);
    var options = { day: 'numeric' , month: 'numeric', year: 'numeric'};
    var fechaNac = fecha.toLocaleDateString("es-ES", options);

    let raw = "";
    raw += "<td style = 'text-align: center;'>" + cliente['nombres'] + "</td>";
    raw += "<td style = 'text-align: center;'>" + cliente['apellidos'] + "</td>";
    raw += "<td style = 'text-align: center;'>" + cliente['dni'] + "</td>";
    raw += "<td style = 'text-align: center;'>" + cliente['celular'] + "</td>";
    raw += "<td style = 'text-align: center;'>" + cliente['email'] + "</td>";
    raw += "<td style = 'text-align: center;'>" + fechaNac + "</td>";
    raw += "<td style = 'text-align: center;'>" + cliente['datosGarante'] + "</td>";
    raw += "<td style = 'text-align: center;' hidden='true'>" + cliente['domicilioLegal'] + "</td>";

    raw += "<td style = 'text-align: center;'>";
    raw += "<button class='miBoton-icon' title='Detalle Cliente' onclick='showDetailForm(" + cliente['dni'] + ")'>" +
        "<span class='glyphicon glyphicon-list-alt'></span>";

    raw += "<td style = 'text-align: center;'>";
    raw += "<button class='miBoton-icon' title='Editar Cliente' onclick='showFormEdit(" + cliente['dni'] + ")'>" +
        "<span class='glyphicon glyphicon-pencil'></span>";
    raw += "</td> ";

    raw += "<td style = 'text-align: center;'>";
    raw += "<button class='miBoton-icon' title='Eliminar Cliente' onclick='showFormEdit(" + cliente['dni'] + ")'>" +
        "<span class='glyphicon glyphicon-remove'></span>";
    raw += "</td> ";

    raw += "</td> ";

    return raw;

}

function getAll(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "getAll"} : data;

    let uri = EndpointsEnum.CLIENTE;
    console.log("Llamando a controller clientes = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de clientes")
    });

    funcionAjax.always(function (retorno) {
        console.log("always de promise clientes")
    });
}

// TODO: ALTA CLIENTE
function showFormAdd() {
    $("#clienteAdd").show();
    $("#locatarioEdit").hide();
    $("#clienteDetail").hide();
    $("#clienteList").hide();
}

function guardarCliente() {

    var clienteNuevoParaGuardar = mapToJson($('#locatarioAdd').serializeArray());

    console.log("Guardando locatario: ", clienteNuevoParaGuardar);

    let uri = EndpointsEnum.CLIENTE;
    console.log("Llamando a controller cliente = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "guardarLocNuevo",
            cliente: clienteNuevoParaGuardar
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);

        if (retorno == "ERROR") {
            location.href = uri;
            window.alert("El locatario que desea ingresar ya existe");

        } else{
            location.href = uri;
        }
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al guardar cliente")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el cliente")
    });
    console.log("Fin llamada controller cliente");
}

// TODO: EDITAR CLIENTE
function showFormEdit(dni) {
    $("#clienteAdd").hide();
    $("#clienteEdit").show();
    $("#clienteDetail").hide();
    $("#clienteList").hide();

    loadClienteDataEdit(dni);
}

function loadClienteDataEdit(dni) {

    let uri = EndpointsEnum.CLIENTE;
    console.log("Llamando a controller locatarios = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "traerClienteParaEditar",
            dni: dni
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        fillFormEdit(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function fillFormEdit(cliente) {
    var fecha = cliente["fechaNacimiento"];
    var fechaNac=fecha.split(" ")[0].split("/").reverse().join("/");

    $("#editNombres").val(cliente["nombres"]);
    $("#editApellidos").val(cliente["apellidos"]);
    $("#editDni").val(cliente["dni"]);
    $("#editCelular").val(cliente["celular"]);
    $("#editEmail").val(cliente["email"]);
    $("#editFechaNacimiento").val(fechaNac);
    $("#editDatosGarante").val(cliente["datosGarante"]);
}

function guardarClienteEditado() {

    var clienteParaGuardar = mapToJson($('#clienteEdit').serializeArray());

    console.log("Guardando cliente: ", clienteParaGuardar);

    let uri = EndpointsEnum.CLIENTE;
    console.log("Llamando a controller cliente = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "guardarClienteEdit",
            clienteParaGuardar: clienteParaGuardar
        }
    });

    funcionAjax.done(function (retorno) {
        location.href = uri;
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al guardar user")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");
}

// TODO: DETALLE CLIENTE
function showDetailForm(dni) {
    $("#clienteAdd").hide();
    $("#clienteEdit").hide();
    $("#clienteDetail").show();
    $("#clienteList").hide();

    loadClienteDataDetail(dni);
}

function loadClienteDataDetail(dni) {

    let uri = EndpointsEnum.CLIENTE;
    console.log("Llamando a controller cliente = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "traerClienteParaEditar",
            dni: dni
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        fillFormDetail(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function fillFormDetail(cliente) {
    var fecha = cliente["fechaNacimiento"];
    var fechaNac=fecha.split(" ")[0].split("/").reverse().join("/");

    $("#detailNombres").val(cliente["nombres"]);
    $("#detailApellidos").val(cliente["apellidos"]);
    $("#detailDni").val(cliente["dni"]);
    $("#detailCelular").val(cliente["celular"]);
    $("#detailEmail").val(cliente["email"]);
    $("#detailFechaNacimiento").val(fechaNac);
    $("#detailDatosGarante").val(cliente["datosGarante"]);
}

// TODO: FORM PPAL
function showListContainer() {
    $("#clienteAdd").hide();
    $("#clienteEdit").hide();
    $("#colatarioList").show();
    $("#clienteDetail").hide();
    $("#clienteList").show();
}

// TODO: FILTROS
function buscarPorDni() {
    locatarioFilter(fillClienteGrid,
        {
            action: "traerClientesPorDni",
            dni: $("#buscar").val()
        }
    );
}

function buscarPorNombre() {
    buscarLocatarioPorNombre(fillClienteGrid,
        {
            action: "traerClientePorNombre",
            nombre: $("#buscarPorNombre").val()
        }
    );
}

function buscarLocatarioPorNombre(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "traerClientePorNombre"} : data;

    let uri = EndpointsEnum.CLIENTE;
    console.log("Llamando a controller cliente = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de usuario")
    });

    funcionAjax.always(function (retorno) {
        console.log("always de promise clientes")
    });
}

function locatarioFilter(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "locatarioFilter"} : data;

    let uri = EndpointsEnum.CLIENTE;
    console.log("Llamando a controller cliente = " + uri);

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de usuario")
    });

    funcionAjax.always(function (retorno) {
        console.log("always de promise clientes")
    });
}
