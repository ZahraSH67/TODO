
//DOM ELEMENTER
const addNewBtn = document.querySelector("#add-new-btn")
const addNewForm = document.querySelector("#add-new-form")
const ul = document.querySelector("#tasks")
const title = document.querySelector("#new-title")
const text = document.querySelector("#new-text")


window.addEventListener("load", loadStorage)

//Hent tekststrengen fra local storage og sæt den ind i vores <ul>

function loadStorage(){
    if(localStorage.getItem("theWholeShit")){
        let savedHTML = localStorage.getItem("theWholeShit")
        ul.innerHTML = savedHTML
    }
   
}
//Click 
addNewBtn.addEventListener("click", function(){
    title.value = ""
    text.value = ""
    if(addNewForm.classList.contains("editing-active")){
        //Luk formen
        addNewForm.classList.remove("editing-active")
        this.innerHTML = "Opret opgave"
    }else{
        //Åbn formen
        addNewForm.classList.add("editing-active")
        this.innerHTML = "Annuler"
    }
})


//Add entry
addNewForm.addEventListener("submit", function(event){
    event.preventDefault(); 
    let entry = '<li>'
    entry += '<h2>' + title.value + '</h2>'
    entry += '<p>' + text.value + '</p>'
    entry += '<button onclick="deleteEntry(this.parentNode)">Slet</button>' 
    entry +='<input type="checkbox" name="" id="" onchange="markTask(this.parentNode, this)">' 
    entry +='</li>' 
    ul.innerHTML += entry
    saveToStorage()
    addNewForm.classList.remove("editing-active")
    addNewBtn.innerHTML = "Opret opgave"
 

})
//Delete entry
function deleteEntry(entry){
    entry.remove();
    saveToStorage()
  
}
//Mark entry 
function markTask(entry, checkbox){
    // if(entry.classList.contains("done")) {
    //     entry.classList.remove("done")
    // } else{
    //     entry.classList.add("done")
    // }
    // entry.classList.toggle("done");
    if(checkbox.checked){
        checkbox.setAttribute("checked", "true")
        entry.classList.add("done")
    } else{
        checkbox.removeAttribute("checked")
        entry.classList.remove("done")
    }
    saveToStorage()
}
//SAVE
function saveToStorage(){
    localStorage.setItem("theWholeShit", ul.innerHTML)
}