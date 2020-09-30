<?php
require_once '../../repository/ClienteRepository.php';
require_once '../../repository/ContratoRepositorio.php';
require_once '../entity/Cliente.php';

$action = $_POST['action'];

switch ($action) {
    case "listarClientes":
        listarClientes();
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
    case "traerClientesPorEstado":
        traerClienteFiltradoPorEstado($_POST['estado']);
        break;
    case "deleteCliente":
        eliminarCliente();
        break;
    case "activarCliente":
        activarCliente();
        break;
    default:
        console . log("No se pudo acceder a la acción al controller");
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

    $clienteObject = (object)$guardarCliente;

    $dni = $clienteObject->dni;

    //buscar que el cliente no exista
    $cliente = ClienteRepository::traerClienteParaEditar($dni);

    if ($cliente == false) {
        $cliente = ClienteRepository::guardarClienteNuevo($clienteObject);
        echo json_encode($cliente);
    }
    else {
        echo 'ERROR';
    }
}

function guardarClienteEditado()
{
    $clienteParaGuardar = $_POST["clienteParaGuardar"];

    $clienteObject = (object)$clienteParaGuardar;

    $cliente = ClienteRepository::guardarClienteEditado($clienteObject);
    var_dump($cliente);
}

function traerClientesFiltradoPorDni($dni)
{
    $clientes = ClienteRepository::traerClientesFiltradoPorDni($dni);
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

function traerClienteFiltradoPorEstado($estado)
{
    $clientes = ClienteRepository::traerClientesFiltradoPorEstado($estado);
    echo json_encode($clientes);
}

function eliminarCliente()
{
    $dni = $_POST["dni"];

    //buscar que el cliente no tenga contrato asociado
    $contrato = ContratoRepositorio::buscarContratoPorDni($dni);

    if ($contrato == false) {
        $clientes = ClienteRepository::eliminarCliente($dni);
        echo json_encode($clientes);
    }
    else{
        $contrato = ContratoRepositorio::buscarContratoActivo($dni);
        if ($contrato == false) {
            $clientes = ClienteRepository::eliminarCliente($dni);
            echo json_encode($clientes);
        }
        else
        {
            echo 'ERROR';
        }
    }



}

function activarCliente()
{
    $dni = $_POST["dni"];
    $clientes = ClienteRepository::activarCliente($dni);
    echo json_encode($clientes);

}
