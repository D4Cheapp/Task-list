document.getElementById("ClearCompleted").addEventListener("click",Clear)

function Clear(){
    document.getElementsByClassName("Todo-List__Header__Title")[0].textContent = "Popchik";
    localStorage.clear()
}
function Completed(e){
    console.log(e)
}
function Active(){

}
function All(){

}