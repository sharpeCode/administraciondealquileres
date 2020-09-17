<?php
require_once '../entity/RegistroPago.php';
require_once '../entity/Contrato.php';
require_once '../entity/ComprobanteDePago.php';
require_once 'BaseRepository.php';

class RegistroPagoRepositorio
{

    public static function ingresarRegistroDePagoNuevo($idRegistroDePago,$idContrato, $iCompPorContrato, $tipoRegistroDePago, $correspondienteMes, $correspondienteAnio,
                                                       $valorAlquiler, $gastosAdministrativos, $valorExpensas, $valorDeposito,
                                                       $cantCuotasDeposito, $numCuotaAPagar, $recibo, $saldoPendiente)
    {
        $resp = false;
        try {

            $sql = "INSERT INTO registros_de_pagos (id_registro_de_pago,id_contrato, id_comp_por_contrato, tipo_registro_de_pago,correspondiente_mes, 
                    correspondiente_anio, valor_alquiler, gastos_administrativos, valor_expensas, valor_deposito, cant_cuotas_deposito, 
                    num_cuota_a_pagar, recibo, saldo_pendiente)
                    VALUES(:id_registro_de_pago,:id_contrato, :id_comp_por_contrato, :tipo_registro_de_pago, :correspondiente_mes, :correspondiente_anio, 
                    :valor_alquiler, :gastos_administrativos, :valor_expensas,:valor_deposito, :cant_cuotas_deposito, :num_cuota_a_pagar, 
                    :recibo, :saldo_pendiente)";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);

            $sentencia->bindParam(':id_registro_de_pago',$idRegistroDePago, PDO::PARAM_INT);
            $sentencia->bindParam(':id_contrato',$idContrato, PDO::PARAM_INT);
            $sentencia->bindParam(':id_comp_por_contrato',$iCompPorContrato, PDO::PARAM_INT);
            $sentencia->bindParam(':tipo_registro_de_pago', $tipoRegistroDePago, PDO::PARAM_STR);
            $sentencia->bindParam(':correspondiente_mes', $correspondienteMes, PDO::PARAM_INT);
            $sentencia->bindParam(':correspondiente_anio', $correspondienteAnio, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_alquiler', $valorAlquiler, PDO::PARAM_INT);
            $sentencia->bindParam(':gastos_administrativos', $gastosAdministrativos, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_expensas', $valorExpensas, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_deposito', $valorDeposito, PDO::PARAM_INT);
            $sentencia->bindParam(':cant_cuotas_deposito', $cantCuotasDeposito, PDO::PARAM_INT);
            $sentencia->bindParam(':num_cuota_a_pagar', $numCuotaAPagar, PDO::PARAM_INT);
            $sentencia->bindParam(':recibo', $recibo, PDO::PARAM_STR);
            $sentencia->bindParam(':saldo_pendiente', $saldoPendiente, PDO::PARAM_INT);

            $sentencia->execute();
            $resp = $sentencia->fetchObject("RegistroPago");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $resp = null;
        }
        return $resp;

    }

    public static function listarRegistroDePagosPorIdContrato($idContrato)
    {
        $registroDePagos = null;
        try {
            $sql = "SELECT RP.id_registro_de_pago AS idRegistroDePago, RP.id_comp_por_contrato AS idCompPorContrato, M.mes_largo AS 
            mesLargo, M.mes_corto AS mesCorto, RP.id_contrato AS idContrato, RP.tipo_registro_de_pago AS tipoRegistroDePago, 
            RP.correspondiente_mes AS correspondienteMes, RP.correspondiente_anio AS correspondienteAnio,RP.valor_alquiler AS 
            valorAlquiler, RP.gastos_administrativos AS gastosAdministrativos, RP.valor_expensas AS valorExpensas, RP.valor_deposito AS 
            valorDeposito, RP.cant_cuotas_deposito AS cantCuotasDeposito, RP.num_cuota_a_pagar AS numCuotaAPagar, RP.recibo, RP.saldo_pendiente
            AS saldoPendiente, C.fecha_inicio AS fechaInicio, C.fecha_fin AS fechaFin, C.dni, C.id_inmueble AS idInmueble, L.nombres, 
            L.apellidos, I.tipo, I.torre, I.piso, I.departamento, I.domicilio, LOC.localidad, LOC.cp, P.nombre
            FROM registros_de_pagos RP INNER JOIN contratos C ON RP.id_contrato = C.id_contrato
            INNER JOIN clientes L ON L.dni = C.dni
            INNER JOIN inmuebles I ON I.id_inmueble = C.id_inmueble
            INNER JOIN localidades LOC ON LOC.id_localidad = I.id_localidad
            INNER JOIN provincias P ON P.id_provincia = LOC.id_provincia
            INNER JOIN  meses M ON M.id_mes = RP.correspondiente_mes
            WHERE RP.id_contrato = $idContrato";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $registroDePagos = $sentencia->fetchAll(PDO::FETCH_CLASS, "RegistroPago");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $registroDePagos = null;
        }

        return $registroDePagos;
    }

    public static function mostrarDatosParaCabeceraDeRegistrosDePago($idContrato)
    {
        $datos = null;
        try {
            $sql = "SELECT C.id_contrato AS idContrato, C.fecha_inicio AS fechaInicio, C.fecha_fin AS fechaFin, C.dni, 
            C.id_inmueble AS idInmueble, fecha_pago_inicio AS fechaPagoInicio, fecha_pago_fin AS fechaPagoFin,
            L.nombres, L.apellidos, I.tipo, I.torre, I.piso, I.departamento, I.domicilio, LOC.localidad, LOC.cp, P.nombre
            FROM contratos C
            INNER JOIN clientes L ON L.dni = C.dni
            INNER JOIN inmuebles I ON I.id_inmueble = C.id_inmueble
            INNER JOIN localidades LOC ON LOC.id_localidad = I.id_localidad
            INNER JOIN provincias P ON P.id_provincia = LOC.id_provincia
            WHERE C.id_contrato = $idContrato";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $datos = $sentencia->fetchObject("Contrato");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $datos = null;
        }

        return $datos;
    }

    public static function buscarRegistroDePagoPorId($idRegistroDePago)
    {
        $registroDePago = null;
        try {
            $sql = "SELECT RP.id_registro_de_pago AS idRegistroDePago, RP.id_comp_por_contrato AS idCompPorContrato,RP.tipo_registro_de_pago
            AS tipoRegistroDePago, M.mes_largo AS 
            mesLargo, M.mes_corto AS mesCorto, RP.id_contrato AS idContrato, RP.tipo_registro_de_pago AS tipoRegistroDePago, 
            RP.correspondiente_mes AS correspondienteMes, RP.correspondiente_anio AS correspondienteAnio, RP.valor_alquiler AS 
            valorAlquiler, RP.gastos_administrativos AS gastosAdministrativos, RP.valor_expensas AS valorExpensas, RP.valor_deposito AS 
            valorDeposito, RP.cant_cuotas_deposito AS cantCuotasDeposito, RP.num_cuota_a_pagar AS numCuotaAPagar, RP.recibo, C.dni, 
            C.id_inmueble AS idInmueble, L.nombres, L.apellidos, I.tipo, I.torre, I.piso, I.departamento, I.domicilio, LOC.localidad, 
            LOC.cp, P.nombre
            FROM registros_de_pagos RP INNER JOIN contratos C ON RP.id_contrato = C.id_contrato
            INNER JOIN clientes L ON L.dni = C.dni
            INNER JOIN inmuebles I ON I.id_inmueble = C.id_inmueble
            INNER JOIN localidades LOC ON LOC.id_localidad = I.id_localidad
            INNER JOIN provincias P ON P.id_provincia = LOC.id_provincia
            INNER JOIN  meses M ON M.id_mes = RP.correspondiente_mes
            LEFT JOIN comprobantes_de_pagos CP ON CP.id_registro_de_pago = RP.id_registro_de_pago
            WHERE RP.id_registro_de_pago = $idRegistroDePago";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $registroDePago = $sentencia->fetchObject("RegistroPago");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $registroDePago = null;
        }

        return $registroDePago;
    }

    public static function cambiarLaAccionDelRegistroRecibo($idRegistroPago)
    {
        $si = "Si";
        $respuesta = null;
        try {
            $sql = "UPDATE registros_de_pagos SET recibo = 'Si'
            WHERE id_registro_de_pago = $idRegistroPago";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $respuesta = $sentencia->execute();
            //$datos = $sentencia->fetchObject("Contrato");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $respuesta = null;
        }

        return $respuesta;
    }

    public static function cargarSaldoPendiente($idRegistroPago,$saldoPendiente)
    {
        $respuesta = null;
        try {
            $sql = "UPDATE registros_de_pagos SET saldo_pendiente = $saldoPendiente
            WHERE id_registro_de_pago = $idRegistroPago";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $respuesta = $sentencia->execute();
            //$datos = $sentencia->fetchObject("Contrato");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $respuesta = null;
        }
        return $respuesta;
    }

    public static function sumarSaldosPendientesMenosActual($idContrato,$TipoComprobante,$idRegistroPago)
    {
        $saldosAnteriores = "";
        try {
            $sql = "SELECT SUM(saldo_pendiente) AS saldoPendiente 
                    FROM registros_de_pagos
                    WHERE id_contrato = '$idContrato' AND tipo_registro_de_pago = '$TipoComprobante' AND id_registro_de_pago <> '$idRegistroPago'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $saldosAnteriores = $sentencia->fetchObject("Saldos");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $saldosAnteriores = "";
        }
        return $saldosAnteriores;
    }

    public static function ponerSaldoCeroEnLosSaldosPendientesAnteriores($idContrato,$idRegistroPago, $tipoComprobante){
        $saldos = "";
        try {
            $sql = "UPDATE registros_de_pagos SET saldo_pendiente = 0
                    WHERE id_contrato = '$idContrato' AND id_registro_de_pago <> '$idRegistroPago' 
                    AND tipo_registro_de_pago = '$tipoComprobante'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $saldos = $sentencia->fetchObject("Saldos");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $saldos = "";
        }
        return $saldos;
    }

    public static function buscarValorActualAlquilerMensualyExpensas($idRegistroDePago)
    {
        $valorRegistrado = null;
        try {
            $sql = "SELECT valor_alquiler AS valorAlquiler, valor_expensas AS valorExpensas
            FROM registros_de_pagos 
            WHERE id_registro_de_pago = $idRegistroDePago";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $valorRegistrado = $sentencia->fetchObject("RegistroPago");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $valorRegistrado = null;
        }

        return $valorRegistrado;
    }

    public static function actualizarNuevoValorAlquilerMensual($alquilerMensual, $expensas, $idRegistroPago,$tipoComprobante,$idContrato)
    {
        $respuesta = null;
        try {
            $sql = "UPDATE registros_de_pagos SET valor_alquiler = '$alquilerMensual', valor_expensas = '$expensas'
            WHERE id_registro_de_pago >= '$idRegistroPago' 
            AND id_contrato = '$idContrato' 
            AND tipo_registro_de_pago = '$tipoComprobante'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $respuesta = $sentencia->execute();

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $respuesta = null;
        }
        return $respuesta;
    }

    public static function traerUltimoIdRegistroDePago()
    {
        $registroDePago = null;
        try {
            $sql = "SELECT id_registro_de_pago AS idRegistroDePago
                    FROM registros_de_pagos 
                    ORDER BY id_registro_de_pago DESC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $registroDePago = $sentencia->fetchObject("RegistroPago");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $registroDePago = null;
        }

        return $registroDePago;
    }

}