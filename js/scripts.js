/* Elemento */
const notesContainer =document.querySelector("#notes-container");

const noteInput =document.querySelector("note-content");

const addnoteBtn = document.querySelector(".add-note");

// funções //
function addNote(){
    const noteObject ={
        id:1,
        content:noteInput.value,
        fixed:false,
    };

    console.log(noteObject);
}

function generateID(){
    return  Math.floor(Math.random() *5000);
}

// eventos //
addnoteBtn.addEventListener("click",() =>addNote());