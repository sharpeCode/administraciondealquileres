<nav class="navbar navbar-default navbar-static-top">
    <!--div es de divisor, con esto ya tenemos nuestro contenedor -->
    <div id="navbarPrincipal" class="container-fluid" style="background-color: white;">
        <!-- class="container" se veria con mas margen en los costador, class="container-fluid" los margenes desaparecen y expande la pagina a todo el ancho de la pantalla -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                <!--span es para colocar un parrafo corto -->
                <span class="sr-only">este boton despliega la barra de navegacion</span>
                <!--y para que el boton se forme necesitamos poner lo siguiente -->
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- PARA IR A LA PAGINA LOGIN-->
            <a class="navbar-brand" href="../../../frontend/pages/login/login.page.php"><span class="glyphicon glyphicon-home"
                                                                       aria-hidden="true"></span></a>
        </div>
        <!--el id="navbar" es para cuando la pantalla se achique que aparezcan los nombres detras de las barras (icono) -->
        <div id="navbar" class="navbar-collapse collapse">

            <!-- ICONOS PARA SALIR-->
            <ul class="nav navbar-nav navbar-right">
                <li><a href="app/frontend/pages/contact/PaginaDeConsultas.php">
                        <span class="glyphicon glyphicon-off"
                              aria-hidden="true"></span>
                        Salir
                    </a>
                </li>
            </ul>

        </div>
    </div>
</nav>