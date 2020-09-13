<?php
require_once '../../repository/LocalidadRepositorio.php';
require_once '../entity/Localidad.php';

$action = $_POST['action'];

switch ($action) {
    case "listarLocalidades":
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
        console . log("Error");
        break;
}

function listarLocalidades()
{
    $localidades = LocalidadRepositorio::listarLocalidades();
    echo json_encode($localidades);
}

function cargarSelectConProvincias()
{
    $provincias = LocalidadRepositorio::cargarSelectConPcias();
    echo json_encode($provincias);

}

function datosParaGuardarLocalidad()
{

    $localidadAdd = $_POST["guardarLocalidad"];
    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $localidad = (object)$localidadAdd;

    //buscar que la localidad no exista
    $local = LocalidadRepositorio::buscarLocalidadPorNombreYcp($localidad);

    //if ($local != "") {
     //   echo 'ERROR';
    //} elseif ($local == null) {

        $loc = LocalidadRepositorio::guardarLocalidadNueva($localidad);
        echo json_encode($loc);
    //}


}

function traerLocalidadPorId($idLocalidad)
{
    $localidad = LocalidadRepositorio::buscarLocalidadPorId($idLocalidad);
    echo json_encode($localidad);
}

function guardarLocalidadEditada()
{
    $localidadEditar = $_POST["guardarLocalidadEditada"];

    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $localidad = (object)$localidadEditar;
    var_dump($localidad);

    $loc = LocalidadRepositorio::guardarLocalidadEditada($localidad);
    echo json_encode($loc);
}

function traerIdProvincia($provincia)
{
    echo 'voy a mostrar nombre provincia';
    var_dump($provincia);

    $prov = LocalidadRepositorio::buscarIdProvincia($provincia);
    echo json_encode($prov);
}

function eliminarLocalidad($idLocalidad)
{

    $loc = LocalidadRepositorio::eliminarLocalidad($idLocalidad);
    echo json_encode($loc);
}

