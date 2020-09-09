<?php
require_once '../../repository/LoginRepositorio.php';
require_once '../entity/Login.php';
require_once '../entity/Cliente.php';

$action = $_POST['action'];

switch ($action) {
    case "validar":
        validar($_POST['datosLogin']);
        break;
    case "ingresar":
        ingresar($_POST['datosCorrectos']);
        break;
    default:
        echo "NO SE QUE HACER VIEJA";
        break;
}

function validar($datosLogin){

    if(isset($_SESSION['user'])) {


        $datosLoginObject = (object)$datosLogin;  // Si no casteo no lo paso de array a objeto y no lo puedo usar
        $dni = $datosLoginObject->dni;
        $pass = $datosLoginObject->password;

        if ($dni == "" || $pass == "") {
            echo "ERROR1";
        } else {
            $datosUsuario = UserRepository::traerUsuarioPorDni($dni);

            if ($datosUsuario != null) {
                echo json_encode($datosUsuario);
            } else {
                echo "ERROR2"; //el usuario o contraseña son incorrectos
            }
        }

    }else{
        echo "ERROR3";
    }
}

function ingresar($datosCorrectos){
    $datosLoginObject = (object)$datosCorrectos;  // Si no casteo no lo paso de array a objeto y no lo puedo usar
    $dni = $datosLoginObject->dni;

    $datosUsuario = UserRepository::traerUsuarioPorDni($dni);

    $rol = $datosUsuario->idRol;
    $password = $datosUsuario->password;
    $estado = $datosUsuario->estado;
    /* 1-Administrador, 2-Alumno, 3-Profesor*/

    SESSION_START();
    $_SESSION['user'] = $dni;
    $_SESSION['pass'] = $password;
    $_SESSION['rol'] = $rol;
    $_SESSION['estado'] = $estado;

    if(isset($_SESSION['user'])){
        if(isset($_SESSION['user']) && isset($_SESSION['pass'])){

            if($_SESSION['estado'] == "Activo"){
                if($rol == 1){
                    echo "Administrador";
                }elseif ($rol == 2){
                    echo "Alumno";
                }elseif ($rol == 3){
                    echo "Profesor";
                }
            }else{
                echo 'ERROR3'; //usuario Inactivo
            }

        }
    }
}

