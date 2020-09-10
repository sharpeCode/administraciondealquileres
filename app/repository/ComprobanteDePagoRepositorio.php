<?php
require_once '../entity/ComprobanteDePago.php';
require_once '../entity/Saldos.php';
require_once '../entity/NumComprobante.php';
require_once '../entity/Count.php';
require_once 'BaseRepository.php';

class ComprobanteDePagoRepositorio
{

    public static function guardarComprobanteDePago($numeroComprobante, $tipoComprobante, $tipoRecibo, $idContrato, $idRegistroPago, $correspondienteMes, $correspondienteAnio, $alquilerMensual, $expensas, $gastosAdm, $deposito, $cuotas, $numCuota, $interesPorMora, $otrosConceptos, $saldoAnterior, $totalImporteAPagar, $totalImporteRecibido, $saldoPendiente, $saldoPendienteSinModificar)
    {

        $resp = false;
        try {

            $sql = "INSERT INTO comprobantes_de_pagos (numero_comprobante, fecha_comprobante, tipo_comprobante_de_pago, tipo_recibo,  id_contrato, 
                    id_registro_de_pago, correspondiente_mes, correspondiente_anio, valor_alquiler, valor_expensas, valor_gastos_adm, 
                    valor_deposito, cant_cuotas_deposito, num_cuota_a_pagar, interes_por_mora, otros_conceptos, saldo_anterior, total_importe_a_pagar,
                    total_importe_recibido, saldo_pendiente, saldo_pendiente_sin_modificar)
                    VALUES(:numero_comprobante, NOW(), :tipo_comprobante_de_pago, :tipo_recibo, :id_contrato, :id_registro_de_pago,
                    :correspondiente_mes, :correspondiente_anio, :valor_alquiler, :valor_expensas, :valor_gastos_adm, :valor_deposito, 
                    :cant_cuotas_deposito, :num_cuota_a_pagar, :interes_por_mora, :otros_conceptos, :saldo_anterior, :total_importe_a_pagar,
                    :total_importe_recibido, :saldo_pendiente, :saldo_pendiente_sin_modificar)";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);

            $sentencia->bindParam(':numero_comprobante', $numeroComprobante, PDO::PARAM_STR);
            $sentencia->bindParam(':tipo_comprobante_de_pago', $tipoComprobante, PDO::PARAM_STR);
            $sentencia->bindParam(':tipo_recibo', $tipoRecibo, PDO::PARAM_STR);
            $sentencia->bindParam(':id_contrato', $idContrato, PDO::PARAM_INT);
            $sentencia->bindParam(':id_registro_de_pago', $idRegistroPago, PDO::PARAM_INT);
            $sentencia->bindParam(':correspondiente_mes', $correspondienteMes, PDO::PARAM_INT);
            $sentencia->bindParam(':correspondiente_anio', $correspondienteAnio, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_alquiler', $alquilerMensual, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_expensas', $expensas, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_gastos_adm', $gastosAdm, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_deposito', $deposito, PDO::PARAM_INT);
            $sentencia->bindParam(':cant_cuotas_deposito', $cuotas, PDO::PARAM_INT);
            $sentencia->bindParam(':num_cuota_a_pagar', $numCuota, PDO::PARAM_INT);
            $sentencia->bindParam(':interes_por_mora', $interesPorMora, PDO::PARAM_INT);
            $sentencia->bindParam(':otros_conceptos', $otrosConceptos, PDO::PARAM_INT);
            $sentencia->bindParam(':saldo_anterior', $saldoAnterior, PDO::PARAM_INT);
            $sentencia->bindParam(':total_importe_a_pagar', $totalImporteAPagar, PDO::PARAM_INT);
            $sentencia->bindParam(':total_importe_recibido', $totalImporteRecibido, PDO::PARAM_INT);
            $sentencia->bindParam(':saldo_pendiente', $saldoPendiente, PDO::PARAM_INT);
            $sentencia->bindParam(':saldo_pendiente_sin_modificar', $saldoPendienteSinModificar, PDO::PARAM_INT);


            $sentencia->execute();
            $resp = $sentencia->fetchObject("ComprobanteDePago");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            //$resp = null;
        }
        return $resp;
    }

    public static function mostrarUltimoComprobanteCargado($tipo){
        $ultimoNumComprobante = "";
        try {
            $sql = "SELECT numero_comprobante AS numeroComprobante FROM comprobantes_de_pagos
                    WHERE tipo_comprobante_de_pago = '$tipo'
                    ORDER BY numero_comprobante DESC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $ultimoNumComprobante = $sentencia->fetchObject("NumComprobante");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $ultimoNumComprobante = "";
        }

        return $ultimoNumComprobante;
    }

    public static function mostrarUltimoComprobanteDePagoDeUnContrato($idContrato,$tipo){

        $saldos = "";
        try {
            $sql = "SELECT total_importe_a_pagar AS totalImporteAPagar, total_importe_recibido AS totalImporteRecibido, 
                    saldo_anterior AS saldoAnterior 
                    FROM comprobantes_de_pagos
                    WHERE id_contrato = '$idContrato' AND tipo_comprobante_de_pago = '$tipo'
                    ORDER BY numero_comprobante DESC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $saldos = $sentencia->fetchObject("Saldos");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $saldos = "";
        }

        return $saldos;
    }

    public static function sumarSaldosPendientesAnteriores($idContrato, $tipo){

        $saldos = "";
        try {
            $sql = "SELECT total_importe_a_pagar AS totalImporteAPagar, total_importe_recibido AS totalImporteRecibido, 
                    SUM(saldo_pendiente) AS saldoPendiente
                    FROM comprobantes_de_pagos
                    WHERE id_contrato = '$idContrato' AND tipo_comprobante_de_pago = '$tipo'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $saldos = $sentencia->fetchObject("Saldos");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $saldos = "";
        }

        return $saldos;
    }

    public static function listarComprobantesDePago()
    {

        $listadoCompPagos = null;
        try {
            $sql = "SELECT CP.id_comprobantes_de_pago AS idComprobantesDePago, CP.numero_comprobante AS numeroComprobante, 
                    CP.fecha_comprobante AS fechaComprobante, CP.tipo_comprobante_de_pago AS tipoComprobanteDePago, CP.tipo_recibo AS tipoRecibo,
                    CP.id_contrato AS idContrato, CP.id_registro_de_pago AS idRegistroDePago, CP.correspondiente_mes AS correspondienteMes, 
                    M.mes_corto AS mesCorto, CP.correspondiente_anio AS correspondienteAnio, CP.valor_alquiler AS valorAlquiler, 
                    CP.valor_expensas AS valorExpensas, CP.valor_gastos_adm AS valorGastosAdm,  CP.valor_deposito 
                    AS valorDeposito, CP.cant_cuotas_deposito AS cantCuotasDeposito, CP.num_cuota_a_pagar AS numCuotaAPagar,
                    CP.interes_por_mora AS interesPorMora, CP.otros_conceptos AS otrosConceptos, CP.saldo_anterior AS saldoAnterior,
                     CP.total_importe_a_pagar AS 
                    totalImporteAPagar, CP.total_importe_recibido AS totalImporteRecibido, CP.saldo_pendiente AS saldoPendiente,
                    CP.saldo_pendiente_sin_modificar AS saldoPendienteSinModificar
                        FROM comprobantes_de_pagos CP LEFT JOIN meses M ON CP.correspondiente_mes = M.id_mes
                        WHERE CP.numero_comprobante <> '00000'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $listadoCompPagos = $sentencia->fetchAll(PDO::FETCH_CLASS, "ComprobanteDePago");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $listadoCompPagos;

    }

    public static function buscarComprobanteDePagoSoloSaldo($idRegistroDePago){
        $saldos = "";
        try {
            $sql = "SELECT CP.id_comprobantes_de_pago AS idComprobantesDePago, 
                    CP.tipo_comprobante_de_pago AS tipoComprobanteDePago,
                    CP.id_contrato AS idContrato, CP.id_registro_de_pago AS idRegistroDePago, CP.correspondiente_mes AS correspondienteMes, 
                    M.mes_corto AS mesCorto, CP.correspondiente_anio AS correspondienteAnio,
                    CP.total_importe_a_pagar AS totalImporteAPagar, CP.total_importe_recibido AS totalImporteRecibido, L.dni, L.nombres, L.apellidos,
                    LOC.localidad, LOC.cp, P.nombre,I.id_inmueble AS idInmueble,  I.tipo, I.torre, I.piso, I.departamento, I.domicilio
                        FROM comprobantes_de_pagos CP LEFT JOIN meses M ON CP.correspondiente_mes = M.id_mes
                        INNER JOIN contratos C ON C.id_contrato = CP.id_contrato
                        INNER JOIN clientes L ON L.dni = C.dni
                        INNER JOIN inmuebles I ON I.id_inmueble = C.id_inmueble
                        INNER JOIN localidades LOC ON LOC.id_localidad = I.id_localidad
                        INNER JOIN provincias P ON LOC.id_provincia = P.id_provincia
                        WHERE CP.id_registro_de_pago = $idRegistroDePago";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $saldos = $sentencia->fetchObject("ComprobanteDePago");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $saldos = "";
        }

        return $saldos;
    }

    public static function ponerSaldoCeroEnElAnteriorRegistro($idRegistroPago){

        $saldos = "";
        try {
            $sql = "UPDATE comprobantes_de_pagos SET saldo_pendiente = 0
                    WHERE id_registro_de_pago = $idRegistroPago
                    ORDER BY id_comprobantes_de_pago ASC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $saldos = $sentencia->fetchObject("Saldos");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $saldos = "";
        }

        return $saldos;
    }

    public static function contarCuantosRecibosTieneUnMismoRegistro($idRegistroDePago){
        $count = 0;
        try {
            $sql = "SELECT COUNT(numero_comprobante) AS cantidadDeRecibos, id_registro_de_pago AS idRegistroDePago,
                    tipo_comprobante_de_pago AS tipoComprobanteDePago                    
                    FROM comprobantes_de_pagos
                    WHERE id_registro_de_pago = '$idRegistroDePago'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $count = $sentencia->fetchObject("Count");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $count = 0;
        }

        return $count;
    }

    public static function listarRecibosDeUnMismoRegistro($idRegistroDePago){
        $recibos = 0;
        try {
            $sql = "SELECT tipo_comprobante_de_pago AS tipoComprobanteDePago, tipo_recibo AS tipoRecibo, numero_comprobante AS numeroComprobante, total_importe_a_pagar AS totalImporteAPagar,
                    valor_alquiler AS valorAlquiler, id_registro_de_pago AS idRegistroDePago
                    FROM comprobantes_de_pagos
                    WHERE id_registro_de_pago = '$idRegistroDePago'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $recibos = $sentencia->fetchAll(PDO::FETCH_CLASS, "ComprobanteDePago");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $recibos = 0;
        }

        return $recibos;
    }

    public static function visualizarRecibo($idRegistroDePago)
    {

        $visualizar = null;
        try {
            $sql = "SELECT CP.id_comprobantes_de_pago AS idComprobantesDePago, CP.numero_comprobante AS numeroComprobante, 
                    CP.fecha_comprobante AS fechaComprobante, CP.tipo_comprobante_de_pago AS tipoComprobanteDePago,
                    CP.tipo_recibo AS tipoRecibo, CP.id_contrato AS idContrato, CP.id_registro_de_pago AS idRegistroDePago, 
                    CP.correspondiente_mes AS correspondienteMes, M.mes_corto AS mesCorto, CP.correspondiente_anio AS correspondienteAnio, 
                    CP.valor_alquiler AS valorAlquiler, CP.valor_gastos_adm AS valorGastosAdm, CP.valor_expensas AS valorExpensas, 
                    CP.valor_deposito AS valorDeposito, CP.cant_cuotas_deposito AS cantCuotasDeposito, CP.num_cuota_a_pagar AS 
                    numCuotaAPagar, CP.interes_por_mora AS interesPorMora, CP.otros_conceptos AS otrosConceptos,CP.saldo_anterior AS 
                    saldoAnterior, CP.total_importe_a_pagar AS totalImporteAPagar, CP.total_importe_recibido AS totalImporteRecibido, 
                    CP.saldo_pendiente_sin_modificar AS saldoPendienteSinModificar, L.dni, L.nombres, L.apellidos, LOC.localidad, 
                    LOC.cp, P.nombre,  I.tipo, I.torre, I.piso, I.departamento, I.domicilio
                        FROM comprobantes_de_pagos CP LEFT JOIN meses M ON CP.correspondiente_mes = M.id_mes
                        INNER JOIN contratos C ON C.id_contrato = CP.id_contrato
                        INNER JOIN clientes L ON L.dni = C.dni
                        INNER JOIN inmuebles I ON I.id_inmueble = C.id_inmueble
                        INNER JOIN localidades LOC ON LOC.id_localidad = I.id_localidad
                        INNER JOIN provincias P ON LOC.id_provincia = P.id_provincia
                        WHERE CP.id_registro_de_pago = $idRegistroDePago";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $visualizar = $sentencia->fetchObject("ComprobanteDePago");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $visualizar;

    }

    public static function visualizarRecibo2($idComprobantesDePago)
    {

        $visualizar = null;
        try {
            $sql = "SELECT CP.id_comprobantes_de_pago AS idComprobantesDePago, CP.numero_comprobante AS numeroComprobante, 
                    CP.fecha_comprobante AS fechaComprobante, CP.tipo_comprobante_de_pago AS tipoComprobanteDePago,
                    CP.tipo_recibo AS tipoRecibo, CP.id_contrato AS idContrato, CP.id_registro_de_pago AS idRegistroDePago, 
                    CP.correspondiente_mes AS correspondienteMes, M.mes_corto AS mesCorto, CP.correspondiente_anio AS correspondienteAnio, 
                    CP.valor_alquiler AS valorAlquiler, CP.valor_gastos_adm AS valorGastosAdm, CP.valor_expensas AS valorExpensas, 
                    CP.valor_deposito AS valorDeposito, CP.cant_cuotas_deposito AS cantCuotasDeposito, CP.num_cuota_a_pagar AS 
                    numCuotaAPagar, CP.interes_por_mora AS interesPorMora, CP.otros_conceptos AS otrosConceptos,CP.saldo_anterior AS 
                    saldoAnterior, CP.total_importe_a_pagar AS totalImporteAPagar, CP.total_importe_recibido AS totalImporteRecibido, 
                    CP.saldo_pendiente_sin_modificar AS saldoPendienteSinModificar, L.dni, L.nombres, L.apellidos, LOC.localidad, 
                    LOC.cp, P.nombre,  I.tipo, I.torre, I.piso, I.departamento, I.domicilio
                        FROM comprobantes_de_pagos CP LEFT JOIN meses M ON CP.correspondiente_mes = M.id_mes
                        INNER JOIN contratos C ON C.id_contrato = CP.id_contrato
                        INNER JOIN clientes L ON L.dni = C.dni
                        INNER JOIN inmuebles I ON I.id_inmueble = C.id_inmueble
                        INNER JOIN localidades LOC ON LOC.id_localidad = I.id_localidad
                        INNER JOIN provincias P ON LOC.id_provincia = P.id_provincia
                        WHERE CP.id_comprobantes_de_pago = $idComprobantesDePago";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $visualizar = $sentencia->fetchObject("ComprobanteDePago");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $visualizar;

    }

    public static function visualizarReciboOficialSoloSaldo($idRegistroDePago)
    {

        $visualizar = null;
        try {
            $sql = "SELECT CP.id_comprobantes_de_pago AS idComprobantesDePago, CP.numero_comprobante AS numeroComprobante, 
                    CP.fecha_comprobante AS fechaComprobante, CP.tipo_comprobante_de_pago AS tipoComprobanteDePago,
                    CP.id_contrato AS idContrato, CP.id_registro_de_pago AS idRegistroDePago, CP.correspondiente_mes AS correspondienteMes, 
                    M.mes_corto AS mesCorto, CP.correspondiente_anio AS correspondienteAnio, CP.valor_alquiler AS valorAlquiler, 
                    CP.valor_gastos_adm AS valorGastosAdm, CP.valor_expensas AS valorExpensas, CP.valor_deposito 
                    AS valorDeposito, CP.cant_cuotas_deposito AS cantCuotasDeposito, CP.num_cuota_a_pagar AS numCuotaAPagar,
                    CP.saldo_anterior AS saldoAnterior, CP.interes_por_mora AS interesPorMora, CP.otros_conceptos AS otrosConceptos,
                    CP.total_importe_a_pagar AS totalImporteAPagar, CP.total_importe_recibido AS totalImporteRecibido, L.dni, L.nombres, L.apellidos,
                    LOC.localidad, LOC.cp, P.nombre,  I.tipo, I.torre, I.piso, I.departamento, I.domicilio
                        FROM comprobantes_de_pagos CP LEFT JOIN meses M ON CP.correspondiente_mes = M.id_mes
                        INNER JOIN contratos C ON C.id_contrato = CP.id_contrato
                        INNER JOIN clientes L ON L.dni = C.dni
                        INNER JOIN inmuebles I ON I.id_inmueble = C.id_inmueble
                        INNER JOIN localidades LOC ON LOC.id_localidad = I.id_localidad
                        INNER JOIN provincias P ON LOC.id_provincia = P.id_provincia
                        WHERE CP.id_registro_de_pago = '$idRegistroDePago' AND valor_alquiler = 0";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $visualizar = $sentencia->fetchObject("ComprobanteDePago");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $visualizar;

    }

    public static function ponerSaldoCeroEnLosSaldosPendientes($idContrato,$idRegistroPago,$tipoComprobante){
        $saldos = "";
        try {
            $sql = "UPDATE comprobantes_de_pagos SET saldo_pendiente = 0
                    WHERE id_contrato = '$idContrato' AND id_registro_de_pago <> '$idRegistroPago'
                    AND tipo_comprobante_de_pago = '$tipoComprobante'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $saldos = $sentencia->fetchObject("Saldos");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $saldos = "";
        }

        return $saldos;
    }

    public static function sumarSaldosPendientes($idContrato,$TipoComprobante){

        $saldos = "";
        try {
            $sql = "SELECT total_importe_a_pagar AS totalImporteAPagar, total_importe_recibido AS totalImporteRecibido, 
                    SUM(saldo_pendiente) AS saldoPendiente
                    FROM comprobantes_de_pagos
                    WHERE id_contrato = '$idContrato' AND tipo_comprobante_de_pago = '$TipoComprobante'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $saldos = $sentencia->fetchObject("Saldos");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $saldos = "";
        }

        return $saldos;
    }

    public static function sumarSaldosPendientesMenosRegistroActual($idContrato,$TipoComprobante,$idRegistroPago){

        $saldos = "";
        try {
            $sql = "SELECT total_importe_a_pagar AS totalImporteAPagar, total_importe_recibido AS totalImporteRecibido, 
                    SUM(saldo_anterior) AS saldoAnterior 
                    FROM comprobantes_de_pagos
                    WHERE id_contrato = '$idContrato' AND tipo_comprobante_de_pago = '$TipoComprobante' AND id_registro_de_pago <> '$idRegistroPago'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $saldos = $sentencia->fetchObject("Saldos");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $saldos = "";
        }

        return $saldos;
    }

    public static function datosRecibo($idComprobantesDePago)
    {
        $datos = null;
        try {
            $sql = "SELECT tipo_comprobante_de_pago AS tipoComprobanteDePago, tipo_recibo AS tipoRecibo,
                    id_comprobantes_de_pago AS idComprobantesDePago
                        FROM comprobantes_de_pagos
                        WHERE id_comprobantes_de_pago = '$idComprobantesDePago'";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $datos = $sentencia->fetchObject("ComprobanteDePago");


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $datos;

    }
}
