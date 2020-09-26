<?php

//
//require_once '../../../repository/BaseRepository.php';
//
//$fechaHoy = date('Y-m-d');
//var_dump($fechaHoy);
//
//$salida_sql = $db_name.''.$fechaHoy.'.sql';
//
//$dump = "mysqldump -h$db_host -u$db_name -p$db_pass --opt $db_name > $salida_sql";
//
//system($dump, $output);

//https://www.youtube.com/watch?v=bNlX1ly56qQ


/**
 * Updated: Mohammad M. AlBanna
 * Website: MBanna.info
 */


//MySQL server and database
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "db_administracion_de_alquileres";
$tables = "*";
$port = "3306";


//function mysqli_connect ($host = '', $user = '', $password = '', $database = '', $port = '', $socket = '') {}
//Call the core function
backup_tables($dbhost, $dbuser, $dbpass, $dbname, $tables, $port);

//Core function
function backup_tables($dbhost, $dbuser, $dbpass, $dbname, $tables = '*', $port)
{
    echo 'holaaaaaaaaaaaaaaaaa ';
    $link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname, $port);

    // Check connection
    if (mysqli_connect_error()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        exit;
    }

    mysqli_query($link, "SET NAMES 'utf8'");

    //get all of the tables
    if ($tables == '*') {
        echo 'entro acaaaaaaaaaaaaaaaaa ';
        $tables = array();
        $result = mysqli_query($link, 'SHOW TABLES');
        while ($row = mysqli_fetch_row($result)) {
            $tables[] = $row[0];
        }
    } else {
        $tables = is_array($tables) ? $tables : explode(',', $tables);
    }

    $return = '';
    //cycle through
    foreach ($tables as $table) {
        $result = mysqli_query($link, 'SELECT * FROM ' . $table);
        $num_fields = mysqli_num_fields($result);
        $num_rows = mysqli_num_rows($result);

        $return .= 'DROP TABLE IF EXISTS ' . $table . ';';
        $row2 = mysqli_fetch_row(mysqli_query($link, 'SHOW CREATE TABLE ' . $table));
        $return .= "\n\n" . $row2[1] . ";\n\n";
        $counter = 1;

        //Over tables
        for ($i = 0; $i < $num_fields; $i++) {   //Over rows
            while ($row = mysqli_fetch_row($result)) {
                if ($counter == 1) {
                    $return .= 'INSERT INTO ' . $table . ' VALUES(';
                } else {
                    $return .= '(';
                }

                //Over fields
                for ($j = 0; $j < $num_fields; $j++) {
                    $row[$j] = addslashes($row[$j]);
                    $row[$j] = str_replace("\n", "\\n", $row[$j]);
                    if (isset($row[$j])) {
                        $return .= '"' . $row[$j] . '"';
                    } else {
                        $return .= '""';
                    }
                    if ($j < ($num_fields - 1)) {
                        $return .= ',';
                    }
                }

                if ($num_rows == $counter) {
                    $return .= ");\n";
                } else {
                    $return .= "),\n";
                }
                ++$counter;
            }
        }
        $return .= "\n\n\n";
    }

    //save file
    $fileName = 'db-backup-' . time() . '-' . (md5(implode(',', $tables))) . '.sql';
    $handle = fopen($fileName, 'w+');
    fwrite($handle, $return);
    if (fclose($handle)) {
        echo "Done, the file name is: " . $fileName;
        exit;
    }
}


