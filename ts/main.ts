// @ts-ignore: Ignoring issue w/ js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to todays date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}
/*
let item = new ToDoItem("Testing");
item.dueDate = new Date(2020, 6, 1);
item.isCompleted = false;
*/
window.onload = function(){
    let addItem = getInputById("add");
    addItem.onclick = main;
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

function addErrorMessage(errMsg:string) {
    let err = getInputById("title-span");
    err.value = "Please enter a Task."
}

/**
 * Check form data is valid
 */
function isValid():boolean{
    let isValid = true;
    let title = getInputById("title").value;
    if(title == ""){
        isValid = false;
        let errSpan = <HTMLSpanElement>getInputById("title").nextElementSibling;
        errSpan.innerHTML = "Please enter a Task."
    }
    /*
    if(getInputById("dueDate").value == null){
        isValid = false;
        let errSpan = <HTMLSpanElement>getInputById("dueDate");
        errSpan.innerHTML = "Please chosse a Due Date."
    }
    */
    return isValid;
}

/**
 * Get all input off form and wrap
 * in ToDoItem object
 */
function getToDoItem():ToDoItem{
    let myItem = new ToDoItem();

    let titleInput = getInputById("title");
    myItem.title = titleInput.value

    let dueDateInput = getInputById("due-date");
    myItem.dueDate = new Date(dueDateInput.value);

    let isCompleted = getInputById("is-complete");
    myItem.isCompleted = isCompleted.checked;

    return myItem;
}

/**
 * display given ToDoItem on the webpage
 * @param item current ToDoItem
 */
function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toDateString();

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted){
        let completedToDos = getInputById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = getInputById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}

function getInputById(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}
// Task: allow user to mark a ToDoItem as completed
// Task: store ToDoItems in web storage