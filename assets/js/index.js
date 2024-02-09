let tareas = [
    {
        id: 1,
        descripción: 'Ir al supermercado',
        state: 'No iniciada'
    },
    {
        id: 2,
        descripción: 'Estudiar javascript',
        state: 'En desarrollo'
    },
    {
        id: 3,
        descripción: 'Desarrollar el desafío',
        state: 'En desarrollo'
    }
]

let contadorId = 4;
let FinishedCounter = 0;

const $BtnAgregar = document.getElementById("button-element");
const $InputTarea = document.getElementById("input-element");
const $SummaryContainer = document.getElementById("summary-container");
const $TaskTable = document.getElementById("task-table");



 

$BtnAgregar.addEventListener("click",InputRead);


UpdateAndShowTotals();
ShowList(tareas)



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
            estado: 'No iniciada'
        }

        tareas.push(tempObject);
        contadorId++;
        $InputTarea.value = "";

        UpdateAndShowTotals()
        ShowList(tareas)
    }

}

function UpdateAndShowTotals(){

    let NotStartedCounter = 0;
    let InprogressCounter = 0;

    for (objeto of tareas){
    
        if( objeto.state === "No iniciada"){
            NotStartedCounter++;
        }else if(objeto.state === "En desarrollo"){
            InprogressCounter++;
        }else if(objeto.state === "Finalizada"){
            FinishedCounter++;
        }
    }

    let SummaryTemplate =   `
                            <span style='font-size:18px'>Total Tareas: ${parseInt(NotStartedCounter+InprogressCounter+FinishedCounter)} </span>
                            <span style='font-size:18px'>Tareas no Iniciadas: ${NotStartedCounter} </span>
                            <span style='font-size:18px'>Tareas en Desarrollo: ${InprogressCounter} </span>
                            <span style='font-size:18px'>Tareas Finalizadas: ${FinishedCounter} </span>
                            `
    $SummaryContainer.innerHTML = SummaryTemplate
}

function ShowList(arreglo){

    let TaskTemplate =""

    for (objeto of arreglo){
        TaskTemplate += ` 
                            <tr>
                                <td>
                                    ${objeto.id}
                                </td>
                                <td>
                                    ${objeto.descripción}
                                </td>
                                <td>
                        `
                        + GetState(objeto) +
                        `      
                                </td>
                                <td>
                                    <i class="fa-solid fa-trash"></i>
                                </td>   
                            </tr>
                            `
        }
        $TaskTable.innerHTML = TaskTemplate;

}


function GetState(obj){

        if(obj.state==="No iniciada"){
            return `
            <select onchange="((select) => UpdateState(objeto))()">
                <option value="No iniciada" selected>No iniciada</option>
                <option value="En desarrollo">En desarrollo</option>
                <option value="Finalizada">Finalizada</option>
            </select>
            `
        }
        else if(obj.state==="En desarrollo"){
            return `
            <select onchange="UpdateState (objeto)">
                <option value="No iniciada">No iniciada</option>
                <option value="En desarrollo" selected>En desarrollo</option>
                <option value="Finalizada">Finalizada</option>
            </select>
            `
        }
        else if(obj.state==="Finalizada"){
            return `
            <select onchange="UpdateState (objeto)">
                <option value="No iniciada">No iniciada</option>
                <option value="En desarrollo" selected>En desarrollo</option>
                <option value="Finalizada">Finalizada</option>
            </select>
            `
        }
    }

    function UpdateState(osbj)
    {
        console.log (select.value)

    }


