<?php
require_once '../entity/Contrato.php';
require_once '../entity/Inmueble.php';
require_once '../entity/FechaPago.php';
require_once 'BaseRepository.php';

class ContratoRepositorio
{

    public static function listarContratos()
    {
        $contratos = null;
        try {
            $sql = "SELECT C.id_contrato AS idContrato, C.fecha_inicio AS fechaInicio, C.fecha_fin AS fechaFin, C.dni, L.nombres, L.apellidos, C.id_inmueble AS idInmueble,
                    I.tipo, I.torre, I.piso, I.departamento, I.domicilio, I.id_localidad AS idLocalidad, Loc.localidad, Loc.cp, Loc.id_provincia AS idProvincia,
                    C.valor_alquiler_oficial AS valorAlquilerOficial, C.valor_alquiler_no_oficial AS valorAlquilerNoOficial, C.valor_deposito AS valorDeposito, 
                    C.gastos_administrativos AS gastosAdministrativos, C.valor_expensas AS valorExpensas, C.cant_cuotas_deposito AS cantCuotasDeposito, 
                    C.fecha_pago_inicio AS fechaPagoInicio, C.fecha_pago_fin AS fechaPagoFin
                    FROM contratos C INNER JOIN clientes L ON C.dni = L.dni
                    INNER JOIN inmuebles I ON C.id_inmueble = I.id_inmueble
                    INNER JOIN localidades Loc ON Loc.id_localidad = I.id_localidad
                    INNER JOIN provincias P ON P.id_provincia = Loc.id_provincia";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $contratos = $sentencia->fetchAll(PDO::FETCH_CLASS, "Contrato");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $contratos;
    }

    public static function cargarSelectConFechaIni()
    {
        $fecha = null;
        try {
            $sql = "SELECT id_fecha_pago AS idFechaPago, fecha
                        FROM fecha_pago";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $fecha = $sentencia->fetchAll(PDO::FETCH_CLASS, "FechaPago");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $fecha;

    }

    public static function cargarSelectConInmueb()
    {
        $provincias = null;
        try {
            $sql = "SELECT I.id_inmueble AS idInmueble, I.tipo, I.torre, I.piso, I.departamento, I.domicilio, I.id_localidad,
                    L.localidad, L.cp, L.id_provincia AS idProvincia, P.nombre
                        FROM inmuebles I INNER JOIN localidades L ON I.id_localidad = L.id_localidad
                        INNER JOIN provincias P ON P.id_provincia = L.id_provincia";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $provincias = $sentencia->fetchAll(PDO::FETCH_CLASS, "Inmueble");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }
        return $provincias;

    }

    public static function guardarContratoNuevo($contratoObject)
    {
        $registroPago = null;
        try {

            $sql = "INSERT INTO contratos (id_contrato, fecha_inicio, fecha_fin, dni, id_inmueble, valor_alquiler_oficial, valor_alquiler_no_oficial, 
                    valor_deposito, gastos_administrativos, valor_expensas, cant_cuotas_deposito, fecha_pago_inicio, fecha_pago_fin)
                    VALUES(:id_contrato, :fecha_inicio, :fecha_fin, :dni, :id_inmueble, :valor_alquiler_oficial, :valor_alquiler_no_oficial, 
                    :valor_deposito, :gastos_administrativos, :valor_expensas, :cant_cuotas_deposito, :fecha_pago_inicio, :fecha_pago_fin)";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);

            $sentencia->bindParam(':id_contrato', $contratoObject->idContrato, PDO::PARAM_INT);
            $sentencia->bindParam(':fecha_inicio', $contratoObject->fechaInicio, PDO::PARAM_STR);
            $sentencia->bindParam(':fecha_fin', $contratoObject->fechaFin, PDO::PARAM_STR);
            $sentencia->bindParam(':dni', $contratoObject->dni, PDO::PARAM_STR);
            $sentencia->bindParam(':id_inmueble', $contratoObject->idInmueble, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_alquiler_oficial', $contratoObject->valorAlquilerOficial, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_alquiler_no_oficial', $contratoObject->valorAlquilerNoOficial, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_deposito', $contratoObject->valorDeposito, PDO::PARAM_INT);
            $sentencia->bindParam(':gastos_administrativos', $contratoObject->gastosAdministrativos, PDO::PARAM_INT);
            $sentencia->bindParam(':valor_expensas', $contratoObject->valorExpensas, PDO::PARAM_INT);
            $sentencia->bindParam(':cant_cuotas_deposito', $contratoObject->cantCuotasDeposito, PDO::PARAM_INT);
            $sentencia->bindParam(':fecha_pago_inicio', $contratoObject->fechaPagoInicio, PDO::PARAM_INT);
            $sentencia->bindParam(':fecha_pago_fin', $contratoObject->fechaPagoFin, PDO::PARAM_INT);

            $sentencia->execute();
            $registroPago = $sentencia->fetchObject("Contrato");

        } catch (PDOException $ex) {
           //print 'ERROR' . $ex->getMessage();

            $registroPago = "ERROR";
        }
        return $registroPago;

    }

    public static function traerUltimoContratoGuardado()
    {
        $ultimoContrato = null;
        try {
            $sql = "SELECT C.id_contrato AS idContrato, C.fecha_inicio AS fechaInicio, C.fecha_fin AS fechaFin, C.dni, L.nombres, L.apellidos, 
                    C.id_inmueble AS idInmueble, I.tipo, C.valor_alquiler_oficial AS valorAlquilerOficial, C.valor_alquiler_no_oficial AS 
                    valorAlquilerNoOficial, C.valor_deposito AS valorDeposito, C.gastos_administrativos AS gastosAdministrativos, C.valor_expensas 
                    AS valorExpensas, C.cant_cuotas_deposito AS cantCuotasDeposito, C.fecha_pago_inicio AS fechaPagoInicio, C.fecha_pago_fin AS fechaPagoFin
                    FROM contratos C INNER JOIN clientes L ON C.dni = L.dni
                    INNER JOIN inmuebles I ON C.id_inmueble = I.id_inmueble 
                    ORDER BY id_contrato DESC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $ultimoContrato = $sentencia->fetchObject("Contrato");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $ultimoContrato = null;
        }

        return $ultimoContrato;
    }

    public static function buscarContratoPorId($idContrato)
    {
        $datosContrato = null;
        try {
            $sql = "SELECT id_contrato AS idContrato, fecha_inicio AS fechaInicio, fecha_fin AS fechaFin, id_inmueble AS idInmueble,
                    valor_alquiler_oficial AS valorAlquilerOficial, valor_alquiler_no_oficial AS valorAlquilerNoOficial, valor_deposito AS 
                    valorDeposito, gastos_administrativos AS gastosAdministrativos, valor_expensas AS valorExpensas, cant_cuotas_deposito AS 
                    cantCuotasDeposito, fecha_pago_inicio AS fechaPagoInicio, fecha_pago_fin AS fechaPagoFin
                    FROM contratos
                    WHERE id_contrato = $idContrato";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $datosContrato = $sentencia->fetchObject("Contrato");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $datosContrato = null;
        }

        return $datosContrato;
    }

    public static function traerUltimoIdContrato()
    {
        $contrato = null;
        try {
            $sql = "SELECT id_contrato AS idContrato
                    FROM contratos  
                    ORDER BY id_contrato DESC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $contrato = $sentencia->fetchObject("Contrato");

//            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
//            $sentencia->execute();
//            $contrato = $sentencia->fetch(int|null);


        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $contrato = null;
        }

        return $contrato;
    }

}