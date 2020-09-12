<?php
require_once '../../repository/ClienteRepository.php';
require_once '../entity/Cliente.php';

$action = $_POST['action'];

switch ($action) {
    case "listarClientes":
        listarClientes();
        break;
    case "deleteCliente":
        eliminarCliente();
        break;
    case "guardarClienteNuevo":
        guardarClienteNuevo();
        break;
    case "guardarClienteEdit":
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
    case "hola":
        hola();
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

    $dni = $clienteObject->dni;

    //buscar que el cliente no exista
    $cliente = ClienteRepository::traerClienteParaEditar($dni);

//    echo'entro al UNO';
    if ($cliente != null) {
        echo 'ERROR';
    } else {
    $cliente = ClienteRepository::guardarClienteNuevo($clienteObject);
    echo json_encode($cliente);
    }

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

function eliminarCliente()
{
    $dni = $_POST["dni"];
    $clientes = ClienteRepository::eliminarCliente($dni);
    echo json_encode($clientes);
}
