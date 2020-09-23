<?php

class BaseRepository
{
    // Singleton
    private static $BaseRepository;
    private PDO $connection;

    private function __construct()
    {
        try {
	     //  -- PARA LA CONEXION AL HOSTING
//             $this->connection = new PDO('mysql:host=us-cdbr-east-02.cleardb.com;dbname=heroku_0852b66c3d788ad;charset=utf8;charset=utf8',
//                'bc2dc009f0f85e', '052bcdbe',
//                array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	     //   --------------------------------------------------------------------------------------------------------
	
//	       -- PARA LA CONEXION LOCAL
            $this->connection = new PDO('mysql:host=localhost;dbname=db_administracion_de_alquileres;charset=utf8',
                'root', '',
                array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
         //   --------------------------------------------------------------------------------------------------------
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