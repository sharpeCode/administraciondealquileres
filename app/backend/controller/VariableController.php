<?php
require_once '../../repository/VariablesRepository.php';
require_once '../mapper/PaymentsMapper.php';
require_once '../entity/Variable.php';
require_once '../entity/PorcentajeDeVariable.php';

$action = $_POST['action'];

switch ($action) {

    case "listarVariables":
        getAllVariables();
        break;
    case "cargarSelectConVariables":
        getVariables();
        break;
    case "guardarVariableNuevo":
        guardarVariableNuevo();
        break;
    default:
        console . log("Error");
        break;
}

function getAllVariables()
{
    $porcentajeDeVariable = VariablesRepository::getAllVariables();
    echo json_encode($porcentajeDeVariable);
}

function getVariables()
{
    $variable = VariablesRepository::getVariables();
    echo json_encode($variable);
}

function guardarVariableNuevo()
{
    $porcentajeDeVariableAdd = $_POST["variable"];

    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $porcentajeDeVariable = (object)$porcentajeDeVariableAdd;

    $inm = VariablesRepository::addVariable($porcentajeDeVariable);
    echo json_encode($inm);
}

