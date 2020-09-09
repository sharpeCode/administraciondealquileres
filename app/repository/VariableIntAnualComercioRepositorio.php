<?php
require_once '../entity/VariablesIntAnualComercio.php';
require_once '../entity/PorcentajeDeVariable.php';
require_once 'BaseRepository.php';

class VariableIntAnualComercioRepositorio
{

    public static function traerUltimaVariableIntComercioAnual2()
    {
        $interesAnual = null;
        try {
            $sql = "SELECT id_int AS idInt, int_comercio_anual AS intComercioAnual, fecha_ingreso_variable AS fechaIngresoVariable 
                        FROM variables_int_anual_comercio
                        ORDER BY fecha_ingreso_variable DESC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $interesAnual = $sentencia->fetchObject("VariableIntAnualComercio");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $interesAnual = null;
        }

        return $interesAnual;
    }

    public static function traerUltimaVariableIntComercioAnual()
    {
        $interesAnual = null;
        try {
            $sql = "SELECT P.id, P.id_variable as idVariable, P.porcentaje, P.fecha_ingreso as fecha
                    FROM porcentaje_de_variables as P
                    WHERE id_variable = 2
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
