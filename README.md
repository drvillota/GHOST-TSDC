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
- [Para Staff Members](https://my.api.mockaroo.com/members_schema.json?key=af4f0e30)
- [Para Posts y Pages](https://my.api.mockaroo.com/posts_schema.json?key=af4f0e30)
- [Para Tags](https://my.api.mockaroo.com/tags_schema.json?key=af4f0e30)
- [Para Login](https://my.api.mockaroo.com/login.json?key=af4f0e30)

 
## Instrucciones de instalacion y ejecucion
En esta ocasion se ejecutara Ghost 3.41.1 instalado en el localhost para tener a facilidad de reiniciarlo en caso de que haya un bloqueo por defecto del numero de logins en una hora (100 veces en una hora). Verifique la ejecucion de Ghost antes de realizar las pruebas.

### 0. Preparacion del Ghost
 1. Instale Ghost como contenedor docker version 3.41.1 por ejemplo en el entorno linux: `sudo docker create --name mi-ghost -p 2368:2368 ghost:3.41.1`
 2. Abra el navegador y confirme la creacion de un nuevo usuario con los siguientes datos **email**: `lasherone@hotmail.com` **password**: `Pruebas12345`

### 1. Instalacion de las herramientas de prueba y del proxy CORS
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
 9. Dirijase a la carpeta `cypress/e2e` y luego a `generacion-datos`
 10. Seleccione alguna de las carpetas segun la estrategia de generacion de datos (por ejemplo `a-priori`) y busque alguno de los archivos `*.spec.cy.js` para iniciar las pruebas.
 11. Verifique en el panel lateral izquierdo la ejecucion de las pruebas. Espere a que terminen las pruebas. En caso de error por numero de logins en 1 hora debera reiniciar el servidor Ghost.
 12. Cierre la aplicacion Cypress con `file->exit` o en la terminal presionando `Control-C.`
 13. Por ultimo cierre la terminal donde esta ejecutandose `http-proxy-middleware`, o en su defecto presione `Control-C` para detener el proxy.

### Opcional: Revision de los screenshots de las pruebas
 1. Estando aun dentro de la carpeta de Cypress, ingrese a la carpeta screenshots: `cd cypress\screenshots`.
 2. Liste las carpetas con `ls` o con `dir`, alli observará las carpetas segun la estrategia de generacion de datos (apriori, aleatoria, pseudoaleatoria).
 3. Ahora ingrese a alguna de las carpetas, por ejemplo apriori: `cd apriori`.
 4. Ahora liste las subcarpetas ya que estan segun la hora y fecha en que se realizaron: `ls` `dir`.
 5. Ahora ingrese a la subcarpeta deseada con `cd subcarpeta` y liste los screenshots contenidos con `ls`o `dir` segun el sistema utilizado (Windows, Linux, MacOS).

### Listado de escenarios

- Descripción de las estrategias usadas
    - *Generación de datos de prueba apriori (Apriori Test Data Generation)*
        Esta estrategia de generación de datos se basa en un análisis previo de los requisitos y las especificaciones del sistema. Se utilizan conocimientos previos para definir conjuntos específicos de datos de prueba que se consideran relevantes y representativos de los casos de uso esperados.
        Para esta generacion usamos APIs de Mockaroo diseñados especificamente usando el modelo de dominio de la aplicacion. Seleccionamos con anterioridad uno de los datos del **data pool**.
    - *Generación de datos de prueba pseudoaleatorios (Pseudo-Random Test Data Generation)*
        Esta estrategia se basa en algoritmos que generan datos de prueba de manera pseudoaleatoria. Aunque los datos no son realmente aleatorios, siguen un patrón predefinido y son deterministas en función de una semilla o valor de inicio.
        Para esta generacion usamos APIs de Mockaroo diseñados especificamente usando el modelo de dominio de la aplicacion. Seleccionamos aleatoriamente uno de los registros del **data pool**.
    - *Generación de datos de prueba aleatorios (Random Test Data Generation)*
        En esta estrategia, los datos de prueba se generan de manera completamente aleatoria, sin seguir ningún patrón predefinido. Se utilizan técnicas como la generación de números aleatorios para generar valores de prueba sin ninguna restricción específica. 

- Integracion de las estrategias en los escenarios de pruebas

| Escenario        | Generacion a-priori | Generacion Pesudoaleatoria | Generacion aleatoria |
| --------------- | -------- | -------- | -------- |
|1. Ingresar Random email & password|x|x|x|
|2. Ingresar Valid email & Random password|x|x|x|
|3. Ingresar Random email & Naughty password|x|x|x|
|4. Ingresar Random email & Empty password|x|x|x|
|5. Ingresar Empty email & random password|x|x|x|
|6. Ingresar Valid email & invalid kanji password|x|x|x|
|7. Ingresar Naughty email & random password|x|x|x|
|8. Ingresar Empty email & Naughty password|x|x|x|
|9. Ingresar Valid email & Naughty password|x|x|x|
|10. Ingresar Naughty email & Valid password|x|x|x|
|11. Crear Post con titulo aleatorio|x|x|x|
|12. Crear Post con titulo naughty|x|x|x|
|13. Crear Post con titulo valido|x|x|x|
|14. Crear Post con titulo de mas de 255 caracteres|x|x|x|
|15. Crear Post con excerpt mayor a 300 caracteres|x|x|x|
|16. Crear Post con titulo URL|x|x|x|
|17. Crear Page con titulo aleatorio|x|x|x|
|18. Crear Page con titulo naughty|x|x|x|
|19. Crear Page con titulo valido|x|x|x|
|20. Crear Page con titulo de mas de 255 caracteres|x|x|x|
|21. Crear Page con excerpt mayor a 300 caracteres|x|x|x|
|22. Crear Page con titulo URL|x|x|x|
|23. Crear Tag name aleatorio|x|x|x|
|24. Crear Tag con name naughty|x|x|x|
|25. Crear Tag con name valido|x|x|x|
|26. Crear Tag con name URL|x|x|x|
|27. Crear Tag con name email|x|x|x|
|28. Crear Tag con name Date|x|x|x|
|29. Crear Tag con texto mayor a 191 caracteres|x|x|x|
|30. Crear Tag con name valido y Description mayor a 500 caracteres|x|x|x|
|31. Crear Tag con name valido y Description naughty|x|x|x|
|32. Crear Tag con Slug naughty |x|x|x|
|33. Crear Tag con Slug texto con espacios|x|x|x|
|34. Crear Tag con Slug extenso|x|x|x|
|35. Crear Tag con Slug valido|x|x|x|
|36. Crear Staff user con email aleatorio valido|x|x|x|
|37. Crear Staff user con email naughty|x|x|x|
|38. Crear Staff user con email extenso|x|x|x|
|39. Crear Staff user con email duplicado|x|x|x|
|40. Crear Staff user con email URL|x|x|x|

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