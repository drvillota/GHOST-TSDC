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