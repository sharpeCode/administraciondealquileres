<?php

class Login
{
    public $dni;
    public $contrasenia;

    public function constructor($dni, $contrasenia)
    {
        $this->dni = $dni;
        $this->contrasenia = $contrasenia;
    }

}