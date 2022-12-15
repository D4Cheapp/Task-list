export let storage = ""

if (localStorage.todoList === undefined){
    localStorage.setItem("todoList",JSON.stringify(""))
}
else {
    storage += (localStorage.getItem("todoList"))
}
console.log(storage)

