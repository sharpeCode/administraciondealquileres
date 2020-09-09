<?php


class PaymentsMapper
{
    //voy a tomar el retorno de un usuario ingresado correctamente para procesar el guardado en la tabla pagos
    public static function mapInsertUsuarioPayment (Usuario $user)
    {
        $dni = $user->dni;
        $monto = 0.00;
        $estado = "Adeuda";
        $fechaDeIngreso = $user->fechaIngreso;
        $corresponde_mes = substr($fechaDeIngreso, -5,2);
        $corresponde_anio = substr($fechaDeIngreso, -10,4);

        $pay = new Facturacion();
       // $pay->constructor($dni, $monto, $estado, $fechaDeIngreso, $corresponde_mes, $corresponde_anio);

        return $pay;

    }

    public static function map(Usuario $user, $payments)
    {
       // UserPaymentDto $dto = new UserPaymentDto();

        $dto->userName = $user->nombreCompleto;
        $dto->dni = $user->dni;
        $dto->estado = "estado";


        return $dto;
    }
}