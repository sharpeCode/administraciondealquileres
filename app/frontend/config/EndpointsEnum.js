var API = "http://administraciondealquileres.herokuapp.com";
//var API = "http://localhost:90/Sharp_Code/administracion_de_alquileres";
var BACKEND_CONTROLLERS = API + "/app/backend/controller";
var VOLVER_PAGE = API + "/app/frontend/pages";
var EndpointsEnum = {
    API: API,
    BACKEND_CONTROLLERS: BACKEND_CONTROLLERS,
    USER_PAGE: API + "/frontend/pages/locatarios/locatario.page.php",
    PROXY: API + "/Proxy.php",
    // Controllers
    CONTRATO: BACKEND_CONTROLLERS + "/ContratoController.php",
    REGISTRO_DE_PAGO: BACKEND_CONTROLLERS + "/RegistroDePagoController.php",
    COMPROBANTE_DE_PAGO: BACKEND_CONTROLLERS + "/ComprobanteDePagoController.php",
    CLIENTE: BACKEND_CONTROLLERS + "/ClienteController.php",
    INMUEBLE: BACKEND_CONTROLLERS + "/InmuebleController.php",
    LOCALIDAD: BACKEND_CONTROLLERS + "/LocalidadController.php",
    LOGIN: BACKEND_CONTROLLERS + "/LoginController.php",
    VARIABLES: BACKEND_CONTROLLERS + "/VariableController.php",

    VOLVER_CLIENTES: VOLVER_PAGE + "/clientes/cliente.page.php",
    VOLVER_CONTRATOS: VOLVER_PAGE + "/contratos/contrato.page.php",
    VOLVER_INMUEBLES: VOLVER_PAGE + "/inmuebles/inmueble.page.php",
    VOLVER_MENU_PRINCIPAL: VOLVER_PAGE + "/principal/menuPrincipal.page.php",
    VOLVER_VARIABLES: VOLVER_PAGE + "/variables/variable.page.php",





};




