<?php
require_once '../../repository/ContratoRepositorio.php';
require_once '../../repository/ClienteRepository.php';
require_once '../../repository/InmuebleRepository.php';
require_once '../../repository/VariableIpcRipteAnualRepositorio.php';
require_once '../../repository/VariableIntAnualComercioRepositorio.php';
require_once '../../repository/VariablePorcentajeImpoNoOficialRepositorio.php';
require_once '../../repository/RegistroPagoRepositorio.php';

$action = $_POST['action'];

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
    case "validarContrato":
        validarContrato();
        break;
    case "guardarContratoNuevo":
        guardarContratoNuevo();
        break;
    case "cargarIdContratoAutomatico":
        cargarIdContratoAutomatico();
        break;

    default:
        console . log("NO SE QUE HACER VIEJA");
        break;
}

function listarContratos()
{
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

function validarContrato()
{
    $guardarContrato = $_POST["datosDelContrato"];

    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $contratoObject = (object)$guardarContrato;

    // FECHAS SUBSTR=========================================================================
    //guardo en variable la fecha de Inicio y Fin de contrato
    $fechaInicio = $contratoObject->fechaInicio;
    $fechaFin = $contratoObject->fechaFin;

    //tomamos solo el dia
    $diaInicio = substr($fechaInicio, -2, 2); //DD
    $diaFin = substr($fechaFin, -2, 2); //DD

    //tomamos solo el mes
    $mesInicio = substr($fechaInicio, -5, 2); //MM
    $mesFin = substr($fechaFin, -5, 2); //MM

    //tomamos solo el año
    $anioInicio = substr($fechaInicio, -10, 4); //AAAA
    $anioFin = substr($fechaFin, -10, 4); //AAAA

    // ======================================================================================
    if ($fechaInicio == "") {
        echo "Falta fecha de inicio";
    } else if ($fechaFin == "") {
        echo "Falta fecha Fin";
    } else if ($fechaInicio == "" & $fechaFin == "") {
        echo "Años";
    } else if ($fechaInicio != "" & $fechaFin != "") {
        if ($diaInicio == $diaFin) {
            if ($mesInicio == $mesFin) {
                if ($anioInicio > $anioFin) {
                    echo "Fecha Fin es inferior al Inicio";
                } else if ($anioInicio < $anioFin) {
                    if ($mesInicio != $mesFin & $diaInicio != $diaFin) {
                        echo "Error en el dia y mes";
                    } else if ($mesInicio != $mesFin & $diaInicio == $diaFin) {
                        echo "Error en el mes";
                    } else if ($mesInicio == $mesFin & $diaInicio != $diaFin) {
                        echo "Error en el dia";
                    } else if ($mesInicio == $mesFin & $diaInicio == $diaFin) {
                        $anios = $anioFin - $anioInicio;
                        echo $anios;
                    }
                } else if ($anioInicio == $anioFin) {
                    echo "Error, Inicio y Fin es el mismo";
                } else if ($anioInicio == $anioFin & $mesInicio != $mesFin & $diaInicio != $diaFin) {
                    echo "Error en el dia, mes y año";
                } else if ($anioInicio == $anioFin & $mesInicio != $mesFin & $diaInicio == $diaFin) {
                    echo "Error en el mes y año";
                } else if ($anioInicio == $anioFin & $mesInicio == $mesFin & $diaInicio != $diaFin) {
                    echo "Error en el año y mes";
                }
            } else if ($mesInicio != $mesFin) {
                if ($mesInicio != $mesFin & $diaInicio != $diaFin) {
                    echo "Error en el dia y mes";
                } else if ($mesInicio != $mesFin) {
                    echo "Error en el mes";
                } else if ($mesInicio != $mesFin & $diaInicio == $diaFin) {
                    echo "Error en el mes";
                }
            }
        } else if ($diaInicio != $diaFin) {
            if ($diaInicio != $diaFin & $mesInicio != $mesFin) {
                echo "Error en el dia y mes";
            } else if ($diaInicio != $diaFin & $mesInicio != $mesFin) {
                echo "Error en los dias y meses";
            } else if ($diaInicio != $diaFin) {
                echo "Error en los dias";
            }
        }else if ($anioInicio > $diaFin) {
            if ($diaInicio != $diaFin & $mesInicio != $mesFin) {
                echo "Error en el dia, mes y año";
            } else if ($mesInicio != $mesFin & $diaInicio == $diaFin) {
                echo "Error en el mes y año";
            } else if ($mesInicio == $mesFin & $diaInicio == $diaFin) {
                echo "Error en el año";
            }
        }
    }
}

function guardarContratoNuevo()
{

    $guardarContrato = $_POST["contratoNuevoParaGuardar"];

    // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $contratoObject = (object)$guardarContrato;

    $registroPago = ContratoRepositorio::guardarContratoNuevo($contratoObject);
    echo json_encode($registroPago);

}

function cargarIdContratoAutomatico()
{
    $contrato = ContratoRepositorio::traerUltimoIdContrato();
    $id = (int)$contrato->idContrato;
    $id = $id + 1;
    echo json_encode($id);

}

