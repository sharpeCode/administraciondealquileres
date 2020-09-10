// TODO: LISTAR LOCATARIOS
$(function () {
    $("#clienteAdd").hide();
    $("#clienteEdit").hide();
    $("#clienteDetail").hide();
    loadLocatariosGrid();
});

// TODO: DAR DE ALTA UN CLIENTE NUEVO
function showCreateForm() {
    $("#clienteAdd").show();
    $("#locatarioEdit").hide();
    $("#clienteDetail").hide();
    $("#clienteList").hide();
}

// TODO: EDITAR CLIENTE
function showEditForm(dni) {
    $("#clienteAdd").hide();
    $("#clienteEdit").show();
    $("#clienteDetail").hide();
    $("#clienteList").hide();

    loadLocatarioData(dni);
}

// TODO: DETALLE CLIENTE
function showDetailForm(dni) {
    $("#clienteAdd").hide();
    $("#clienteEdit").hide();
    $("#clienteDetail").show();
    $("#clienteList").hide();

    //loadLocatarioData(dni);
}

// TODO: MOSTRAR FORMULARIO QUE LISTA LOS LOCATARIOS
function showListContainer() {
    $("#clienteAdd").hide();
    $("#clienteEdit").hide();
    $("#clienteDetail").hide();
    $("#clienteList").show();
}

// LISTAR LOCATARIOS
function loadLocatariosGrid() {
    getAll(fillLocatariosGrid,
        {
            action: "listar",
        }
    );
}

function getAll(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "getAll"} : data;

    var funcionAjax = $.ajax({
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/ClienteController.php",
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

function fillLocatariosGrid(jsonLocatarios) {
    jsonLocatarios = JSON.parse(jsonLocatarios);

    let tableRaws = "";

    for (var i = 0, l = jsonLocatarios.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += buildRawFromLocatario(jsonLocatarios[i]);
        tableRaws += "</tr>";
    }

    $("#listado").html(tableRaws);
}

function buildRawFromLocatario(cliente){
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
    raw += "<button class='miBoton-icon' title='Editar Cliente' onclick='showEditForm(" + cliente['dni'] + ")'>" +
            "<span class='glyphicon glyphicon-pencil'></span>";
    raw += "</td> ";

    raw += "<td style = 'text-align: center;'>";
    raw += "<button class='miBoton-icon' title='Eliminar Cliente' onclick='showEditForm(" + cliente['dni'] + ")'>" +
        "<span class='glyphicon glyphicon-remove'></span>";
    raw += "</td> ";

    raw += "</td> ";

    return raw;

}

// EDITAR LOCATARIO
function loadLocatarioData(dni) {

    var funcionAjax = $.ajax({
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/ClienteController.php",
        method: "POST",
        data: {
            action: "traerClienteParaEditar",
            dni: dni
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        fillEditionForm(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function fillEditionForm(locatario) {
     var fecha = locatario["fechaNacimiento"];
     var fechaNac=fecha.split(" ")[0].split("/").reverse().join("/");

    $("#editNombres").val(locatario["nombres"]);
    $("#editApellidos").val(locatario["apellidos"]);
    $("#editDni").val(locatario["dni"]);
    $("#editCelular").val(locatario["celular"]);
    $("#editEmail").val(locatario["email"]);
    $("#editFechaNacimiento").val(fechaNac);
    $("#editDatosGarante").val(locatario["datosGarante"]);
}

// GUARDAR LOCATARIO EDITADO
function guardarLocatarioEditado() {

    var locatarioParaGuardar = mapToJson($('#locatarioEdit').serializeArray());

    console.log("Guardando loccatario: ", locatarioParaGuardar);

    var funcionAjax = $.ajax({
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/ClienteController.php",
        method: "POST",
        data: {
            action: "guardarLocEdit",
            clienteParaGuardar: locatarioParaGuardar
        }
    });

    funcionAjax.done(function (retorno) {

         location.href = "cliente.page.php";

        // if (retorno != null) {
        //     location.href = "/cliente.page.php";
        // }
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al guardar user")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");
}

//LIMPIAR OBJETOS ADD LOCATARIO
function limpiarObjetosFormAddLocatario() {

    document.getElementById('nombres').value = "";
    document.getElementById('apellidos').value = "";
    document.getElementById('dni').value = "";
    document.getElementById('celular').value = "";
    document.getElementById('email').value = "";
    document.getElementById('fechaNacimiento').value = "";
    document.getElementById('fechaRegistro').value = "";

}

// GUARDAR NUEVO LOCATARIO
function guardarLocatario() {

    var clienteNuevoParaGuardar = mapToJson($('#locatarioAdd').serializeArray());

    console.log("Guardando locatario: ", clienteNuevoParaGuardar);

    var funcionAjax = $.ajax({
        url: EndpointsEnum.LOCATARIO,
        method: "POST",
        data: {
            action: "guardarLocNuevo",
            cliente: clienteNuevoParaGuardar
        }
    });

    funcionAjax.done(function (retorno) {
        console.debug("Done: ", retorno);

        if (retorno == "ERROR") {
            location.href = "/cliente.page.php";
            window.alert("El locatario que desea ingresar ya existe");

        } else{
             location.href = "cliente.page.php";
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

// FILTRAR, USA ESTAS DOS FUNCIONES Y LUEGO PARA LISTAR USARIA LAS DOS ULTIMAS FUNCIONES DEL LISTAR LOCATARIOS
function buscarPorDni() {
    buscarLocatarioBuscado(fillLocatariosGrid,
        {
            action: "traerClientesPorDni",
            dni: $("#buscar").val()
        }
    );
}

function buscarPorNombre() {
    buscarLocatarioPorNombre(fillLocatariosGrid,
        {
            action: "traerClientePorNombre",
            nombre: $("#buscarPorNombre").val()
        }
    );
}

function buscarLocatarioBuscado(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "buscarLocatarioBuscado"} : data;


    var funcionAjax = $.ajax({
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/ClienteController.php",
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

function buscarLocatarioPorNombre(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "traerClientePorNombre"} : data;


    var funcionAjax = $.ajax({
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/ClienteController.php",
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
