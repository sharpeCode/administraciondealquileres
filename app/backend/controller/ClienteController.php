<?php
require_once '../../repository/ClienteRepository.php';
require_once '../entity/Cliente.php';

$action = $_POST['action'];

switch ($action) {
    case "listar":
        listarClientes();
        break;
    case "guardarLocNuevo":
        guardarClienteNuevo();
        break;
    case "guardarLocEdit":
        guardarClienteEditado();
        break;
    case "traerClientesPorDni":
        traerClientesFiltradoPorDni($_POST['dni']);
        break;
    case "traerClienteParaEditar":
        traerClienteParaEditar($_POST['dni']);
        break;
    case "traerClientePorNombre":
        traerClienteFiltradoPorNombre($_POST['nombre']);
        break;
    default:
        console . log("No se pudo a la acción al controller");
        break;
}

function listarClientes()
{
    $clientes = ClienteRepository::listarClientes();
    echo json_encode($clientes);
}

function guardarClienteNuevo()
{
    $guardarCliente = $_POST["cliente"];

    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $clienteObject = (object)$guardarCliente;

//    $dni = $clienteObject->dni;

    //buscar que el cliente no exista
//    $cliente = ClienteRepository::traerClientesFiltradoPorDni($dni);

//    echo'entro al UNO';
//    if ($cliente != "") {
//        echo 'ERROR';
//    } else {
//        echo'entro al DOS';
        $cliente = ClienteRepository::guardarClienteNuevo($clienteObject);
        echo json_encode($cliente);
//    }

}

function guardarClienteEditado()
{
    echo 'entro a user controller';
    $clienteParaGuardar = $_POST["clienteParaGuardar"];


    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $clienteObject = (object)$clienteParaGuardar;

    $cliente = ClienteRepository::guardarClienteEditado($clienteObject);
    var_dump($cliente);
}

function traerClientesFiltradoPorDni($dni)
{
    $clientes = ClienteRepository::s($dni);
    echo json_encode($clientes);
}

function traerClienteParaEditar($dni)
{
    $cliente = ClienteRepository::traerClienteParaEditar($dni);
    echo json_encode($cliente);
}

function traerClienteFiltradoPorNombre($nombre)
{
    $clientes = ClienteRepository::traerClientesFiltradoPorNombre($nombre);
    echo json_encode($clientes);
}
