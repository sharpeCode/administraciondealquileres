$(function () {
    $("#inmuebleList").show();
    $("#inmuebleAdd").hide();
    $("#inmuebleEdit").hide();
    $("#localidadList").hide();
    $("#localidadAdd").hide();
    $("#localidadEdit").hide();
    CargarListadoInmueble();
});

// TODO: INMUEBLES
function mostrarFormInmueblePpal() {
    $("#inmuebleList").show();
    $("#inmuebleAdd").hide();
    $("#inmuebleEdit").hide();
    CargarListadoInmueble();
}

function CargarListadoInmueble() {
    obtenerInmuebles(llenarTablaInmuebles,
        {
            action: "listar"
        }
    );
}

function mostrarFormInmuebleAdd() {
    $("#localidadAdd").hide();
    $("#localidadList").hide();
    $("#localidadEdit").hide();
    $("#inmuebleAdd").show();
    $("#inmuebleList").hide();
    $("#inmuebleEdit").hide();
    llenarSelectConLocalidades();
}

function mostrarFormInmuebleEditar(id) {
    $("#inmuebleAdd").hide();
    $("#inmuebleList").hide();
    $("#inmuebleEdit").show();
    llenarSelectConLocalidadesParaEditar();
    loadInmuebleData(id);
}

function obtenerInmuebles(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log("data",data)
    };
    data = data === undefined ? {action: "obtenerInmuebles"} : data;

    var funcionAjax = $.ajax({
        // url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/InmuebleController.php",
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/InmuebleController.php",
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

function llenarTablaInmuebles(jsonUsers) {
    jsonUsers = JSON.parse(jsonUsers);
    let tableRaws = "";

    for (var i = 0, l = jsonUsers.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += construirFilaDeInmueble(jsonUsers[i]);
        tableRaws += "</tr>";
    }

    $("#listado").html(tableRaws);
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
    raw += "<button class='miBoton-5-C' title='Editar inmueble' onclick='mostrarFormInmuebleEditar(" + inmueble['idInmueble'] + ")'>" +
        "<span class='glyphicon glyphicon-pencil'></span>";
    raw += "</button></td> ";

    return raw;
}

function llenarSelectConLocalidades() {
    var funcionAjax = $.ajax({
        // url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/LocalidadController.php",
        url: "http://administraciondealquileres.herokuapp.com/app/backend/controller/LocalidadController.php",
        method: "POST",
        data: {
            action: "listar"
        }
    });

    funcionAjax.done(function (retorno) {
        fillDom(retorno);
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al cargar select con alumnos")
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

function guardarInmueble() {
    var inmuebleNuevoParaGuardar = mapToJson($('#inmuebleAdd').serializeArray());

    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/InmuebleController.php",
        method: "POST",
        data: {
            action: "guardarInmuebleNuevo",
            inmueble: inmuebleNuevoParaGuardar
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
         location.href = "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/frontend/pages/inmuebles/inmueble.page.php";
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al guardar inmueble")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el user")
    });
    console.log("Fin llamada controller usuario");
}

function loadInmuebleData(id) {
    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/InmuebleController.php",
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

function llenarSelectConLocalidadesParaEditar() {
    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/LocalidadController.php",
        method: "POST",
        data: {
            action: "listar"
        }
    });

    funcionAjax.done(function (retorno) {
        fillDomEdit(retorno);
    });

    funcionAjax.fail(function (retorno) {
        console.log("error al cargar select con alumnos")
    });
}

function fillDomEdit(arrayLocalidad) {
    arrayLocalidad = JSON.parse(arrayLocalidad);
    console.log(arrayLocalidad);
    let options = "";

    for (var i = 0, l = arrayLocalidad.length; i < l; i++) {
        options += optionsLocalidad(arrayLocalidad[i]);
    }
    $("#editIdlocalidad").html(options);

}

function guardarInmuebleEditado() {

    var inmuebleEditado = mapToJson($('#inmuebleEdit').serializeArray());

    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/InmuebleController.php",
        method: "POST",
        data: {
            action: "guardarInmuebleEditado",
            inmuebleEditado: inmuebleEditado
        }
    });

    funcionAjax.done(function (retorno) {
        if (retorno != null) {
             location.href = "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/frontend/pages/inmuebles/inmueble.page.php";
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
    var elementHTML = $('#InmueblePDF').html();
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


// TODO: LOCALIDADES

// TODO: MOSTRAR FORMULARIO QUE LISTA LAS LOCALIDADES
function mostrarFormLocalidadPpal() {
     $("#inmuebleList").hide();
     $("#inmuebleAdd").hide();
     $("#inmuebleEdit").hide();
     $("#localidadList").show();
     $("#localidadAdd").hide();
     $("#localidadEdit").hide();
     loadLocalidadesGrid();
}

function loadLocalidadesGrid() {
    getAllLocalidades(fillLocalidadesGrid,
        {
            action: "listar",
        }
    );
}

function getAllLocalidades(doneFunction, data) {

    doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
        console.log(data)
    };
    data = data === undefined ? {action: "getAll"} : data;

    let funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/LocalidadController.php",
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
    console.log(jsonLocalidades);
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
    raw += "<button class='miBoton-5-C' title='Editar Localidad' onclick='mostrarFormLocalidadEditar(" + loc['idLocalidad'] + ")'>" +
        "<span class='glyphicon glyphicon-pencil'></span>";
    raw += "</button></td> ";

    return raw;

}


// TODO: MOSTRAR FORMULARIO DE ALTA DE LOCALIDAD
function mostrarFormLocalidadAdd() {
    $("#inmuebleAdd").hide();
    $("#inmuebleList").hide();
    $("#inmuebleEdit").hide();
    $("#localidadList").hide();
    $("#localidadEdit").hide();
    $("#localidadAdd").show();
    llenarSelectConProvincias();
}

function llenarSelectConProvincias() {
    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/LocalidadController.php",
        method: "POST",
        data: {
            action: "cargarSelectConProvincias",
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        fillDomProvincia(retorno);

    });

    funcionAjax.fail(function (retorno) {
        console.log("error al cargar select con alumnos")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de buscar a los alumnos")
    });
}

function fillDomProvincia(arrayProvincia) {

    console.log(arrayProvincia);
    arrayProvincia = JSON.parse(arrayProvincia);
    let options = "";

    //para agregarle placeholder a la lista desplegable
    let optionDefault = "<option value='-1'>Provincia</option>";
    options += optionDefault;

    for (var i = 0, l = arrayProvincia.length; i < l; i++) {
        options += optionsProvincia(arrayProvincia[i]);
    }
    $("#idProvincia").html(options);
    //document.getElementById('provincia').selectedIndex = -1;

}

function optionsProvincia(provincia) {
    let option = "";
    option += "<option value='" + provincia['idProvincia'] + "'>" + provincia['nombre'] + "</option>";
    return option;

}

function guardarLocalidad() {

    var guardarLocalidad = mapToJson($('#localidadAdd').serializeArray()); //obtener el varlos de todos los input

    console.log("Guardando localidad: ", guardarLocalidad);
    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/LocalidadController.php",
        method: "POST",
        data: {
            action: "datosParaGuardarLocalidad",
            guardarLocalidad: guardarLocalidad
        }
    });
    funcionAjax.done(function (retorno) {
        console.log(retorno);
        if (retorno != null) {
            mostrarFormLocalidadPpal();
        }
    });
    funcionAjax.fail(function (retorno) {
        console.log("error al guardar ejercicio en la rutina")
    });
    funcionAjax.always(function (retorno) {
        console.log("volvi de guardar el ejercicio en la rutina")
    });
    console.log("Fin llamada controller rutina");
}

// TODO: MOSTRAR FORMULARIO DE EDICION DE LOCALIDAD
function mostrarFormLocalidadEditar(idLocalidad) {
    $("#localidadAdd").hide();
    $("#localidadList").hide();
    $("#localidadEdit").show();
    llenarSelectConProvinciasParaEditar();
    cargarLocalidadParaEditar(idLocalidad);
}

function llenarSelectConProvinciasParaEditar() {
    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/LocalidadController.php",
        method: "POST",
        data: {
            action: "cargarSelectConProvincias",
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        fillDomEditProvincia(retorno);

    });

    funcionAjax.fail(function (retorno) {
        console.log("error al cargar select con alumnos")
    });

    funcionAjax.always(function (retorno) {
        console.log("volvi de buscar a los alumnos")
    });
}

function fillDomEditProvincia(arrayProvincia) {

    arrayProvincia = JSON.parse(arrayProvincia);
    let options = "";

    for (var i = 0, l = arrayProvincia.length; i < l; i++) {
        options += optionsProvincia(arrayProvincia[i]);
    }
    $("#editIdProvincia").html(options);

}

function cargarLocalidadParaEditar(idLocalidad) {

    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/LocalidadController.php",
        method: "POST",
        data: {
            action: "traerLocalidadPorId",
            idLocalidad: idLocalidad
        }
    });

    funcionAjax.done(function (retorno) {
        llenarFormConLocalidad(JSON.parse(retorno));
    });

    funcionAjax.fail(function (retorno) {
        console.error(retorno);
    });
}

function llenarFormConLocalidad(localidad) {

    $("#editIdLocalidad").val(localidad["idLocalidad"]);
    $("#editLocalidad").val(localidad["localidad"]);
    $("#editCp").val(localidad["cp"]);
    $("#editIdProvincia").val(localidad["idProvincia"]);
}

function guardarLocalidadEditada() {

    var localidadEditadaParaGuardar = mapToJson($('#localidadEdit').serializeArray());

    console.log(localidadEditadaParaGuardar);
    var funcionAjax = $.ajax({
        url: "http://localhost:90/Sharp_Code/administracion_de_alquileres/app/backend/controller/LocalidadController.php",
        method: "POST",
        data: {
            action: "guardarLocalidadEditada",
            guardarLocalidadEditada: localidadEditadaParaGuardar
        }
    });

    funcionAjax.done(function (retorno) {
        console.log(retorno);
        if (retorno != null) {
            mostrarFormLocalidadPpal();
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






