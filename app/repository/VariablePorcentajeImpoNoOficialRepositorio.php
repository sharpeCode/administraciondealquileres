<?php
require_once '../entity/VariablePorcentajeImpoNoOficial.php';
require_once '../entity/PorcentajeDeVariable.php';
require_once 'BaseRepository.php';

class VariablePorcentajeImpoNoOficialRepositorio
{

    public static function traerUltimaVariablePorcentajeImpoNoOficial2()
    {
        $porcNoOficial = null;
        try {
            $sql = "SELECT id_porcentaje AS idPorcentaje, porc_division_importe AS porcDivisionImporte, fecha_ingreso_variable AS fechaIngresoVariable 
                        FROM variables_porcentaje_impo_no_oficial
                        ORDER BY fecha_ingreso_variable DESC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $porcNoOficial = $sentencia->fetchObject("VariablePorcentajeImpoNoOficial");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $porcNoOficial = null;
        }

        return $porcNoOficial;
    }

    public static function traerUltimaVariablePorcentajeImpoNoOficial()
    {
        $interesAnual = null;
        try {
            $sql = "SELECT P.id, P.id_variable as idVariable, P.porcentaje, P.fecha_ingreso as fecha
                    FROM porcentaje_de_variables as P
                    WHERE id_variable = 4
                    ORDER BY fecha_ingreso DESC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $interesAnual = $sentencia->fetchObject("PorcentajeDeVariable");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $interesAnual = null;
        }

        return $interesAnual;
    }

}
