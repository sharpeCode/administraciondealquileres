<?php
require_once '../entity/CifrasEnLetras.php';
require_once '../../repository/ComprobanteDePagoRepositorio.php';

$action = $_POST['action'];

switch ($action) {
    case "convertirCifraEnLetra":
        convertirCifraEnLetra($_POST["idComprobanteDePago"]);
        break;
    default:
        console . log("NO SE QUE HACER VIEJA");
        break;
}

function convertirCifraEnLetra($idComprobanteDePago)
{
    $importe = ComprobanteDePagoRepositorio::mostrarImporteRecibidoComprobanteDePago($idComprobanteDePago);
    $totalpagar = (int) $importe->totalImporteRecibido;

    $v=new CifrasEnLetras();
    //Convertimos el total en letras
    $letra=($v->convertirEurosEnLetras($totalpagar));
    echo json_encode($letra);

}

