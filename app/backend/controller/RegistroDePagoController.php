<?php
require_once '../../repository/ContratoRepositorio.php';
require_once '../../repository/ClienteRepository.php';
require_once '../../repository/InmuebleRepository.php';
require_once '../../repository/VariableIpcRipteAnualRepositorio.php';
require_once '../../repository/VariableIntAnualComercioRepositorio.php';
require_once '../../repository/VariablePorcentajeImpoNoOficialRepositorio.php';
require_once '../../repository/VariablesRepository.php';
require_once '../../repository/RegistroPagoRepositorio.php';

$action = $_POST['action'];

switch ($action) {
    case "guardarRegistrosDePagos":
        generarRegistrosDePagos();
        break;
    case "listar":
        traerRegistroDePago($_POST['idContrato']);
        break;
    case "mostrarDatosParaCabeceraDeRegistrosDePago":
        mostrarDatosParaCabeceraDeRegistrosDePago($_POST['idContrato']);
        break;

    default:
        console . log("NO SE QUE HACER VIEJA");
        break;
}

function generarRegistrosDePagos()
{
    //va a buscar a la base el ultimo contrato guardado
    $contratoObject = ContratoRepositorio::traerUltimoContratoGuardado();

    //traer el tipo de inmueble Particular - Comercial
    $idInmu = $contratoObject->idInmueble;
    $inmueble = InmuebleRepository::getInmueblesById($idInmu);
    $tipoInmueble = $inmueble->tipo;


    // FECHAS SUBSTR=========================================================================
    //guardo en variable la fecha de Inicio y Fin de contrato
    $fechaInicio = $contratoObject->fechaInicio;   //20/07/2020
    $fechaFin = $contratoObject->fechaFin;

    //tomamos solo el mes de la fecha de Inicio
    $correspMes = substr($fechaInicio, -14, 2); //MM

    //tomamos solo el año de la fecha de Inicio y Fin
    $correspAnioInicio = substr($fechaInicio, -19, 4); //AAAA
    $correspAnioFin = substr($fechaFin, -19, 4); //AAAA
    // ======================================================================================

    //pasamos a int el mes y el año de la fecha de inicio y fin de contrato
    $mesInt = (int)$correspMes;    //ARRANCO CONTRATO JULIO 2020
    $anioInicioInt = (int)$correspAnioInicio;
    $anioFinInt = (int)$correspAnioFin;

    $anioContrato = $anioFinInt - $anioInicioInt;
    $mesesTotal = $anioContrato * 12;                     //24
    $conteoMeses = 1;

    $cantCuotasDep = (int)$contratoObject->cantCuotasDeposito; //3  NO SE TOCA NUNCA
    $numCuotasApagar = 1;

    $valorAlquilerOficial = (int)$contratoObject->valorAlquilerOficial;
    $valorExpensasMensual = (int)$contratoObject->valorExpensas;
    $valorGastosAdministrativos = (int)$contratoObject->gastosAdministrativos;
    $valorDep = (int)$contratoObject->valorDeposito;


    for ($i = $conteoMeses; $i <= $mesesTotal; $i++) {
        $idContrato = $contratoObject->idContrato;
        if ($mesInt <= 12) {

            $idCompPorContrato = $i;
            $valorAlquilerOficial = $valorAlquilerOficial;

            //RECIBO OFICIAL
            $tipoRegistroDePago = "Oficial";
            $correspondienteMes = $mesInt;
            $correspondienteAnio = $anioInicioInt;

            if ($cantCuotasDep >= 1 AND $numCuotasApagar < $cantCuotasDep AND $numCuotasApagar != 0) {
                $valorDeposito = $valorDep / $cantCuotasDep;
                $numCuotaAPagar = $numCuotasApagar;
                $numCuotasApagar = $numCuotasApagar + 1;
                $cantCuotasDeposito = $cantCuotasDep;
            } elseif ($numCuotasApagar == $cantCuotasDep AND $cantCuotasDep != 1) { //aca entra si lo hace solo en una cuota
                $valorDeposito = $valorDep / $cantCuotasDep;
                $numCuotaAPagar = $numCuotasApagar;
                $numCuotasApagar = 0;
                $cantCuotasDeposito = $cantCuotasDep;
            } elseif ($numCuotasApagar == $cantCuotasDep AND $cantCuotasDep == 1) { //aca entra si lo hace solo en una cuota
                $valorDeposito = $valorDep;
                $numCuotaAPagar = 0;
                $numCuotasApagar = 0;
                $cantCuotasDeposito = $cantCuotasDep;
            } elseif ($numCuotasApagar == 0) {
                $valorDeposito = 0;
                $numCuotaAPagar = 0;
                $numCuotasApagar = 0;
                $cantCuotasDeposito = 0;
            }

            if ($idCompPorContrato == 1) {
                $gastosAdministrativos = $valorGastosAdministrativos;
            } else {
                $gastosAdministrativos = 0;
            }

            $valorAlquiler = $valorAlquilerOficial;
            $recibo = "No";
            $saldoPendiente = 0;

            $respuesta = RegistroPagoRepositorio::ingresarRegistroDePagoNuevo($idContrato, $idCompPorContrato, $tipoRegistroDePago, $correspondienteMes, $correspondienteAnio, $valorAlquiler, $gastosAdministrativos, $valorExpensasMensual, $valorDeposito, $cantCuotasDeposito, $numCuotaAPagar, $recibo, $saldoPendiente);

            //RECIBO NO OFICIAL =============================================================================================
            $tipoRegistroDePago = "No Oficial";
            $correspondienteMes = $mesInt;
            $correspondienteAnio = $anioInicioInt;
            $valorAlquilerNoOficial = (int)$contratoObject->valorAlquilerNoOficial;
            $valorAlquiler = $valorAlquilerNoOficial;
            $valorExpensas = 0;
            $gastosAdministrativos = 0;
            $valorDeposito = 0;
            $cantCuotasDeposito = 0; //3  NO SE TOCA NUNCA
            $numCuotaAPagar = 0;
            $recibo = "No";
            $saldoPendiente = 0;

            $respuesta = RegistroPagoRepositorio::ingresarRegistroDePagoNuevo($idContrato, $idCompPorContrato, $tipoRegistroDePago, $correspondienteMes, $correspondienteAnio, $valorAlquiler, $gastosAdministrativos, $valorExpensas, $valorDeposito, $cantCuotasDeposito, $numCuotaAPagar, $recibo, $saldoPendiente);

            $mesInt = $mesInt + 1;
        } else {
            $anioInicioInt = $anioInicioInt + 1;  //ANIO 2020 --> 2021
            $mesInt = 1;  //MES 12 -> 1
            $i = $i - 1; //hago esto por que al inicializar las variables para que comience un año nuevo y mes 1, me lo cuenta como un registro mas

        }
    }

}

function traerRegistroDePago($idContrato)
{
    $registroDePagos = RegistroPagoRepositorio::listarRegistroDePagosPorIdContrato($idContrato);
    echo json_encode($registroDePagos);
}

function mostrarDatosParaCabeceraDeRegistrosDePago($idContrato)
{
    $datos = RegistroPagoRepositorio::mostrarDatosParaCabeceraDeRegistrosDePago($idContrato);
    echo json_encode($datos);
}
