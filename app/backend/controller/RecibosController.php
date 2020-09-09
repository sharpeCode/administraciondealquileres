<?php
require_once '../../repository/ComprobanteDePagoRepositorio.php';


$action = $_POST['action'];

switch ($action) {

    case "listarRecibos":
        listarRecibos();
        break;

    default:
        echo "NO SE QUE HACER VIEJA";
        break;
}

function listarRecibos()
{
    $listadoCompPagos = ComprobanteDePagoRepositorio::listarComprobantesDePago();
    echo json_encode($listadoCompPagos);
}