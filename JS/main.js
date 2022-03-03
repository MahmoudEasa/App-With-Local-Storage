// Global Variables
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let btn = document.querySelector("button");
// Empty Array To SToreThe Tasks
let arrayOfTasks = [];

// Check If Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.addEventListener("click", function () {
    if(input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
});

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggeleStatusTaskWith(e.target.getAttribute("data-id"))
        // Toggle Done Class
        e.target.classList.toggle("done");
    }
})    

function addTaskToArray(taskText) {
// Task Data
const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
};
// Push Task To Array Of Tasks
arrayOfTasks.push(task);
// Add Tasks To Page
addElementsToPageFrom(arrayOfTasks);
// Add Tasks To Local Storage
addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom (arrayOfTasks) {
// Empty Tasks Div
tasksDiv.innerHTML = "";
// Looing On Array Of Tasks
for (let item of arrayOfTasks) {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task Is Done
    if (item.completed) {
        div.className = "task done";
    }
    div.setAttribute("data-id", item.id);
    div.innerHTML = item.title;
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.innerHTML = "Delete";
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
};
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage () {
    let data = localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    // For Explain Only
    // for(let item of arrayOfTasks) {
    //     console.log(item.id + "mmm" + taskId);
    // }
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggeleStatusTaskWith(taskId) {
    for(let item of arrayOfTasks) {
        if (item.id == taskId) {
            item.completed == false ? item.completed = true : item.completed = false;
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}

// Remove Data From All
btn.addEventListener("click", function() {
    arrayOfTasks = [];
    tasksDiv.innerHTML = "";
    addDataToLocalStorageFrom(arrayOfTasks);
})
