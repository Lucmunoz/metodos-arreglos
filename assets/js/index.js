/* Como exige el desafío se incluyen al menos 3 tareas para que s muesren en la pagina web */

let tareas = [
    {
        id: 1,
        descripción: 'Ir al supermercado. Recordar comida para el perro.',
        state: 'No iniciada'
    },
    {
        id: 2,
        descripción: 'Estudiar javascript. Aclarar conceptos de variables y funciones',
        state: 'En desarrollo'
    },
    {
        id: 3,
        descripción: 'Desarrollar el desafío de Métodos y Arreglos',
        state: 'En desarrollo'
    },
    {
        id: 4,
        descripción: 'Separar ropa para ir a dejar a la lavandería',
        state: 'No iniciada'
    }
]

/*  El desafío no hace mayores menciones a la forma en que se debe asignar la ID de cada tarea. Se asumirá entonces una asignación unica y correlativa.
    por lo que establecemos una variable contador cuyo valor inicial será el valor del arreglo de tareas +1. IMPORTANTE. se asume que la asignación de una ID
    es para siempre, es decir, no se recuperan las ID de una tarea finalizada y/o eliminada. Esto dependerá de como se aborde una "to do list" en algunos casos
    el ID es irrelevante ya que actua mas bien para representar de una forma ordenada una lista de tareas PERO en este caso, el desafío lo considera como la 
    "forma" de localizar rápidamente un determinado elemento del objeto para realizar una acción en particular.
    */

let contadorId = tareas.length+1;

/*  Referencias a elementos del DOM. */
const $BtnAgregar = document.getElementById("button-element");
$BtnAgregar.addEventListener("click",InputRead);

const $InputTarea = document.getElementById("input-element");
const $SummaryContainer = document.getElementById("summary-container");
const $TaskTable = document.getElementById("task-table");

/*  Al cargar la pagina, llamamos a las funciones que muestran en pantalla lo siguiente: */
ShowList(tareas)        // Funcion que se encarga de recorrer el arreglo y mostrar en pantalla las distintas tareas.
UpdateAndShowTotals();  // Funcion que se encarga de recorrer el arreglo y calcular los valores para cada tipo de tarea: "No iniciada" "En proceso" y/o "Finalizada"



/*  A continuación se presenta el desarrollo de la función que se encarga de capturar la tarea ingresada por el usuario en el cuadro de texto, incorporar esta tarea a
    un objeto temporal y añadir posteriormente este objeto al final del arreglo tareas. 
    
    Se realiza en primer lugar una verificacion simple para ver si el cuadro de texto está o no vacío. Si está vacío se emite una alerta que solicita al usuario que se
    ingrese alguna tarea y la función termina su ejecución.
    
    Si el cuadro de texto tiene algun texto válido, se crea un objeto temporal cuyas keys o propiedades se van completando como siguie:
        - id: se asigna el valor correlativo de id haciendo uso de la variable global contadorId.
        - descripción: se asigna el texto ingresado por el usuario.
        - state: según sugiere el desafío se inician las tareas con un estado "false" En este caso, se trabajará con una forma de "todo list" algo distinta, ya que 
            se considera un select box con distitnos estados. Mas que true o false, el programa trabaja analizando 3 estados para cada tarea.
                - No iniciada
                - En progreso
                - Finalizada

    Una vez que el objeto temporal está creado, se llama a las funciones encargadas de actualizar valores de resumen y mostrar las tareas en pantalla.
*/
function InputRead (){

    let tareaTemp =$InputTarea.value;

    if(tareaTemp===""){
        alert("No has escrito ninguna tarea. Recuerde considerar una descripción adecuada.");
        return;
    }
    else{

        const tempObject ={
            id: contadorId,
            descripción: tareaTemp,
            state: 'No iniciada'
        }

        tareas.push(tempObject);
        contadorId++;
        $InputTarea.value = "";
        ShowList(tareas)
        UpdateAndShowTotals()
    }
}

/*  El desafío solicita contar el total de tareas a modo de resumen. En nuestro, caso se mostraran los valores de cada tipo de tarea. Es decir, muestra el total de tareas
    no iniciadas,el total de tareas en desarrollo y el numero de tareas finalizadas PERO que no hayan sido eliminadas. Esto pues al eliminar una tarea finalizada, esta
    se elimina del array(a fin de atender lo solicitado en el desafío) por tanto ya no se contabiliza. Lo que debiera hacerse en estricto rigor, es considerar un historico 
    de todas las tareas eliminadas pero, nuevamente, depende de como se aborda una todo list.

    A fin de mostrar los totales, se recorre el arreglo principal tareas y se va incrementando cada contador según sea el tipo de estado de desarrollo de la tarea.

    Luego de esto, teniendo los totales, se crea un literal template el cual se inyecta al DOM mediante innerHTML.
 */
function UpdateAndShowTotals(){

    let NotStartedCounter = 0;
    let InprogressCounter = 0;
    let FinishedTasks= 0;

    for (let objeto of tareas){
    
        if( objeto.state === "No iniciada"){
            NotStartedCounter++;
        }else if(objeto.state === "En desarrollo"){
            InprogressCounter++;
        }else if(objeto.state === "Finalizada"){

           FinishedTasks++;
           
        }
    }

    let SummaryTemplate =   `
                            <span style='font-size:18px'>Tareas no Iniciadas: ${NotStartedCounter} </span>
                            <span style='font-size:18px'>Tareas en Desarrollo: ${InprogressCounter} </span>
                            <span style='font-size:18px'>Tareas Finalizadas: ${FinishedTasks} </span>
                            `
    $SummaryContainer.innerHTML = SummaryTemplate
}

/*  La siguiente función se encarga de mostrar cada una de las tareas en el DOM como un listado ordenado, para lo cual se utiliza una tabla como plantilla general. 

    Para lograr esto, se recorre el arreglo principal de tareas y se completa un literal template en donde añadiremos expresiones entre ${} (interpolación) para inyectar
    los datos id, descripción y estado de cada tarea al DOM. 
    
    Un punto importante es que como el ESTADO de cada tarea se definirá mediante un elemento "select", definimos una función llamada "ShowState". Esta función nos permitirá
    obtener la "porción" de codigo adecuada, según sea el estado de la tarea a proyectar en el DOM.
    
    Así, el literal templante es inyectado haciendo uso del médito innerHTML y la referencia $TaskTable (Ver HTML).
    
    Por otra parte, el desafío solicita realizar algun tipo de cambio que advierta que dicha tarea está finalizada. Se sugiere un cambio de estilo, el cual 
    se realiza llamando a la funcin "FinishedStyle". Esta función evaluará el estado de la función y devolverá un string literal (porción de codigo) que contendrá un style
    determinado si el estado de la tarea es "Finalizado".

    Finalmente, se puede notar que al momento de agregar el icono del basurero, este se asigna como un elemento del tipo boton el cual tiene una función asociada al 
    evento "onclick". Esta función es DeleteTask y se entrega como argumento el valor del respectivo elemento ID a eliminar.

    */

function ShowList(arreglo){

    let TaskTemplate =""

    for (const objeto of arreglo){
        TaskTemplate += ` 
                            <tr>
                                <td ${FinishedStyle(objeto.state)}>
                                    ${objeto.id}
                                </td>
                                <td ${FinishedStyle(objeto.state)}>
                                    ${objeto.descripción}
                                </td>
                                <td>                        
                                      ${ShowState(objeto.id)}
                                      
                                </td>
                                <td>
                                    <button type="button" class="delete-btn" onclick="DeleteTask(${objeto.id})"> <i class="fa-solid fa-trash"></i> </button
                                </td>   
                            </tr>
                            `
        }
        $TaskTable.innerHTML = TaskTemplate;
}

/*  Esta función es "parte" o mas bien, trabaja de forma coolaborativa con la función ShowList. Recordar que la función ShowList se encarga de generar un literal
    template e inyectarlo en el DOM pero, dentro de este literal HTML, se debe asginar una porción de "string" según cual sea el estado de la tarea a proyectar. 

    A diferencia de lo que propone el desafío, en donde se hace mención a un "checkbox" y marcar así una tarea como "completada" y por ende, trabajar con un estado 
    trúe o false, esta solución propone un abordaje distinto la cual aborda una "to do list" entendiendo que hay tareas que:
        -"No han sido iniciadas"
        -"Se encuentran en desarrollo"
        -"Han sido eliminadas (por tanto son las únicas que se pueden borrar)"
    
    Entonces, según sea el estado de la tarea evaluada (objeto del arreglo recorrido en función Showlist), se devuelve la respectiva porción de string para inyectar
    al DOM.

    Según sea el estado, notar que la respectiva opción del elemento select cuenta con el atributo "selected" para que se muestre en pantalla esta opción como la elegida.

    Por otra parte, si la tarea tiene un estado "finaliza" se agrega el atribuco "disabled" para bloquear la selección de opciones. Entendiendo que uno no puede retrotraer una
    tarea finalizada.

    Notar además que para cada select, se define la función "UpdateState" la cual se activará al evento "onchange" del respectivo select. Es decir, cuando el usuario seleccione
    un estado distinto para una determinada tarea, tenemos que actualizar este valor en el respectivo objeto del arreglo.Esta función es invocada entregando dos argumentos. 
    El primero se obtiene haciendo uso del keyword "THIS". Con esto,obtenemos el objeto desde donde se invocó la función, es decir obtenemos una referencia inmediata al 
    elemento select y, mediante el metodo ".value" obtenemos la NUEVA opción (Distinta a la anterior) elegida por el usuario. Se entrega como segundo argumento el valor 
    del ID del objeto cuyo estado acaba de cambiar.

    */
function ShowState(id){

        for (let objeto of tareas){

            if(objeto.id===id){

                if(objeto.state==="No iniciada"){
                    return `
                    <select onchange="UpdateState(this.value,${objeto.id})">
                        <option value="No iniciada" selected>No iniciada</option>
                        <option value="En desarrollo">En desarrollo</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>
                    `
                }
                else if(objeto.state==="En desarrollo"){
                    return `
                    <select onchange="UpdateState(this.value, ${objeto.id})">
                        <option value="No iniciada">No iniciada</option>
                        <option value="En desarrollo" selected>En desarrollo</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>
                    `
                }
                else if(objeto.state==="Finalizada"){
                    return `
                    <select onchange="UpdateState(this.value,${objeto.id})" disabled>
                        <option value="No iniciada">No iniciada</option>
                        <option value="En desarrollo">En desarrollo</option>
                        <option value="Finalizada" selected>Finalizada</option>
                    </select>
                    `
                }
            }
        }       
    }


/*  La funcion Delete Task permite eliminar un determinado objeto (tarea) del areglo general de tareas y es invocada al momento en que el usuario decide eliminar una
    tarea y hace click en el boton (o ícono) del basurerro. 
    
    La forma de abordar el eliminar un objeto de un arreglo puede hacerse de varias formas, mucho mas simples y directas mediante, por ejemplo, el uso del map o del 
    metodo filter. Pero, se explora una alternativa no utilizada anteriormente que busca volver al basico bucle for. 

    En primer lugar entender que esta función recibe como argumento un determinado ID el cual corresponde al id del elemento a eliminar. 
    
    Luego, para eliminar, haremos uso del metodo splice el cual recibe un index de un arreglo y la cantidad de elementos a eliminar.
    
    A partir de lo anterior, recorreremos el arreglo general de tareas e iremos comparando nuestro ID con el ID de cada tarea. En cada iteración se icrementará una variable
    contadora que será nuestro index. Así, una vez se encuentre la coincidencia, terminamos la ejecución del ciclo for y tenemos el indice del elemento a elimiar.
    
    Luego de esto, evaluamos una condicion la cual SI BIEN NO ESTÁ EXIGIDA EN EL DESAFÍO, nuevamente, depende de como uno aborde una todo list. Se asume que uno podrá eliminar
    unicamente aquellas tareas que haya finalizado. Por tanto, se evalua el estado de la tarea y esta únicamente se elimina si es que su estado (state) es "Finalizada.". De lo 
    contrario, se emite un alert que indica al usuario esta condicion.

    Luego de haber eliminado la tarea del arreglo, llamamos a las funciones encargadas de actualizar los valores de resumen total y de desplegar en pantalla cada una de las tareas
    del arreglo principal.
     */

function DeleteTask(id)
{
    let IndexToDelete=0;

    for(let objeto of tareas)
    {
        if(objeto.id === id)
        {
                break;
        }
                IndexToDelete++
    }

    if(tareas[IndexToDelete].state==="Finalizada"){
        tareas.splice(IndexToDelete,1);
    }
    else{
        alert("Debes marcar como finalizada una tarea antes de eliminarla")
    }
    ShowList(tareas)
    UpdateAndShowTotals() 
}


/*  Esta función trabaja en conjunto con la función ShowList y se encarga de devolver un string literal a inyectar dentro del literal template al momento de mostrar los datos
    de cada tarea en pantalla.
    
    Esta función recibe como argumento el valor del estado de una determinada tarea y lo compara con el literal "Finalizada". Si la tarea efectivamente está finalizada, se cambiará
    la opacidad de dos elementos: ID y Descripción. 
      */

function FinishedStyle(state){
    if(state==="Finalizada")
    {
        return `style= opacity:.3`
    }
}

/*  Esta función será invocada al momento en que el usuario realice algún cambio de opcion en el elemento state (recordar que a difernecia del desafío, que propone trabajar con
    checkbox, aca se trabaja con un elemento del tipo select ofreciendo tres estados para cada tarea: "No iniciada", "En desarrollo" y "Finalizada"). 

    Esta función recibe como argumento el valor del elemento select, es decir la nueva opción elegida por el usuario y el respectivo ID. 

    Para poder acutualizar el estado, recorremos mediante un ciclo forof el arreglo principal de tareas y vamos comparando el ID que recibe la función como argumento con el id de
    cada obeto del arreglo. Al momomento de encontrar el objeto, realizamos la asignación del nuevo estado.

    Inmediatamente luego de esta asignación, debemos mostrar nuevamenta las tareas en pantalla y realizar la actualización de valores resumenes para cada tipo de tarea.
     */
function UpdateState (SelectValue, id){
    
    
        for (let tarea of tareas)
        {
            if(tarea.id===id)
            {
                tarea.state = SelectValue
            }
        }

        ShowList(tareas)
        UpdateAndShowTotals() 
    }

/*  Con lo anterior, se propone una solución que atiende los distintos topicos a cubrir del desafío. */


