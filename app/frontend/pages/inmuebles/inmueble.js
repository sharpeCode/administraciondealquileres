$(function () {
    $("#inmuebleAdd").hide();
    $("#inmuebleAgregar").hide();
    $("#inmuebleEdit").hide();
    $("#inmuebleList").show();
    $("#localidadAdd").hide();
    $("#localidadEdit").hide();
    $("#localidadList").hide();
    CargarListadoInmueble();
});

function mostrarFormInmuebleAdd() {

    $("#inmuebleAdd").hide();
    $("#inmuebleAgregar").show();
    $("#inmuebleEdit").hide();
    $("#inmuebleList").hide();
    $("#localidadAdd").hide();
    $("#localidadEdit").hide();
    $("#localidadList").hide();

    //llenarSelectConLocalidades();
}

// function mostrarFormInmueblePpal() {
//     $("#inmuebleList").show();
//     $("#inmuebleAdd").hide();
//     $("#inmuebleEdit").hide();
//     $("#inmuebleAgregar").hide();
//     CargarListadoInmueble();
// }
//
// function mostrarFormInmuebleEditar(id) {
//     $("#localidadAdd").hide();
//     $("#localidadEdit").hide();
//     $("#localidadList").hide();
//     $("#inmuebleAdd").hide();
//     $("#inmuebleEdit").show();
//     $("#inmuebleList").hide();
//     $("#inmuebleAgregar").hide();
//     llenarSelectConLocalidadesParaEditar();
//     loadInmuebleData(id);
// }

// function mostrarFormLocalidadPpal() {
//     $("#inmuebleList").hide();
//     $("#inmuebleAdd").hide();
//     $("#inmuebleEdit").hide();
//     $("#localidadList").show();
//     $("#localidadAdd").hide();
//     $("#localidadEdit").hide();
//     $("#inmuebleAgregar").hide();
//     loadLocalidadesGrid();
// }
//
// function mostrarFormLocalidadAdd() {
//     $("#inmuebleList").hide();
//     $("#inmuebleAdd").hide();
//     $("#inmuebleEdit").hide();
//     $("#localidadList").hide();
//     $("#localidadAdd").show();
//     $("#localidadEdit").hide();
//     $("#inmuebleAgregar").hide();
//     cargarIdLocalidad();
//     llenarSelectConProvincias();
// }
//
// function mostrarFormLocalidadEditar(idLocalidad) {
//     $("#localidadAdd").hide();
//     $("#localidadList").hide();
//     $("#localidadEdit").show();
//     $("#inmuebleAgregar").hide();
//     llenarSelectConProvinciasParaEditar();
//     cargarLocalidadParaEditar(idLocalidad);
// }

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

function llenarTablaInmuebles(jsonUsers) {
    jsonUsers = JSON.parse(jsonUsers);
    let tableRaws = "";

    for (var i = 0, l = jsonUsers.length; i < l; i++) {
        tableRaws += "<tr>";
        tableRaws += construirFilaDeInmueble(jsonUsers[i]);
        tableRaws += "</tr>";
    }

    $("#listadoooo").html(tableRaws);
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


// //LLENAR SELECT LOCALIDADES
// function llenarSelectConLocalidades() {
//
//     let uri = EndpointsEnum.LOCALIDAD;
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "listarLocalidades"
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         fillDom(retorno);
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.log("Error al cargar Localidades")
//     });
//
//     funcionAjax.always(function (retorno) {
//     });
// }
//
// function fillDom(arrayLocalidad) {
//
//     arrayLocalidad = JSON.parse(arrayLocalidad);
//     let options = "";
//
//     //para agregarle placeholder a la lista desplegable
//     let optionDefault = "<option value='-1'>Localidad</option>";
//     options +=optionDefault;
//
//     for (var i = 0, l = arrayLocalidad.length; i < l; i++) {
//         options += optionsLocalidadEdit(arrayLocalidad[i]);
//     }
//     $("#idLocalidad").html(options);
// }
//
// //GUARDAR INMUEBLE
// function guardarInmueble() {
//     var inmuebleNuevoParaGuardar = mapToJson($('#inmuebleAdd').serializeArray());
//
//     let uri = EndpointsEnum.INMUEBLE;
//     let href = EndpointsEnum.VOLVER_INMUEBLES;
//
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "guardarInmuebleNuevo",
//             inmueble: inmuebleNuevoParaGuardar
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         console.log(retorno);
//         location.href = href;
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.log("error al guardar inmueble")
//     });
//
//     funcionAjax.always(function (retorno) {
//         console.log("volvi de guardar el user")
//     });
//     console.log("Fin llamada controller usuario");
// }
//
// //LLENAR SELECT CON LOCADIDADES PARA EDITAR
// function llenarSelectConLocalidadesParaEditar() {
//
//     let uri = EndpointsEnum.LOCALIDAD;
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "listarLocalidades"
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         fillDomEdit(retorno);
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.log("Error al cargar Localidades")
//     });
// }
//
// function fillDomEdit(arrayLocalidad) {
//     arrayLocalidad = JSON.parse(arrayLocalidad);
//
//     let options = "";
//
//     for (var i = 0, l = arrayLocalidad.length; i < l; i++) {
//         options += optionsLocalidadEdit(arrayLocalidad[i]);
//     }
//     $("#editIdlocalidad").html(options);
//
// }
//
// function optionsLocalidadEdit(localidad) {
//     let option = "";
//     option += "<option value=" + localidad['idLocalidad'] + ">" + localidad['localidad'] + "</option>";
//     return option;
// }
//
// function loadInmuebleData(id) {
//
//     let uri = EndpointsEnum.INMUEBLE;
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "traerInmueblePorId",
//             inmueble: id
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         fillEditionForm(JSON.parse(retorno));
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.error(retorno);
//     });
// }
//
// function fillEditionForm(inmueble) {
//     $("#editIdInmueble").val(inmueble["idInmueble"]);
//     $("#editTipo").val(inmueble["tipo"]);
//     $("#editTorre").val(inmueble["torre"]);
//     $("#editPiso").val(inmueble["piso"]);
//     $("#editDepartamento").val(inmueble["departamento"]);
//     $("#editDomicilio").val(inmueble["domicilio"]);
//     $("#editIdlocalidad").val(inmueble["idLocalidad"]);
// }
//
// function guardarInmuebleEditado() {
//
//     var inmuebleEditado = mapToJson($('#inmuebleEdit').serializeArray());
//
//     let uri = EndpointsEnum.INMUEBLE;
//
//     let href = EndpointsEnum.VOLVER_INMUEBLES;
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "guardarInmuebleEditado",
//             inmuebleEditado: inmuebleEditado
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         if (retorno != null) {
//              location.href = href;
//         }
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.log("error al guardar user")
//     });
//
//     funcionAjax.always(function (retorno) {
//         console.log("volvi de guardar el user")
//     });
//     console.log("Fin llamada controller usuario");
// }
//
//
//
// function loadLocalidadesGrid() {
//     getAllLocalidades(fillLocalidadesGrid,
//         {
//             action: "listarLocalidades",
//         }
//     );
// }
//
// function getAllLocalidades(doneFunction, data) {
//
//     doneFunction = doneFunction instanceof Function ? doneFunction : function (data) {
//         console.log(data)
//     };
//     data = data === undefined ? {action: "getAll"} : data;
//
//     let uri = EndpointsEnum.LOCALIDAD;
//
//     let funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: data
//     });
//
//     funcionAjax.done(doneFunction);
//
//     funcionAjax.fail(function (retorno) {
//         console.log("error al llamar back de Localidades")
//     });
//
//     funcionAjax.always(function (retorno) {
//         console.log("always de promise clientes")
//     });
// }
//
// function fillLocalidadesGrid(jsonLocalidades) {
//
//     jsonLocalidades = JSON.parse(jsonLocalidades);
//
//     let tableRaws = "";
//
//     for (var i = 0, l = jsonLocalidades.length; i < l; i++) {
//         tableRaws += "<tr>";
//         tableRaws += buildRawFromLocalidades(jsonLocalidades[i]);
//         tableRaws += "</tr>";
//     }
//
//     $("#listadoLocalidades").html(tableRaws);
// }
//
// function buildRawFromLocalidades(loc) {
//
//     let raw = "";
//     raw += "<td>" + loc['idLocalidad'] + "</td>";
//     raw += "<td>" + loc['localidad'] + "</td>";
//     raw += "<td>" + loc['cp'] + "</td>";
//     raw += "<td>" + loc['nombre'] + "</td>";
//
//     raw += "<td>";
//     raw += "<td>";
//     raw += "<button class='miBoton-icon' title='Editar Localidad' onclick='mostrarFormLocalidadEditar(" + loc['idLocalidad'] + ")'>" +
//         "<span class='glyphicon glyphicon-pencil'></span>";
//     raw += "</button></td> ";
//
//     return raw;
//
// }
//
//
//
// function cargarIdLocalidad() {
//
//     let uri = EndpointsEnum.LOCALIDAD;
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "cargarIdLocalidadAutomatico",
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         console.log("EL ID OBTENIDO DE LA BASE ES.....");
//         console.log(retorno);
//         $("#idLocalidadADD").val(retorno);
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.error(retorno);
//     });
// }
//
// function llenarSelectConProvincias() {
//
//     let uri = EndpointsEnum.LOCALIDAD;
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "cargarSelectConProvincias",
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         fillDomProvincia(retorno);
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.log("Error al cargar las Provincias")
//     });
//
//     funcionAjax.always(function (retorno) {
//         console.log("Volví de buscar las Provincias")
//     });
// }
//
// function fillDomProvincia(arrayProvincia) {
//
//     arrayProvincia = JSON.parse(arrayProvincia);
//     let options = "";
//
//     //para agregarle placeholder a la lista desplegable
//     let optionDefault = "<option value='-1'>Provincia</option>";
//     options += optionDefault;
//
//     for (var i = 0, l = arrayProvincia.length; i < l; i++) {
//         options += optionsProvincia(arrayProvincia[i]);
//     }
//     $("#idProvincia").html(options);
//     //document.getElementById('provincia').selectedIndex = -1;
//
// }
//
// function optionsProvincia(provincia) {
//     let option = "";
//     option += "<option value='" + provincia['idProvincia'] + "'>" + provincia['nombre'] + "</option>";
//     return option;
// }
//
// function guardarLocalidad() {
//
//     let guardarLocalidad = mapToJson($('#localidadAdd').serializeArray()); //obtener el varlos de todos los input
//
//     console.log("LOS DATOS OBTENIDOS DEL FOMULARIO SON....");
//     console.log(guardarLocalidad);
//
//     let uri = EndpointsEnum.LOCALIDAD;
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "datosParaGuardarLocalidad",
//             guardarLocalidad: guardarLocalidad
//         }
//     });
//     funcionAjax.done(function (retorno) {
//         console.log(retorno);
//         if (retorno != null) {
//             mostrarFormLocalidadPpal();
//         }
//     });
//     funcionAjax.fail(function (retorno) {
//         console.log("error al guardar ejercicio en la rutina")
//     });
//     funcionAjax.always(function (retorno) {
//         console.log("volvi de guardar el ejercicio en la rutina")
//     });
//     console.log("Fin llamada controller rutina");
// }
//
//
//
// function llenarSelectConProvinciasParaEditar() {
//
//     let uri = EndpointsEnum.LOCALIDAD;
//     console.log("Llamando a controller Localidad = " + uri);
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "cargarSelectConProvincias",
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         console.log(retorno);
//         fillDomEditProvincia(retorno);
//
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.log("error al cargar select con alumnos")
//     });
//
//     funcionAjax.always(function (retorno) {
//         console.log("volvi de buscar a los alumnos")
//     });
// }
//
// function fillDomEditProvincia(arrayProvincia) {
//
//     arrayProvincia = JSON.parse(arrayProvincia);
//     let options = "";
//
//     for (var i = 0, l = arrayProvincia.length; i < l; i++) {
//         options += optionsProvincia(arrayProvincia[i]);
//     }
//     $("#editIdProvincia").html(options);
//
// }
//
// function cargarLocalidadParaEditar(idLocalidad) {
//
//     let uri = EndpointsEnum.LOCALIDAD;
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "traerLocalidadPorId",
//             idLocalidad: idLocalidad
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         llenarFormConLocalidad(JSON.parse(retorno));
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.error(retorno);
//     });
// }
//
// function llenarFormConLocalidad(localidad) {
//
//     $("#editIdLocalidad").val(localidad["idLocalidad"]);
//     $("#editLocalidad").val(localidad["localidad"]);
//     $("#editCp").val(localidad["cp"]);
//     $("#editIdProvincia").val(localidad["idProvincia"]);
// }
//
// function guardarLocalidadEditada() {
//
//     var localidadEditadaParaGuardar = mapToJson($('#localidadEdit').serializeArray());
//
//     let uri = EndpointsEnum.LOCALIDAD;
//
//     var funcionAjax = $.ajax({
//         url: uri,
//         method: "POST",
//         data: {
//             action: "guardarLocalidadEditada",
//             guardarLocalidadEditada: localidadEditadaParaGuardar
//         }
//     });
//
//     funcionAjax.done(function (retorno) {
//         console.log(retorno);
//         if (retorno != null) {
//             mostrarFormLocalidadPpal();
//         }
//     });
//
//     funcionAjax.fail(function (retorno) {
//         console.log("error al guardar user")
//     });
//
//     funcionAjax.always(function (retorno) {
//         console.log("volvi de guardar el user")
//     });
//     console.log("Fin llamada controller usuario");
// }
//
//
//
//
//
//
