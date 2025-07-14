const userNoteInput = document.getElementById("user-note-input")
const addNoteBtn = document.getElementById("addNote-btn")
const noteCollection = document.getElementById("note-collection")

const addNote = () => {
    if (!userNoteInput.value) {
        return
    }

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const newNote = userNoteInput.value;
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes))

    displayNotes()
    userNoteInput.value = "";
}

const displayNotes = () => {
    noteCollection.innerHTML = "";
    const storedNotes = JSON.parse(localStorage.getItem("notes"));

    storedNotes.forEach((note, index) => {
        const noteContainer = document.createElement("div");

        const removeNoteBtn = document.createElement("button");
        removeNoteBtn.innerText = "Delete";

        const noteItem = document.createElement("textarea");
        noteItem.value = note;
        noteItem.classList.add("black-glass-effect");
        
        removeNoteBtn.addEventListener("click", () => {
            removeNote(index);
        })

        noteContainer.appendChild(noteItem);
        noteContainer.appendChild(removeNoteBtn);
        noteCollection.appendChild(noteContainer);
    })
}

const removeNote = (noteIndex) => {
    const userNotes = JSON.parse(localStorage.getItem("notes"));
    userNotes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(userNotes));

    displayNotes()
}

addNoteBtn.addEventListener("click", addNote)

userNoteInput.addEventListener("keydown", (e) => {
    e.key === "Enter" ? addNote() : null;
})