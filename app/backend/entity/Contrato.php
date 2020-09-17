<?php

class Contrato
{
    public $idContrato;
    public $fechaInicio;
    public $fechaFin;
    public $dni;
    public $idInmueble;
    public $valorAlquilerOficial;
    public $valorAlquilerNoOficial;
    public $valorExpensas;
    public $gastosAdministrativos;
    public $valorDeposito;
    public $cantCuotasDeposito;
    public $fechaPagoInicio;
    public $fechaPagoFin;
    public $estado;


    public function constructor($idContrato,$fechaInicio, $fechaFin, $dni,$idInmueble,$valorAlquilerOficial,$valorAlquilerNoOficial,$valorExpensas,$gastosAdministrativos,$valorDeposito,$cantCuotasDeposito,$fechaPagoInicio,$fechaPagoFin,$estado)
    {
        $this->idContrato = $idContrato;
        $this->fechaInicio = $fechaInicio;
        $this->fechaFin = $fechaFin;
        $this->dni = $dni;
        $this->idInmueble = $idInmueble;
        $this->valorAlquilerOficial = $valorAlquilerOficial;
        $this->valorAlquilerNoOficial = $valorAlquilerNoOficial;
        $this->valorExpensas = $valorExpensas;
        $this->gastosAdministrativos = $gastosAdministrativos;
        $this->valorDeposito = $valorDeposito;
        $this->cantCuotasDeposito = $cantCuotasDeposito;
        $this->fechaPagoInicio = $fechaPagoInicio;
        $this->fechaPagoFin = $fechaPagoFin;
        $this->estado = $estado;

    }

}
