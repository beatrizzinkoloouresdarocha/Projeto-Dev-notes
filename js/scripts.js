// Elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");
const searchInput = document.querySelector("#search-input");
const exportBtn = document.querySelector("#export-notes");

// Funções
function addNote() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    const noteObject = {
        id: generateID(),
        content: noteInput.value.trim(),
        fixed: false,
    };

    if (noteObject.content) { // Verifica se o conteúdo da nota não está vazio
        notes.push(noteObject);
        saveNotes(notes);
        noteInput.value = '';
        renderNotes();
    }
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

    // Botão de exclusão
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
    deleteBtn.addEventListener("click", () => {
        if (confirm("Do you really want to delete this note?")) {
            deleteNote(id);
        }
    });
    noteDiv.appendChild(deleteBtn);

    // Botão de fixar
    const fixBtn = document.createElement("button");
    fixBtn.textContent = "Fixar";
    fixBtn.classList.add("btn", "btn-warning", "btn-sm", "ms-2");
    fixBtn.addEventListener("click", () => toggleFix(id));
    noteDiv.appendChild(fixBtn);

    return noteDiv;
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
    notesContainer.innerHTML = ''; // Clear existing notes
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const searchTerm = searchInput.value.toLowerCase();

    notes
        .filter(note => note.content.toLowerCase().includes(searchTerm))
        .forEach(note => {
            const noteElement = createNote(note.id, note.content);
            if (note.fixed) {
                noteElement.classList.add('fixed');
            }
            notesContainer.appendChild(noteElement);
        });
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.id !== id);
    saveNotes(notes);
    renderNotes();
}

function toggleFix(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.map(note => {
        if (note.id === id) {
            note.fixed = !note.fixed;
        }
        return note;
    });
    saveNotes(notes);
    renderNotes();
}

function searchNotes() {
    renderNotes();
}

function exportNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Nota\n'; // Cabeçalho CSV

    notes.forEach(note => {
        csvContent += `${note.id},"${note.content.trim()}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'notas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Eventos
addNoteBtn.addEventListener("click", addNote);
searchInput.addEventListener("input", searchNotes);
exportBtn.addEventListener("click", exportNotes);

// Carregar notas ao iniciar
document.addEventListener('DOMContentLoaded', renderNotes);
