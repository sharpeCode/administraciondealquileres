<?php
require_once '../entity/VariableIpcRipteAnual.php';
require_once '../entity/PorcentajeDeVariable.php';
require_once 'BaseRepository.php';

class variableIpcRipteAnualRepositorio
{

    public static function traerUltimaVariableIpcRipteAnual2()
{
    $interesAnual = null;
    try {
        $sql = "SELECT id_ipc AS idIpc, porc_int_ipc_ripte_anual AS porcIntIpcRipteAnual, fecha_ingreso_variable AS fechaIngresoVariable 
                        FROM variables_ipc_ripte_anual 
                        ORDER BY fecha_ingreso_variable DESC LIMIT 1";

        $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
        $sentencia->execute();
        $interesAnual = $sentencia->fetchObject("VariableIpcRipteAnual");

    } catch (PDOException $ex) {
        print 'ERROR' . $ex->getMessage();
        $interesAnual = null;
    }

    return $interesAnual;
}

    public static function traerUltimaVariableIpcRipteAnual()
    {
        $interesAnual = null;
        try {
            $sql = "SELECT P.id, P.id_variable as idVariable, P.porcentaje, P.fecha_ingreso as fecha
                    FROM porcentaje_de_variables as P
                    WHERE id_variable = 1
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
