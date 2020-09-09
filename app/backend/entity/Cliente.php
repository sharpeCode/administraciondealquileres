<?php

class Cliente
{
    public $dni;
    public $nombres;
    public $apellidos;
    public $celular;
    public $email;
    public $fechaNacimiento;
    public $datosGarante;
    public $domicilioLegal;
    public $estado;


    public function constructor($dni, $nombres, $apellidos, $celular, $email,  $fechaNacimiento, $datosGarante, $domicilioLegal, $estado)
    {
        $this->dni = $dni;
        $this->nombres = $nombres;
        $this->apellidos = $apellidos;
        $this->celular = $celular;
        $this->email = $email;
        $this->fechaNacimiento = $fechaNacimiento;
        $this->datosGarante = $datosGarante;
        $this->domicilioLegal = $domicilioLegal;
        $this->estado = $estado;

    }

}
