<?php

class ComprobanteDePago
{
    public $idComprobanteDePago;
    public $numeroComprobante;
    public $tipoComprobanteDePago;
    public $tipoRecibo;
    public $fechaComprobante;
    public $idRegistroDePago;
    public $idContrato;
    public $correspondienteMes;
    public $correspondienteAnio;
    public $valorAlquiler;
    public $valorExpensas;
    public $valorGastosAdm;
    public $valorDeposito;
    public $cantCuotasDeposito;
    public $numCuotaAPagar;
    public $interesPorMora;
    public $otrosConceptos;
    public $saldoAnterior;
    public $totalImporteAPagar;
    public $totalImporteRecibido;
    public $saldoPendiente;
    public $saldoPendienteSinModificar;
    public $estado;



    public function constructor($idComprobanteDePago,$numeroComprobante, $tipoComprobanteDePago, $tipoRecibo, $fechaComprobante, $idRegistroDePago, $idContrato, $correspondienteMes,
                                $correspondienteAnio, $valorAlquiler, $valorExpensas, $valorGastosAdm, $valorDeposito, $cantCuotasDeposito, $numCuotaAPagar, $interesPorMora, $otrosConceptos,
                                $saldoAnterior, $totalImporteAPagar, $totalImporteRecibido, $saldoPendiente, $saldoPendienteSinModificar, $estado)
    {
        $this->idComprobanteDePago = $idComprobanteDePago;
        $this->numeroComprobante = $numeroComprobante;
        $this->tipoComprobanteDePago = $tipoComprobanteDePago;
        $this->fechaComprobante = $fechaComprobante;
        $this->tipoRecibo = $tipoRecibo;
        $this->idRegistroDePago = $idRegistroDePago;
        $this->idContrato = $idContrato;
        $this->correspondienteMes = $correspondienteMes;
        $this->correspondienteAnio = $correspondienteAnio;
        $this->valorAlquiler = $valorAlquiler;
        $this->valorExpensas = $valorExpensas;
        $this->valorGastosAdm = $valorGastosAdm;
        $this->valorDeposito = $valorDeposito;
        $this->cantCuotasDeposito = $cantCuotasDeposito;
        $this->numCuotaAPagar = $numCuotaAPagar;
        $this->interesPorMora = $interesPorMora;
        $this->otrosConceptos = $otrosConceptos;
        $this->saldoAnterior = $saldoAnterior;
        $this->totalImporteAPagar = $totalImporteAPagar;
        $this->totalImporteRecibido = $totalImporteRecibido;
        $this->saldoPendiente = $saldoPendiente;
        $this->saldoPendienteSinModificar = $saldoPendienteSinModificar;
        $this->estado = $estado;

    }

}
