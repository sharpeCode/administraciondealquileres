<?php

class BaseRepository
{
    // Singleton
    private static $BaseRepository;
    private PDO $connection;

    private function __construct()
    {
        try {
            /* $this->objetoPDO = new PDO('mysql:host=localhost;dbname=u498579747_estac;charset=utf8', 'u498579747_estac', 'estacionamiento', array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)); */

            $this->connection = new PDO('mysql:us-cdbr-east-02.cleardb.com;dbname=dadministraciondealquileresDB;charset=utf8',
                'bc2dc009f0f85e', '052bcdbe',
                array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage();
            die();
        }
    }

    public function prepareQuery($sql)
    {
        return $this->connection->prepare($sql);
    }

    public function getLastInsertedId()
    {
        return $this->connection->lastInsertId();
    }

    public static function getBaseRepository()
    {
        if (!isset(self::$BaseRepository)) {
            self::$BaseRepository = new BaseRepository();
        }
        return self::$BaseRepository;
    }

    // Evita que el objeto se pueda clonar
    public function __clone()
    {
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR);
    }
}

?>