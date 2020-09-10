<?php
require_once '../../repository/ContratoRepositorio.php';
require_once '../../repository/ClienteRepository.php';
require_once '../../repository/InmuebleRepository.php';
require_once '../../repository/VariableIpcRipteAnualRepositorio.php';
require_once '../../repository/VariableIntAnualComercioRepositorio.php';
require_once '../../repository/VariablePorcentajeImpoNoOficialRepositorio.php';
require_once '../../repository/RegistroPagoRepositorio.php';

$action = $_POST['action'];
echo '$action';

switch ($action) {
    case "listar":
        listarContratos();
        break;
    case "cargarSelectConClientes":
        cargarSelectConLocatario();
        break;
    case "cargarSelectConInmueble":
        cargarSelectConInmueble();
        break;
    case "cargarSelectConFechaInicio":
        cargarSelectConFechaInicio();
        break;
    case "guardarContratoNuevo":
        guardarContratoNuevo();
        break;
    default:
        console . log("NO SE QUE HACER VIEJA");
        break;
}

function listarContratos()
{
    echo 'LLego al controler de contrato ';
    $contratos = ContratoRepositorio::listarContratos();
    echo json_encode($contratos);
}

function cargarSelectConLocatario()
{
    $locatarios = ClienteRepository::cargarSelectConClientes();
    echo json_encode($locatarios);

}

function cargarSelectConInmueble()
{
    $inmueble = ContratoRepositorio::cargarSelectConInmueb();
    echo json_encode($inmueble);

}

function cargarSelectConFechaInicio()
{
    $fecha = ContratoRepositorio::cargarSelectConFechaIni();
    echo json_encode($fecha);

}

function guardarContratoNuevo()
{
    $guardarContrato = $_POST["contratoNuevoParaGuardar"];

    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $contratoObject = (object)$guardarContrato;

    $registroPago = ContratoRepositorio::guardarContratoNuevo($contratoObject);
    echo json_encode($registroPago);

}

