<?php
require_once '../entity/Mes.php';
require_once 'BaseRepository.php';

class MesRepositorio
{

    public static function buscarIdMes($nombreMes)
    {
        $mes = null;
        try {
            $sql = "SELECT id_mes AS idMes, mes_largo AS mesLargo, mes_corto AS mesCorto
                        FROM meses 
                        WHERE mes_corto = '$nombreMes' ";

            $sentencia = BaseRepository::getBaseRepository()->prepareQuery($sql);
            $sentencia->execute();
            $mes = $sentencia->fetchObject("Mes");

        } catch (PDOException $ex) {
            print 'ERROR' . $ex->getMessage();
        }

        return $mes;
    }

}
