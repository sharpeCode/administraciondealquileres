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
    let fe = cliente['fechaNacimiento'];
    let fechaNac;

    if (fe !="0000-00-00")
    {
        fechaNac = fe.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    else
    {
        fechaNac = "";
    }

    if (cliente['estado'] == 1) {
        let raw = "";
        raw += "<td style = 'text-align: center;'>" + cliente['nombres'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['apellidos'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['dni'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['celular'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['email'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + fechaNac + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['datosGarante'] + "</td>";

        raw += "<td style = 'text-align: center;'>";
        raw += "<button class='miBoton-icon' title='Detalle Cliente' onclick='showDetailForm(" + cliente['dni'] + ")'>" +
            "<span class='glyphicon glyphicon-list-alt'></span>";

        raw += "<td style = 'text-align: center;'>";
        raw += "<button class='miBoton-icon' title='Editar Cliente' onclick='showFormEdit(" + cliente['dni'] + ")'>" +
            "<span class='glyphicon glyphicon-pencil'></span>";
        raw += "</td> ";

        raw += "<td style = 'text-align: center;'>";
        raw += "<button class='miBoton-icon' title='Eliminar Cliente' onclick='deleteCliente(" + cliente['dni'] + ")'>" +
            "<span class='glyphicon glyphicon-remove'></span>";
        raw += "</td> ";

        raw += "</td> ";

        return raw;
    }
    else
    {
        let raw = "";
        raw += "<td style = 'text-align: center;'>" + cliente['nombres'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['apellidos'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['dni'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['celular'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['email'] + "</td>";
        raw += "<td style = 'text-align: center;'>" + fechaNac + "</td>";
        raw += "<td style = 'text-align: center;'>" + cliente['datosGarante'] + "</td>";

        raw += "<td style = 'text-align: center;'>";
        raw += "<button class='miBoton-icon' title='Detalle Cliente' onclick='showDetailForm(" + cliente['dni'] + ")'>" +
            "<span class='glyphicon glyphicon-list-alt'></span>";

        raw += "<td style = 'text-align: center;'>";
        raw += "<button class='miBoton-icon' title='Activar Cliente' onclick='activarCliente(" + cliente['dni'] + ")'>" +
            "<span class='glyphicon glyphicon-pencil'></span>";
        raw += "</td> ";

        raw += "</td> ";

        return raw;
    }
}

function getAll(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "getAll"} : data;

    let uri = EndpointsEnum.CLIENTE;

    let funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction)
    {console.log(doneFunction);};

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
    clearCliente();
}

function clearCliente() {
    document.getElementById('nombres').value = "";
    document.getElementById('apellidos').value = "";
    document.getElementById('dni').value = "";
    document.getElementById('celular').value = "";
    document.getElementById('email').value = "";
    document.getElementById('fechaNacimiento').value = "";
    document.getElementById('datosGarante').value = "";
}

function guardarCliente() {

    let clienteNuevoParaGuardar = mapToJson($('#clienteAdd').serializeArray());

    console.log(clienteNuevoParaGuardar);
    if((clienteNuevoParaGuardar["nombres"] == "")|| (clienteNuevoParaGuardar["apellidos"] == "") ||
        (clienteNuevoParaGuardar["dni"] == ""))
    {
        window.alert("Debe ingresar los siguientes datos mínimos: Nombre, Apellido, DNI")
    }
    else {
        let uri = EndpointsEnum.CLIENTE;
        let uriPage = EndpointsEnum.VOLVER_CLIENTES;

        let funcionAjax = $.ajax({
            url: uri,
            method: "POST",
            data: {
                action: "guardarClienteNuevo",
                cliente: clienteNuevoParaGuardar
            }
        });

        funcionAjax.done(function (retorno) {
            console.debug("Done: ", retorno);

            if (retorno == "ERROR") {

                location.href = uriPage;
                window.alert("El Cliente que desea ingresar ya existe");

            } else {
                location.href = uriPage;
            }
        });

        funcionAjax.fail(function (retorno) {
            console.log("error al guardar Cliente")
        });
    }
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
    let fecha = cliente["fechaNacimiento"];
    let fechaNac = fecha.split(" ")[0].split("/").reverse().join("/");

    $("#editNombres").val(cliente["nombres"]);
    $("#editApellidos").val(cliente["apellidos"]);
    $("#editDni").val(cliente["dni"]);
    $("#editCelular").val(cliente["celular"]);
    $("#editEmail").val(cliente["email"]);
    $("#editFechaNacimiento").val(fechaNac);
    $("#editDatosGarante").val(cliente["datosGarante"]);
    $("#editDomicilioLegal").val(cliente["domicilioLegal"]);
}

function guardarClienteEditado() {
    let clienteParaGuardar = mapToJson($('#clienteEdit').serializeArray());
    if((clienteParaGuardar["editNombres"] == "")|| (clienteParaGuardar["editApellidos"] == "") ||
        (clienteParaGuardar["editDni"] == ""))
    {
        window.alert("Debe ingresar los siguientes datos mínimos: Nombre, Apellido, DNI")
    }
    else {

        let uri = EndpointsEnum.CLIENTE;
        let uriPage = EndpointsEnum.VOLVER_CLIENTES;

        var funcionAjax = $.ajax({
            url: uri,
            method: "POST",
            data: {
                action: "guardarClienteEdit",
                clienteParaGuardar: clienteParaGuardar
            }
        });

        funcionAjax.done(function (retorno) {
            location.href = uriPage;
        });

        funcionAjax.fail(function (retorno) {
            console.log("error al guardar user")
        });

        funcionAjax.always(function (retorno) {
            console.log("volvi de guardar el user")
        });
    }
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

    let funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: {
            action: "traerClienteParaEditar",
            dni: dni
        }
    });

    funcionAjax.done(function (retorno) {
        fillFormDetail(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function fillFormDetail(cliente) {
    let fe = cliente['fechaNacimiento'];
    let fechaNac;

    console.log(fe);
    if (fe !="0000-00-00")
    {
        fechaNac = fe.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    else
    {
        fechaNac = "";
    }

    let feR = cliente['fechaRegistro'];
    let fechaReg;

    if (feR !="0000-00-00")
    {
        fechaReg = feR.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    else
    {
        fechaReg = "";
    }

    $("#detailFechaRegistro").val(fechaReg);
    $("#detailNombres").val(cliente["nombres"]);
    $("#detailApellidos").val(cliente["apellidos"]);
    $("#detailDni").val(cliente["dni"]);
    $("#detailCelular").val(cliente["celular"]);
    $("#detailEmail").val(cliente["email"]);
    $("#detailFechaNacimiento").val(fechaNac);
    $("#detailDatosGarante").val(cliente["datosGarante"]);
    $("#detailDomicilioLegal").val(cliente["domicilioLegal"]);
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
function buscarPorEstado() {
    clienteFilterEstado(fillClienteGrid,
        {
            action: "traerClientesPorEstado",
            estado: $("#buscarPorEstado").val()
        }
    );
}

function buscarPorDni() {
    $("#buscarPorEstado").val("1");
    $("#buscarPorNombre").val("");
    clienteFilter(fillClienteGrid,
        {
            action: "traerClientesPorDni",
            dni: $("#buscar").val()
        }
    );
}

function buscarPorNombre() {

    $("#buscarPorEstado").val("1");
    $("#buscar").val("");

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

    let funcionAjax = $.ajax({
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

function clienteFilter(doneFunction, data) {
    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "clienteFilter"} : data;

    let uri = EndpointsEnum.CLIENTE;

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de Clientes")
    });

    funcionAjax.always(function (retorno) {
        console.log("always de promise clientes")
    });
}

function clienteFilterEstado(doneFunction, data) {
    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "clienteFilterEstado"} : data;

    let uri = EndpointsEnum.CLIENTE;

    var funcionAjax = $.ajax({
        url: uri,
        method: "POST",
        data: data
    });

    funcionAjax.done(doneFunction);

    funcionAjax.fail(function (retorno) {
        console.log("error al llamar back de Clientes")
    });

    funcionAjax.always(function (retorno) {
        console.log("always de promise clientes")
    });
}

function deleteCliente(dni) {

    let uri = EndpointsEnum.CLIENTE;
    let uriPage = EndpointsEnum.VOLVER_CLIENTES;

    let txt;
    let r = confirm("Desea eliminar este Cliente?");
    if (r == true) {

        let funcionAjax = $.ajax({
            url: uri,
            method: "POST",
            data: {
                action: "deleteCliente",
                dni: dni
            }
        });

        funcionAjax.done(function (retorno) {
            if (retorno == "ERROR") {

                location.href = uriPage;
                window.alert("El Cliente que desea eliminar tiene un Contrato asociado");

            } else {
                location.href = uriPage;
            }

        });

        funcionAjax.fail(function (retorno) {
            console.log("error al eliminar")
        });

        funcionAjax.always(function (retorno) {
            console.log("volvi de eliminar")
        });
        console.log("Fin llamada controller cliente");
    }

}

function activarCliente(dni) {

    let uri = EndpointsEnum.CLIENTE;
    let uriPage = EndpointsEnum.VOLVER_CLIENTES;

    let txt;
    let r = confirm("Desea activar este Cliente?");
    if (r == true) {

        let funcionAjax = $.ajax({
            url: uri,
            method: "POST",
            data: {
                action: "activarCliente",
                dni: dni
            }
        });

        funcionAjax.done(function (retorno) {
            location.href = uriPage;
        });

        funcionAjax.fail(function (retorno) {
            console.log("error al eliminar")
        });

        funcionAjax.always(function (retorno) {
            console.log("volvi de eliminar")
        });
        console.log("Fin llamada controller cliente");
    }

}