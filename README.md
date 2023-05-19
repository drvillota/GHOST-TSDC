# GHOST-TSDC

Bienvenido al repositorio del proyecto de automatización de pruebas de la aplicación GHOST-TSDC.

## Integrantes:
- [David Ruiz <dr.villota@uniandes.edu.co>](dr.villota@uniandes.edu.co)
- [Juan Jose Peña <jj.penad@uniandes.edu.co>](jj.penad@uniandes.edu.co)
- [Sebastian Moreno <sg.moreno1543@uniandes.edu.co>](sg.moreno1543@uniandes.edu.co)
- [Alvaro Salazar <ah.salazar@uniandes.edu.co>](ah.salazar@uniandes.edu.co)

## Wiki y Reporte de incidencias

> Wiki proyecto: [https://github.com/drvillota/GHOST-TSDC/wiki](https://github.com/drvillota/GHOST-TSDC/wiki) 

> Reporte de incidentes: [https://github.com/drvillota/GHOST-TSDC/issues](https://github.com/drvillota/GHOST-TSDC/issues) 

# Generacion de Datos
## Semana 7

En esta semana se utilizarán tres estrategias de generacion de datos: A Priori, Aleatoria y Pseudo Aleatoria.

Para el caso de la generacion A priori y pseudo aleatoria se realizara por medio de la API de Mockaroo. Debido a las restricciones de los navegadores para recibir informacion de origen cruzado (CORS) no se pueden recibir la respuesta de dicha API sin el uso de un proxy cors.
Se implementó un script para el uso de un proxy cors llamado `http-proxy-middleware` incluido en este proyecto.

Se crearon APIs para las entidades Staff (Members) Pages y Posts (Posts) y Tags. Se agrego uno adicional para el manejo del login y contraseña.
[Para Staff Members](https://my.api.mockaroo.com/login.json?key=af4f0e30)
[Para Posts y Pages](https://my.api.mockaroo.com/posts_schema.json?key=af4f0e30)
[Para Tags](https://my.api.mockaroo.com/tags_schema.json?key=af4f0e30)
[Para Login](https://my.api.mockaroo.com/login.json?key=af4f0e30)

 
## Instrucciones de instalacion y ejecucion:
### 1. Instalacion de las herramientas
 1. Clone este repositorio con `git clone https://github.com/drvillota/GHOST-TSDC.git`.
 2. Ingrese a la carpeta clonada: `cd GHOST-TSDC`.
 3. Ingrese a la carpeta de cypress: `cd cypress`.
 4. Recuerde descargar las dependencias de cypress ejecutando: `npm install`.
 5. Ahora ingrese a la carpeta del proxy cors: `cd ../http-proxy-middleware`.
 6. Ahora instale las dependencias del proxy: `npm install`.

### 2. Ejecucion del proxy CORS para Mockaroo
 1. Verifique que continua en la carpeta de `http-proxy-middleware`, sino dirijase a ella.
 2. Ejecute el proxy con: `node .\index.js`.
 3. Mantenga esta terminal abierta mientras se realiza la prueba. No cierre esta ventana ni detenga la aplicacion o no podrá recibir los datos provenientes de la API de Mockaroo.

### 3. Ejecucion de las pruebas en Cypress
 1. Abra otra terminal y dirijase a la carpeta donde clonó el proyecto `cd GHOST-TSDC`.
 2. Estando dentro de la carpeta clonada dirijase a la carpeta de cypress: `cd cypress`.
 4. Ejecute Cypress: `npx cypress open`.
 5. En la ventana emergente con el icono **CY** (Cypress) seleccione `E2E Testing`.
 6. Ahora seleccione el navegador a usar en las pruebas, en nuestro caso `Chrome`.
 7. Presione el boton `Start E2E Testing in Chrome`.
 8. En el Navegador Chrome emergente de clic en el enlace `Specs` del menu lateral izquierdo.
 9. Dirijase a la carpeta `cypress/e2e` y luego a `generacion-datos\ghost-3.41.1`
 10. Seleccione alguno de los archivos `*.spec.cy.js` para iniciar las pruebas.
 11. Verifique en el panel lateral izquierdo la ejecucion de las pruebas.
 12. Cierre la aplicacion Cypress con `file->exit` o en la terminal presionando `Control-C.`
 13. Por ultimo cierre la terminal donde esta ejecutandose `http-proxy-middleware`, o en su defecto presione `Control-C` para detener el proxy.

### Opcional: Revision de los screenshots de las pruebas
 1. Estando aun dentro de la carpeta de Cypress, ingrese a la carpeta screenshots: `cd cypress\screenshots`.
 2. Liste las carpetas con `ls` o con `dir`, alli observará las carpetas segun la estrategia de generacion de datos (apriori, aleatoria, pseudoaleatoria).
 3. Ahora ingrese a alguna de las carpetas, por ejemplo apriori: `cd apriori`.
 4. Ahora liste las subcarpetas ya que estan segun la hora y fecha en que se realizaron: `ls` `dir`.
 5. Ahora ingrese a la subcarpeta deseada con `cd subcarpeta` y liste los screenshots contenidos con `ls`o `dir` segun el sistema utilizado (Windows, Linux, MacOS).


# Pruebas E2E
## Semana 6
VRT
- Enlace al video
[Video](https://uniandes-my.sharepoint.com/:v:/r/personal/jj_penad_uniandes_edu_co/Documents/ANDES/MISO/Pruebas%20Automatizadas/Entrega%20Semana6/entrega6.mp4?csf=1&web=1&e=QXe2yB)



- Funcionalidades implementadas para la nueva version de Ghost

 | Funcionalidad  	|  Escenario/caso 	|  Tester Responsable 	|
|---	|---	|---	|
|  Gestión de usuarios 	|  Como usuario admin puedo actualizar la informacion un usuario 	|    Alvaro Salazar	|
|   	|  Como usuario admin puedo suspender otro usuario 	|  Alvaro Salazar 	|
|   	|   Como usuario admin puedo reactivar (un-suspend) otro usuario	|  Alvaro Salazar 	|
|   	|   Como usuario admin puedo cambiar la constraseña otro usuario	|   Alvaro Salazar	|
|  Gestion de diseño  	|   Como usuario puedo crear un item de navegacion	|  Alvaro Salazar 	|
|  Gestion de paginas 	|   Como usuario puedo publicar una pagina	|  Juan Jose Peña 	|
|   	| Como usuario crear una pagina programada  	|  Juan Jose Peña 	|
|   	|   Como usuario puedo actualizar una pagina	|   Juan Jose Peña	|
|   	|   Como usuario puedo revertir a draft una pagina	|   Juan Jose Peña	|


Pros y contras: [Resemble y Backstop](https://github.com/drvillota/GHOST-TSDC/wiki/Analisis-de-Herramientas-Semana-6)

Incidentes de regresión visual se pueden encontrar en los issues de este repositorio

Cypress

### Ejecucion de Cypress
 1. Clone o descargue la aplicacion Cypress
 2. Recuerde ejecutar `npm install` y dirijase a la carpeta `cypress/e2e`
 3. Copie los archivos `.spec.cy.js` dentro de la carpeta `e2e` de un proyecto Cypress.
 4. Realice la ejecucion con `npx cypress run` o con `.\node_modules\.bin\cypress.cmd run`

Kraken

 ### Ejecucion de Kraken
 1. Para la ejecucion de las pruebas de Kraken primero debe tener instalada la herramienta kranken-node.
 2. Recuerde ejecutar `npm install`
 3. Dirijase a la carpeta kraken/features y mueva los archivos features a una carpeta temporal en su computador.
 4. Copie el archivo .feature seleccionado a la carpeta de instalacion de kraken. Ejemplo: `/kraken-node/features`
 5. Copie ahora las definiciones de step que estan en la carpeta `kraken/features/web/step_definitions` a la carpeta de instalacion de kraken: Ejemplo: `/kraken-node/features/web/step_definitions`
 6. Ingrese a la carpeta de kraken: `cd kraken_node`
 7. Ejecute la prueba: Ejemplo: `.\node_modules\.bin\kraken-node.cmd run`

Ejecución VRT

Instrucciones para las pruebas
Ubicarse en la carpeta vrt_ypress
Ejecutar el comando
```npm install```
Posteriormente:
```node index.js```
Se obtendra una carpeta ```./results```  con las comparaciones de las imagenes de cada paso


 ## Semana 5
-  [Pros & Cons de Kraken](https://github.com/alvaro-salazar/-reporte-incidencias-ghost/wiki/Comparativa-Kraken)
-  [Pros & Cons de Cypress](https://github.com/alvaro-salazar/-reporte-incidencias-ghost/wiki/Comparativa-Cypress)
 
 ## Instrucciones de ejecucion
 ### Ejecucion de Kraken
 1. Para la ejecucion de las pruebas de Kraken primero debe tener instalada la herramienta kranken-node.
 2. Recuerde ejecutar `npm install`
 3. Dirijase a la carpeta kraken/features y mueva los archivos features a una carpeta temporal en su computador.
 4. Copie el archivo .feature seleccionado a la carpeta de instalacion de kraken. Ejemplo: `/kraken-node/features`
 5. Copie ahora las definiciones de step que estan en la carpeta `kraken/features/web/step_definitions` a la carpeta de instalcion de kraken: Ejemplo: `/kraken-node/features/web/step_definitions`
 6. Ingrese a la carpeta de kraken: `cd kraken_node`
 7. Ejecute la prueba: Ejemplo: `.\node_modules\.bin\kraken-node.cmd run`
 
 
Kraken tiene algunas limitaciones en cuanto a la ejecución de features, lo que significa que no es posible ejecutar todos los features en una sola ejecución. Para evitar este problema, se deben mover los features que no se desean ejecutar actualmente a la carpeta feature_files y dejar el feature que se quiera probar en la carpeta features de la carpeta donde esta instalado Kraken-Node.
 
 
 ### Ejecucion de Cypress
 1. Clone o descargue la aplicacion Cypress
 2. Recuerde ejecutar `npm install` y dirijase a la carpeta `cypress/e2e`
 3. Copie los archivos `.spec.cy.js` dentro de la carpeta `e2e` de un proyecto Cypress.
 4. Realice la ejecucion con `npx cypress run` o con `.\node_modules\.bin\cypress.cmd run`
 
 
 ## Distribucion de escenarios de prueba
 
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