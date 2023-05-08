# GHOST-TSDC

Bienvenido al repositorio del proyecto de automatización de pruebas de la aplicación GHOST-TSDC.

> Wiki proyecto: [https://github.com/drvillota/GHOST-TSDC/wiki](https://github.com/drvillota/GHOST-TSDC/wiki) 

> Reporte de incidentes: [https://github.com/drvillota/GHOST-TSDC/issues](https://github.com/drvillota/GHOST-TSDC/issues) 

# Pruebas E2E
 
 ## Semana 5
-  [Pros & Cons de Kraken](https://github.com/alvaro-salazar/-reporte-incidencias-ghost/wiki/Comparativa-Kraken)
-  [Pros & Cons de Cypress](https://github.com/alvaro-salazar/-reporte-incidencias-ghost/wiki/Comparativa-Cypress)
 
 ## Instrucciones de ejecucion
 ### Ejecucion de Kraken
 1. 
 2. 
 3.
 
Kraken tiene algunas limitaciones en cuanto a la ejecución de features, lo que significa que no es posible ejecutar todos los features en una sola ejecución. Para evitar este problema, se deben mover los features que no se desean ejecutar actualmente a la carpeta feature_files y dejar el feature que se quiera probar en la carpeta features de la carpeta donde esta instalado Kraken-Node.
 
 
 ### Ejecucion de Cypress
 1.
 2. 
 3.
 
 Distribucion de escenarios de prueba
 
 | Funcionalidad  	|  Escenario/caso 	|  Tester Responsable 	|
|---	|---	|---	|
|  Gestión de contenido 	| Como usuario puedo publicar un post  	|  David Ruiz 	|
|   	|   Como usuario puedo crear un draft	|  David Ruiz 	|
|   	|   Como usuario puedo crear un post scheduled (programada)	|  David Ruiz 	|
|   	|   Como usuario puedo actualizar un post	|  David Ruiz 	|
|  Gestión de usuarios 	|  Como usuario admin puedo actualizar la informacion un usuario 	|    Alvaro Salazar	|
|   	|  Como usuario admin puedo suspender otro usuario 	|  Alvaro Salazar 	|
|   	|   Como usuario admin puedo reactivar (un-suspend) otro usuario	|  Alvaro Salazar 	|
|   	|   Como usuario admin puedo cambiar la constraseña otro usuario	|   Alvaro Salazar	|
|  Gestion de paginas 	|   Como usuario puedo publicar una pagina	|  Juan Jose Peña 	|
|   	| Como usuario crear una pagina programada  	|  Juan Jose Peña 	|
|   	|   Como usuario puedo actualizar una pagina	|   Juan Jose Peña	|
|   	|   Como usuario puedo revertir a draft una pagina	|   Juan Jose Peña	|
|  Gestion de tags 	|  Como usuario puedo publicar un tag 	|  Sebastian Moreno 	|
|   	|  Como usuario puedo publicar un internal tag 	|  Sebastian Moreno 	|
|   	|   Como usuario puedo actualizar un tag	|  Sebastian Moreno 	|
|   	|   Como usuario puedo actualizar un internal tag	|  Sebastian Moreno 	|
|  Gestion de diseño  	|   Como usuario puedo crear un item de navegacion	|  Alvaro Salazar 	|
|    	|  Como usuario puedo eliminar un item de navegacion 	|   Juan Jose Peña	|
|    	|   Como usuario puedo crear un item secundario de navegacion	|   Sebastian Moreno 	|
|    	|  Como usuario puedo actualizar un item de navegacion 	|  David Ruiz 	|
