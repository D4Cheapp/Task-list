import {storage} from "./localStorageReading";

const inputTodos = document.getElementById("Todo-List__Input");
const taskContainer = document.getElementById("Todo-List__Tasks");

let taskCount = document.getElementsByClassName("Todo-List__Tasks__Task").length;
const taskCountText = document.getElementById("Tasks-Counter")
taskCountText.innerHTML = taskCount + " tasks left"

inputTodos.addEventListener("keypress", (e) => {
    if(e.key === "Enter" && inputTodos.value !== ""){
        let taskText = inputTodos.value.toString();

        let task = document.createElement("div");
        task.classList.add("Todo-List__Tasks__Task")
        task.innerHTML = taskText;
        inputTodos.value = "";

        taskCount++
        taskCountText.innerHTML = taskCount + " tasks left"
        taskContainer.append(task);
    }
})
