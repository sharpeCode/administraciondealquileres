<?php
require_once '../../repository/LocalidadesRepositorio.php';
require_once '../entity/Localidad.php';

$action = $_POST['action'];

switch ($action) {
    case "listar":
        listarLocalidades();
        break;
    case "cargarSelectConProvincias":
        cargarSelectConProvincias();
        break;
    case "datosParaGuardarLocalidad":
        datosParaGuardarLocalidad();
        break;
    case "traerLocalidadPorId":
        traerLocalidadPorId($_POST['idLocalidad']);
        break;
    case "guardarLocalidadEditada":
        guardarLocalidadEditada();
        break;
    case "traerIdProvincia":
        traerIdProvincia($_POST['provincia']);
        break;
    case "eliminarLocalidad":
        eliminarLocalidad($_POST['idLocalidad']);
        break;
    default:
        console . log("NO SE QUE HACER VIEJA");
        break;
}

function listarLocalidades()
{
    $localidades = LocalidadesRepositorio::listarLocalidades();
    echo json_encode($localidades);
}

function cargarSelectConProvincias()
{
    $provincias = LocalidadesRepositorio::cargarSelectConPcias();
    echo json_encode($provincias);

}

function datosParaGuardarLocalidad()
{

    $localidadAdd = $_POST["guardarLocalidad"];
    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $localidad = (object)$localidadAdd;

    //buscar que la localidad no exista
    $local = LocalidadesRepositorio::buscarLocalidadPorNombreYcp($localidad);

    //if ($local != "") {
     //   echo 'ERROR';
    //} elseif ($local == null) {

        $loc = LocalidadesRepositorio::guardarLocalidadNueva($localidad);
        echo json_encode($loc);
    //}


}

function traerLocalidadPorId($idLocalidad)
{
    $localidad = LocalidadesRepositorio::buscarLocalidadPorId($idLocalidad);
    echo json_encode($localidad);
}

function guardarLocalidadEditada()
{
    $localidadEditar = $_POST["guardarLocalidadEditada"];

    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $localidad = (object)$localidadEditar;
    var_dump($localidad);

    $loc = LocalidadesRepositorio::guardarLocalidadEditada($localidad);
    echo json_encode($loc);
}

function traerIdProvincia($provincia)
{
    echo 'voy a mostrar nombre provincia';
    var_dump($provincia);

    $prov = LocalidadesRepositorio::buscarIdProvincia($provincia);
    echo json_encode($prov);
}

function eliminarLocalidad($idLocalidad)
{

    $loc = LocalidadesRepositorio::eliminarLocalidad($idLocalidad);
    echo json_encode($loc);
}

