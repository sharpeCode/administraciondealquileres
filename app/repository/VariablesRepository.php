<?php
require_once '../entity/Variable.php';
require_once '../entity/PorcentajeDeVariable.php';
require_once 'BaseRepository.php';

class VariablesRepository
{
    public static function getAllVariables()
    {
        $inmuebles = null;
        try {
            $sql = "SELECT P.id, P.id_variable as idVariable, P.porcentaje, P.fecha_ingreso as fecha, 
                V.variable 
                    FROM porcentaje_de_variables as P
                    INNER JOIN variables as V 
                    ON P.id_variable = V.id_variable
                    ORDER BY fecha_ingreso DESC LIMIT 4";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $inmuebles = $sentencia->fetchAll(PDO::FETCH_CLASS, "PorcentajeDeVariable");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $inmuebles;
    }

    public static function getVariables()
    {
        $localidades = null;
        try {
            $sql = "SELECT id_variable AS idVariable, variable
                    FROM variables";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $localidades = $sentencia->fetchAll(PDO::FETCH_CLASS, "Variable");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $localidades;
    }

    public static function addVariable($PorcentajeDeVariable)
    {
        $inm = null;

        try {
            $sql = "INSERT INTO porcentaje_de_variables (id_variable, porcentaje, fecha_ingreso)
                    VALUES( :id_variable, :porcentaje, :fecha_ingreso)";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);

            $sentencia->bindParam(':id_variable', $PorcentajeDeVariable->idVariable, PDO::PARAM_INT);
            $sentencia->bindParam(':porcentaje', $PorcentajeDeVariable->porcentaje, PDO::PARAM_INT);
            $sentencia->bindParam(':fecha_ingreso', $PorcentajeDeVariable->fecha, PDO::PARAM_STR);

            $sentencia->execute();
            $inm = $sentencia->fetchObject("Variable");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $inm = null;
        }
        return $inm;
    }

    public static function getVariablesId($id)
    {
        $variableInteresPorDia = null;
        try {
            $sql = "SELECT P.id, P.id_variable as idVariable, P.porcentaje, P.fecha_ingreso as fecha, 
                V.variable 
                    FROM porcentaje_de_variables as P
                    INNER JOIN variables as V 
                    ON P.id_variable = V.id_variable
                    WHERE P.id_variable = $id
                    ORDER BY fecha_ingreso DESC LIMIT 1";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $variableInteresPorDia = $sentencia->fetchObject("PorcentajeDeVariable");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
            $variableInteresPorDia = null;
        }

        return $variableInteresPorDia;
    }


}
