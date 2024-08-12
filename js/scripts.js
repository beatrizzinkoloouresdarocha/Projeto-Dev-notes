// Elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");

// Funções
function addNote() {
    const notes =[];

    const noteObject = {
        id: generateID(),
        content: noteInput.value,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content);
    notesContainer.appendChild(noteElement); 
    console.log(noteObject);
}

function generateID() {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.setAttribute("data-id", id);

    const noteContent = document.createElement("p");
    noteContent.textContent = content;
    noteDiv.appendChild(noteContent);

    return noteDiv;
}
function saveNotes(notes){
    localStorage.setItem("notes",JSON.stringify(notes))
}

// Eventos//
addNoteBtn.addEventListener("click", () => addNote());
