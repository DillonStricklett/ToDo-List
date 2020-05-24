var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = getInputById("add");
    addItem.onclick = main;
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function addErrorMessage(errMsg) {
    var err = getInputById("title-span");
    err.value = "Please enter a Task.";
}
function isValid() {
    var isValid = true;
    var title = getInputById("title").value;
    if (title == "") {
        isValid = false;
        var errSpan = getInputById("title").nextElementSibling;
        errSpan.innerHTML = "Please enter a Task.";
    }
    return isValid;
}
function getToDoItem() {
    var myItem = new ToDoItem();
    var titleInput = getInputById("title");
    myItem.title = titleInput.value;
    var dueDateInput = getInputById("due-date");
    myItem.dueDate = new Date(dueDateInput.value);
    var isCompleted = getInputById("is-complete");
    myItem.isCompleted = isCompleted.checked;
    return myItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        var completedToDos = getInputById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else {
        var incompleteToDos = getInputById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}
function getInputById(id) {
    return document.getElementById(id);
}
