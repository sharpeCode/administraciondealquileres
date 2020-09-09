<?php

session_start();                       //la sesión ya está iniciada, no hará nada.
unset($_SESSION["user"]);              //libera la variable de sesión registrada
session_destroy();                     // libera la sesión actual, elimina cualquier dato de la sesión
header('location:../../../../index.php');
exit;
