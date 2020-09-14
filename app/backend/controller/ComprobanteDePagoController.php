<?php
require_once '../../repository/ComprobanteDePagoRepositorio.php';
require_once '../../repository/RegistroPagoRepositorio.php';
require_once '../../repository/ContratoRepositorio.php';
require_once '../../repository/VariablesRepository.php';
require_once '../../repository/MesRepositorio.php';
require_once '../entity/ArmadoRegistroPagoParaConfeccionar.php';

$action = $_POST['action'];

switch ($action) {
    case "cargarComprobanteDePago":
        cargarComprobanteDePago($_POST['idRegistroDePago']);
        break;
    case "guardarComprobanteDePago":
        guardarComprobanteDePago();
        break;
    case "guardarComprobanteDePagoSoloSaldo":
        guardarComprobanteDePagoSoloSaldo();
        break;
    case "editarElTotalDelReciboPreCargado":
        editarElTotalDelReciboPreCargado($_POST['interesPorMora'], $_POST['subTotal'], $_POST['otrosConceptos'], $_POST['saldoPendiente']);
        break;
    case "EditarValoresReciboOficial":
        EditarValoresReciboOficial();
        break;
    case "EditarValoresReciboNoOficial":
        EditarValoresReciboNoOficial();
        break;
    case "visualizarRecibo":
        visualizarRecibo($_POST['idRegistroDePago']);
        break;
    case "visualizarRecibo2":
        visualizarRecibo2($_POST['idComprobantesDePago']);
        break;
    case "cargarComprobanteDePagoSoloSaldo":
        cargarComprobanteDePagoSoloSaldo($_POST['idRegistroDePago']);
        break;
    case "buscarCuantosRecibosTieneEsteRegistro":
        buscarCuantosRecibosTieneEsteRegistro($_POST['idRegistroDePago']);
        break;
    case "listarRecibosDeUnMismoRegistro":
        listarRecibosDeUnMismoRegistro($_POST['idRegistroDePago']);
        break;
    case "visualizarReciboOficialSoloSaldo":
        visualizarReciboOficialSoloSaldo($_POST['idRegistroDePago']);
        break;
    case "sumarSaldoAnteriores":
        sumarSaldoAnteriores($_POST['idRegistroDePago']);
        break;
    case "listarRecibos":
        listarRecibos();
        break;
    case "datosRecibo":
        datosRecibo($_POST['idComprobantesDePago']);
        break;

    default:
        echo "NO SE QUE HACER VIEJA";
        break;
}

function cargarComprobanteDePago($idRegistroDePago)
{
      // obtener registro de pago completo por el id
    $registroDePago = RegistroPagoRepositorio::buscarRegistroDePagoPorId($idRegistroDePago);

    // busco datos del contrato completo
    $idContrato = $registroDePago->idContrato;
    $datosContrato = ContratoRepositorio::buscarContratoPorId($idContrato);

    //obtengo parametros de fecha inicio y fin de pago e cuota alquiler
    $fechaDesde = $datosContrato->fechaPagoInicio;
    $fechaHasta = $datosContrato->fechaPagoFin;


    //buscar mes y año que corresponde al pago que realizara, para eso buscamos el registro completo por el id
    $mesAPagar = $registroDePago->correspondienteMes;
    $anioAPagar = $registroDePago->correspondienteAnio;

    //CORROBORO SI LA FECHA A PAGAR ESTA VENCIDA =========================================================

    //capturar la fecha de hoy
    $fechaHoy = date('Y-m-d');

    //desglozo DD MM AAAA por separado
    $diaHoy = substr($fechaHoy, -2, 2);  // DD
    $mesHoy = substr($fechaHoy, -5, 2);  // MM
    $anioHoy = substr($fechaHoy, -10, 4); // AAAA

    // convertir el dia en dos digitos DD para armar la fecha y comparar
    $cero = 0;
    if ((strlen($fechaHasta)) < 2) {
        //FECHA con un solo digito lo convierte --> DD
        $fecha = $cero . $fechaHasta;
    } else {
        //aca entra si no hay que hacer nada ya viene --> DD
        $fecha = $fechaHasta;
    }

    // convertir el mes en dos digitos
    if ((strlen($mesAPagar)) < 2) {
        //MES con un solo digito lo convierte --> MM
        $mes = $cero . $mesAPagar;
    } else {
        //aca entra si no hay que hacer nada ya viene --> MM
        $mes = $mesAPagar;
    }

    //traer el ultimo aumneto agregado para la variable vencimiento x dia de atraso
    $nombreVariable = "Interés x vencimiento"; //el id 3 es --> Interes x vencimiento
     $variableAumentoPorDia = VariablesRepository::getVariablesId($nombreVariable);
	    
    $porcAumento = (int)$variableAumentoPorDia->porcentaje;
    $alquiler = (int)$registroDePago->valorAlquiler;
    $valorInteresPorDia = ($alquiler * $porcAumento) / 100; //valor interes x dia en pesos

    // armo la fecha
    $fechaArmada = $anioAPagar . "-" . $mes . "-" . $fecha;


    // saco diferencia fecha armada (mes y año correspondiente al recibo que pagaria + la fecha de vto que figura en el contrato
    $fecha1 = new DateTime($fechaHoy);
    $fecha2 = new DateTime($fechaArmada);

    $diff = $fecha1->diff($fecha2);

    //dias de atraso entre las dos fechas
    $diasAtrasado = $diff->days;


    //corroborar si va a apagar con atraso
    if ($anioHoy < $anioAPagar) {
        //OK
        $interesPorMora = 0;
        $diasAtrasado = 0;
    } elseif ($anioHoy == $anioAPagar) {
        //analizar mes y dia
        if ($mesHoy < $mesAPagar) {
            //OK
            $interesPorMora = 0;
            $diasAtrasado = 0;
        } elseif ($mesHoy == $mesAPagar) {
            //analizar dia
            if ($diaHoy <= $fechaHasta) {
                //OK
                $interesPorMora = 0;
                $diasAtrasado = 0;
            } elseif ($diaHoy > $fechaHasta) {
                //ATRASADO
                $interesPorMora = $valorInteresPorDia * $diasAtrasado;
            }

        } elseif ($mesHoy > $mesAPagar) {
            //ATRASADO
            $interesPorMora = $valorInteresPorDia * $diasAtrasado;
        }

    } elseif ($anioHoy < $anioAPagar) {
        //ATRASADO
        $interesPorMora = $valorInteresPorDia * $diasAtrasado;
    }

    //VERIFICAR ULTIMO NUMERO DE COMPROBANTE PARA CARGAR EL SIGUIENTE
    $tipo = $registroDePago->tipoRegistroDePago;
    $ultimoNumComprobante = ComprobanteDePagoRepositorio::mostrarUltimoComprobanteCargado($tipo);


    $ultimoNumInt = (int)$ultimoNumComprobante->numeroComprobante;

    $numero = $ultimoNumInt + 1;
    $numeroComprobante = str_pad($numero, 5, "0", STR_PAD_LEFT);


    //VERIFICAR SI EL CONTRATO ARRASTRA ALGUN REGISTRO DE PAGO CON UN SALDO PENDIENTE
    $idContrato = $registroDePago->idContrato;
    $saldos = ComprobanteDePagoRepositorio::sumarSaldosPendientesAnteriores($idContrato, $tipo);



    if ($saldos->saldoPendiente == "" or $saldos->saldoPendiente == null) {
        $saldoAnterior = 0;
    } else {
        $saldoAnterior = (int)$saldos->saldoPendiente;
    }

    $v_alquiler = (int)$registroDePago->valorAlquiler;
    $v_expensas = (int)$registroDePago->valorExpensas;
    $v_gastosAdm = (int)$registroDePago->gastosAdministrativos;
    $v_deposito = (int)$registroDePago->valorDeposito;

    $subTotal = $v_alquiler + $v_expensas + $v_gastosAdm + $v_deposito;


    $v_intPorMora = (int)$interesPorMora;
    $v_saldoAnterior = (int)$saldoAnterior;

    $total = $subTotal + $v_intPorMora + $v_saldoAnterior;


    //CARGO OBJETO PARA PASAR
    $CompDePagoConMora = new ArmadoRegistroPagoParaConfeccionar();


    $CompDePagoConMora->numeroComprobante = $numeroComprobante;

    $CompDePagoConMora->idRegistroDePago = $idRegistroDePago;
    $CompDePagoConMora->idContrato = $idContrato;
    $CompDePagoConMora->tipoRegistroDePago = $registroDePago->tipoRegistroDePago;

    $CompDePagoConMora->correspondienteMes = $registroDePago->correspondienteMes;
    $CompDePagoConMora->correspondienteAnio = $registroDePago->correspondienteAnio;

    $CompDePagoConMora->valorAlquiler = $registroDePago->valorAlquiler;
    $CompDePagoConMora->valorDeposito = $registroDePago->valorDeposito;
    $CompDePagoConMora->gastosAdministrativos = $registroDePago->gastosAdministrativos;
    $CompDePagoConMora->valorExpensas = $registroDePago->valorExpensas;
    $CompDePagoConMora->cantCuotasDeposito = $registroDePago->cantCuotasDeposito;
    $CompDePagoConMora->numCuotaAPagar = $registroDePago->numCuotaAPagar;

    $CompDePagoConMora->subTotal = $subTotal;
    $CompDePagoConMora->interesPorMora = $interesPorMora;
    $CompDePagoConMora->diasMora = $diasAtrasado;
    $CompDePagoConMora->otrosConceptos = 0;
    $CompDePagoConMora->saldoAnterior = $saldoAnterior;
    $CompDePagoConMora->totalImporteAPagar = $total;
    $CompDePagoConMora->totalImporteRecibido = 0;
    $CompDePagoConMora->saldoPendiente = $total - $CompDePagoConMora->totalImporteRecibido;

    $CompDePagoConMora->recibo = $registroDePago->recibo;
    $CompDePagoConMora->mesLargo = $registroDePago->mesLargo;
    $CompDePagoConMora->mesCorto = $registroDePago->mesCorto;
    $CompDePagoConMora->dni = $registroDePago->dni;
    $CompDePagoConMora->idInmueble = $registroDePago->idInmueble;
    $CompDePagoConMora->nombres = $registroDePago->nombres;
    $CompDePagoConMora->apellidos = $registroDePago->apellidos;
    $CompDePagoConMora->tipo = $registroDePago->tipo;  //particular - comercial
    $CompDePagoConMora->torre = $registroDePago->torre;
    $CompDePagoConMora->piso = $registroDePago->piso;
    $CompDePagoConMora->departamento = $registroDePago->departamento;
    $CompDePagoConMora->domicilio = $registroDePago->domicilio;
    $CompDePagoConMora->localidad = $registroDePago->localidad;
    $CompDePagoConMora->cp = $registroDePago->cp;
    $CompDePagoConMora->nombrePais = $registroDePago->nombre;


    echo json_encode($CompDePagoConMora);

   
}

function sumarSaldoAnteriores($idRegistroDePago){

    // obtener registro de pago completo por el id
    $registroDePago = RegistroPagoRepositorio::buscarRegistroDePagoPorId($idRegistroDePago);

    $idContrato = $registroDePago->idContrato;
    $tipoComprobante = $registroDePago->tipoRegistroDePago;

    $totalSaldoPendiente = ComprobanteDePagoRepositorio::sumarSaldosPendientes($idContrato, $tipoComprobante);

    if($totalSaldoPendiente->saldoPendiente == null or $totalSaldoPendiente->saldoPendiente == ""){
        $totalSaldoPendiente->saldoPendiente = 0;
    }

    echo json_encode($totalSaldoPendiente);

}

function guardarComprobanteDePago()
{
    $Comprobante = ComprobanteDePagoRepositorio::buscarUltimoIdComprobanteDePago();
    $id = $Comprobante->idComprobantesDePago;
    $idComprobantesDePago = $id + 1;

    $numeroComprobante = $_POST['numeroComprobante'];
    $idRegistroPago = $_POST['idRegistroPago'];
    $idContrato = $_POST['idContrato'];
    $tipoComprobante = $_POST['tipoComprobante'];
    $tipoRecibo = $_POST['tipoRecibo'];
    $correspMes = $_POST['correspondienteMes'];
    $correspondienteAnio = $_POST['correspondienteAnio'];
    $alquilerMensual = $_POST['alquilerMensual'];
    $expensas = $_POST['expensas'];
    $gastosAdm = $_POST['gastosAdm'];
    $deposito = $_POST['deposito'];
    $cuotas = $_POST['cuotas'];
    $numCuota = $_POST['numCuota'];
    $interesPorMora = $_POST['interesPorMora'];
    $otrosConceptos = $_POST['otrosConceptos'];
    $saldoAnterior = $_POST['saldoAnterior'];
    $totalImporteAPagar = (int)$_POST['totalImporteAPagar'];
    $totalImporteRecibido = (int)$_POST['totalImporteRecibido'];
    $saldoPendiente = $totalImporteAPagar - $totalImporteRecibido;
    $saldoPendienteSinModificar = $saldoPendiente;

    //validaciones a campos editables
    if ($expensas == "") {
        $expensas = 0;
    }
    if ($interesPorMora == "") {
        $interesPorMora = 0;
    }
    if ($otrosConceptos == "") {
        $otrosConceptos = 0;
    }
    if ($totalImporteRecibido == "") {
        $totalImporteRecibido = 0;
    }

    //buscar Id del mes
    $nombreMes = $correspMes;
    $mes = MesRepositorio::buscarIdMes($nombreMes);
    $correspondienteMes = $mes->idMes;

    //cambiar los valores siguientes de alguiler mensual si es que se modifico el actual
    $valorRegistrado = RegistroPagoRepositorio::buscarValorActualAlquilerMensual($idRegistroPago);
    $valorViejo = (int) $valorRegistrado->valorAlquiler;
    $valorNuevo = (int) $alquilerMensual;

    if($valorViejo != $valorNuevo){
        RegistroPagoRepositorio::actualizarNuevoValorAlquilerMensual($alquilerMensual,$idRegistroPago,$tipoComprobante,$idContrato);
    }

    //guardar el comprobante de pago en la tabla "comprobante_de_pagos"
    $registroDePago = ComprobanteDePagoRepositorio::guardarComprobanteDePago($idComprobantesDePago,$numeroComprobante, $tipoComprobante, $tipoRecibo, $idContrato, $idRegistroPago, $correspondienteMes, $correspondienteAnio, $alquilerMensual, $expensas, $gastosAdm, $deposito, $cuotas, $numCuota, $interesPorMora, $otrosConceptos, $saldoAnterior, $totalImporteAPagar, $totalImporteRecibido, $saldoPendiente, $saldoPendienteSinModificar);
    echo json_encode($registroDePago);

     //cambiar la accion del recibo generado --> SI en registros de pago
     RegistroPagoRepositorio::cambiarLaAccionDelRegistroRecibo($idRegistroPago);

    //voy a cargar la columna SALDO_PENDIENTE de la tabla registros_de_pagos
    RegistroPagoRepositorio::cargarSaldoPendiente($idRegistroPago, $saldoPendiente);

    //si pagó saldos anteriores que lo ponga en cero
    $saldosAnt = RegistroPagoRepositorio::sumarSaldosPendientesMenosActual($idContrato, $tipoComprobante, $idRegistroPago);
    $sandoPend = (int) $saldosAnt->saldoPendiente;
    if ($saldoAnterior == $sandoPend and $sandoPend > 0) {
        //en la tabla registros de pagos
        RegistroPagoRepositorio::ponerSaldoCeroEnLosSaldosPendientesAnteriores($idContrato, $idRegistroPago, $tipoComprobante);
        //en la tabla comprobantes de pagos
        ComprobanteDePagoRepositorio::ponerSaldoCeroEnLosSaldosPendientes($idContrato, $idRegistroPago, $tipoComprobante);
    }
}

function editarElImporteRecibidoDelReciboPreCargado($total, $recibido)
{
    $saldoPendiente = $total - $recibido;
    echo json_encode($saldoPendiente);

}

function EditarValoresReciboOficial()
{

    $alquilerMensual = $_POST['alquilerMensual'];
    $expensas = $_POST['expensas'];
    $gastosAdministrativos = $_POST['gastosAdministrativos'];
    $deposito = $_POST['deposito'];

    $interesPorMora = $_POST['interesPorMora'];
    $otrosConceptos = $_POST['otrosConceptos'];
    $saldoAnterior = $_POST['saldoAnterior'];
    $recibido = $_POST['recibido'];

    $saldos = new Saldos();

    $subT = $alquilerMensual + $expensas + $gastosAdministrativos + $deposito;
    $total = $subT + $interesPorMora + $otrosConceptos + $saldoAnterior;
    $salPendiente = $total - $recibido;

    $saldos->subTotal = $subT;
    $saldos->totalImporteAPagar = $total;
    $saldos->saldoPendiente = $salPendiente;

    echo json_encode($saldos);

}

function EditarValoresReciboNoOficial()
{
    $subT = $_POST['alquilerMensual'];
    $interesPorMora = $_POST['interesPorMora'];

    $saldos = new Saldos();

    $total = $subT + $interesPorMora;

    $saldos->subTotal = $subT;
    $saldos->totalImporteAPagar = $total;

    echo json_encode($saldos);
}

function visualizarRecibo($idRegistroDePago)
{
    $visualizar = ComprobanteDePagoRepositorio::visualizarRecibo($idRegistroDePago);
    echo json_encode($visualizar);
}

function visualizarRecibo2($idComprobantesDePago)
{
    $visualizar = ComprobanteDePagoRepositorio::visualizarRecibo2($idComprobantesDePago);
    echo json_encode($visualizar);
}

function cargarComprobanteDePagoSoloSaldo($idRegistroDePago)
{

    $comprobanteDePago = ComprobanteDePagoRepositorio::buscarComprobanteDePagoSoloSaldo($idRegistroDePago);

    $totalImporteAPagar = (int)$comprobanteDePago->totalImporteAPagar;
    $totalImporteRecibido = (int)$comprobanteDePago->totalImporteRecibido;
    $saldoPendiente = $totalImporteAPagar - $totalImporteRecibido;

    //VERIFICAR ULTIMO NUMERO DE COMPROBANTE PARA CARGAR EL SIGUIENTE
    $tipo = $comprobanteDePago->tipoComprobanteDePago;
    $ultimoNumComprobante = ComprobanteDePagoRepositorio::mostrarUltimoComprobanteCargado($tipo);
    $ultimoNumInt = (int)$ultimoNumComprobante->numeroComprobante;
    $numero = $ultimoNumInt + 1;
    $numeroComprobante = str_pad($numero, 5, "0", STR_PAD_LEFT);

    //CARGO OBJETO PARA PASAR
    $CompDePago = new ArmadoRegistroPagoParaConfeccionar();


    $CompDePago->numeroComprobante = $numeroComprobante;

    $CompDePago->idRegistroDePago = $idRegistroDePago;
    $CompDePago->idContrato = $comprobanteDePago->idContrato;
    $CompDePago->tipoRegistroDePago = $comprobanteDePago->tipoComprobanteDePago;

    $CompDePago->correspondienteMes = $comprobanteDePago->correspondienteMes;
    $CompDePago->correspondienteAnio = $comprobanteDePago->correspondienteAnio;


    $CompDePago->saldoAnterior = $saldoPendiente;

    $CompDePago->recibo = "Si";
    $CompDePago->mesCorto = $comprobanteDePago->mesCorto;
    $CompDePago->dni = $comprobanteDePago->dni;
    $CompDePago->idInmueble = $comprobanteDePago->idInmueble;
    $CompDePago->nombres = $comprobanteDePago->nombres;
    $CompDePago->apellidos = $comprobanteDePago->apellidos;
    $CompDePago->tipo = $comprobanteDePago->tipo;  //particular - comercial
    $CompDePago->torre = $comprobanteDePago->torre;
    $CompDePago->piso = $comprobanteDePago->piso;
    $CompDePago->departamento = $comprobanteDePago->departamento;
    $CompDePago->domicilio = $comprobanteDePago->domicilio;
    $CompDePago->localidad = $comprobanteDePago->localidad;
    $CompDePago->cp = $comprobanteDePago->cp;
    $CompDePago->nombrePais = $comprobanteDePago->nombre;


    echo json_encode($CompDePago);

}

function guardarComprobanteDePagoSoloSaldo()
{

    $Comprobante = ComprobanteDePagoRepositorio::buscarUltimoIdComprobanteDePago();
    $id = $Comprobante->idComprobantesDePago;
    $idComprobantesDePago = $id + 1;

    $numeroComprobante = $_POST['numeroComprobante'];
    $tipoComprobante = $_POST['tipoComprobante'];
    $tipoRecibo = $_POST['tipoRecibo'];
    $idContrato = $_POST['idContrato'];
    $idRegistroPago = $_POST['idRegistroPago'];
    $correspMes = $_POST['correspondienteMes'];
    $correspondienteAnio = $_POST['correspondienteAnio'];
    $alquilerMensual = $_POST['alquilerMensual'];
    $expensas = $_POST['expensas'];
    $gastosAdm = $_POST['gastosAdm'];
    $deposito = $_POST['deposito'];
    $cuotas = $_POST['cuotas'];
    $numCuota = $_POST['numCuota'];
    $interesPorMora = $_POST['interesPorMora'];
    $otrosConceptos = $_POST['otrosConceptos'];
    $saldoAnterior = 0;
    $totalImporteAPagar = $_POST['totalImporteAPagar'];
    $totalImporteRecibido = $_POST['totalImporteRecibido'];
    $saldoPendiente = 0;
    $saldoPendienteSinModificar = 0;

    //buscar Id del mes
    $nombreMes = $correspMes;
    $mes = MesRepositorio::buscarIdMes($nombreMes);
    $correspondienteMes = $mes->idMes;

    $registroDePago = ComprobanteDePagoRepositorio::guardarComprobanteDePago($idComprobantesDePago,$numeroComprobante, $tipoComprobante,
        $tipoRecibo, $idContrato, $idRegistroPago, $correspondienteMes, $correspondienteAnio, $alquilerMensual, $expensas,
        $gastosAdm, $deposito, $cuotas, $numCuota, $interesPorMora, $otrosConceptos, $saldoAnterior, $totalImporteAPagar,
        $totalImporteRecibido, $saldoPendiente, $saldoPendienteSinModificar);

    //poner 0 en el saldo pendiente anterior
    ComprobanteDePagoRepositorio::ponerSaldoCeroEnElAnteriorRegistro($idRegistroPago);


    //voy a poner 0 a saldo pendiente de la tabla REGISTROS_DE_PAGOS

    RegistroPagoRepositorio::cargarSaldoPendiente($idRegistroPago, $saldoPendiente);

    echo json_encode($registroDePago);


}

function buscarCuantosRecibosTieneEsteRegistro($idRegistroDePago)
{
    $countRecibos = ComprobanteDePagoRepositorio::contarCuantosRecibosTieneUnMismoRegistro($idRegistroDePago);
    echo json_encode($countRecibos);

}

function listarRecibosDeUnMismoRegistro($idRegistroDePago)
{
    $recibos = ComprobanteDePagoRepositorio::listarRecibosDeUnMismoRegistro($idRegistroDePago);
    echo json_encode($recibos);
}

function visualizarReciboOficialSoloSaldo($idRegistroDePago)
{
    $visualizar = ComprobanteDePagoRepositorio::visualizarReciboOficialSoloSaldo($idRegistroDePago);
    echo json_encode($visualizar);

}

function listarRecibos()
{
    $listadoCompPagos = ComprobanteDePagoRepositorio::listarComprobantesDePago();
    echo json_encode($listadoCompPagos);
}

function datosRecibo($idComprobantesDePago)
{
    $datos = ComprobanteDePagoRepositorio::datosRecibo($idComprobantesDePago);
    echo json_encode($datos);
}




