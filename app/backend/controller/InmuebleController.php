<?php
require_once '../../repository/InmuebleRepository.php';
require_once '../mapper/PaymentsMapper.php';
require_once '../entity/Inmueble.php';
require_once '../entity/Localidad.php';

$action = $_POST['action'];

switch ($action) {

    case "listar":
        getAllInmuebles();
        break;
    case "cargarSelectConLocalidades":
        getLocalidades();
        break;
    case "traerInmueblePorId":
        traerInmueblePorId($_POST['inmueble']);
        break;
    case "guardarInmuebleNuevo":
        guardarInmuebleNuevo();
        break;
    case "guardarInmuebleEditado":
        guardarInmuebleEditado($_POST['inmuebleEditado']);
        break;
    case "crearPDF":
        crearPDF();
        break;
    default:
        console . log("NO SE QUE HACER VIEJA");
        break;
}

function getAllInmuebles()
{
    $inmuebles = InmuebleRepository::getAllInmuebles();
    echo json_encode($inmuebles);
}

function guardarInmuebleNuevo()
{
    $inmuebleAdd = $_POST["inmueble"];

    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $inmueble = (object)$inmuebleAdd;

    $inm = InmuebleRepository::addInmueble($inmueble);
    echo json_encode($inm);
}

function traerInmueblePorId($id)
{
    $Inmueble = InmuebleRepository::getInmueblesById($id);
    echo json_encode($Inmueble);
}

function guardarInmuebleEditado($inmuebleEditado)
{
    $inmuebleEdit = $inmuebleEditado;

    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $inmueble = (object)$inmuebleEdit;

    $inm = InmuebleRepository::editInmueble($inmueble);
    echo json_encode($inm);
}

function crearPDF()
{
    $pdf = new FPDF();
    $pdf->AddPage('P','Letter');
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(40, 10, '¡Hola, Mundo!');
    $pdf->Output();
};
