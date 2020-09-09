<?php

class ArmadoRegistroPagoParaConfeccionar
{
    public $numeroComprobante;
    public $idRegistroDePago;
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

    public $subTotal;
    public $interesPorMora;
    public $diasMora;
    public $otrosConceptos;
    public $saldoAnterior;
    public $totalImporteAPagar;
    public $totalImporteRecibido;
    public $saldoPendiente;


    public $recibo;
    public $mesLargo;
    public $mesCorto;
    public $dni;
    public $idInmueble;
    public $nombres;
    public $apellidos;
    public $tipo; //particular - comercial
    public $torre;
    public $piso;
    public $departamento;
    public $domicilio;
    public $localidad;
    public $cp;
    public $nombrePais;



    public function constructor($numeroComprobante,$idRegistroDePago, $idContrato, $tipoRegistroDePago, $correspondienteMes, $correspondienteAnio,
                                $valorAlquiler, $valorExpensas, $gastosAdministrativos, $valorDeposito, $cantCuotasDeposito, $numCuotaAPagar, $subTotal,
                                $interesPorMora, $diasMora, $otrosConceptos, $totalImporteAPagar, $totalImporteRecibido, $saldoAnterior, $recibo, $mesLargo,
                                $mesCorto, $dni, $idInmueble, $nombres, $apellidos, $tipo, $torre, $piso, $departamento, $domicilio, $localidad, $cp, $nombrePais)
    {
        $this->numeroComprobante = $numeroComprobante;
        $this->idRegistroDePago = $idRegistroDePago;
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
        $this->subTotal = $subTotal;
        $this->interesPorMora = $interesPorMora;
        $this->diasMora = $diasMora;
        $this->otrosConceptos = $otrosConceptos;
        $this->totalImporteAPagar = $totalImporteAPagar;
        $this->totalImporteRecibido = $totalImporteRecibido;
        $this->saldoAnterior = $saldoAnterior;
        $this->recibo = $recibo;
        $this->mesLargo = $mesLargo;
        $this->mesCorto = $mesCorto;
        $this->dni = $dni;
        $this->idInmueble = $idInmueble;
        $this->nombres = $nombres;
        $this->apellidos = $apellidos;
        $this->tipo = $tipo;
        $this->torre = $torre;
        $this->piso = $piso;
        $this->departamento = $departamento;
        $this->domicilio = $domicilio;
        $this->localidad = $localidad;
        $this->cp = $cp;
        $this->nombrePais = $nombrePais;

    }

}
