<?php

class RegistroPago
{
    public $idRegistroDePago;
    public $idCompPorContrato;
    public $idContrato;
    public $tipoRegistroDePago;
    public $correspondienteMes;
    public $correspondienteAnio;
    public $valorAlquiler;
    public $valorExpensas;
    public $gastosAdministrativos;
    public $valorDeposito;
    public $cantCuotasDeposito;
    public $numCuotaAPagar;
    public $recibo;
    public $saldoPendiente;


    public function constructor($idRegistroDePago,$idCompPorContrato,$idContrato, $tipoRegistroDePago, $correspondienteMes, $correspondienteAnio, $valorAlquiler,  $valorExpensas, $gastosAdministrativos, $valorDeposito, $cantCuotasDeposito,$numCuotaAPagar, $recibo, $saldoPendiente)
    {
        $this->idRegistroDePago = $idRegistroDePago;
        $this->idCompPorContrato = $idCompPorContrato;
        $this->idContrato = $idContrato;
        $this->tipoRegistroDePago = $tipoRegistroDePago;
        $this->correspondienteMes = $correspondienteMes;
        $this->correspondienteAnio = $correspondienteAnio;
        $this->valorAlquiler = $valorAlquiler;
        $this->valorExpensas = $valorExpensas;
        $this->gastosAdministrativos = $gastosAdministrativos;
        $this->valorDeposito = $valorDeposito;
        $this->cantCuotasDeposito = $cantCuotasDeposito;
        $this->numCuotaAPagar = $numCuotaAPagar;
        $this->recibo = $recibo;
        $this->saldoPendiente = $saldoPendiente;

    }

}
