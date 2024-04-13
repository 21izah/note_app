const btnEl = document.getElementById("btn");

const appEL = document.getElementById("app");

btnEl.addEventListener("click", addNote);

getNoteFromLacalStorage().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEL.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;
  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete");
    if (warning) {
      deleteNote(id, element);
    }

    element.addEventListener("input", () => {
      updateNote(id, element.value);
    });

    function deleteNote(id, element) {
      console.log("workingwrfwwfw");

      const notes = getNoteFromLacalStorage().filter((note) => note.id != id);
      saveNoteToLacalStorage(notes);
      appEL.removeChild(element);
    }
  });

  return element;
}

function updateNote(id, content) {
  console.log("working");
  const notes = getNoteFromLacalStorage();
  const target = notes.filter((note) => note.id == id[0]);
  target.content = content;
  saveNoteToLacalStorage(notes);
}

function addNote() {
  const notes = getNoteFromLacalStorage();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  // add new note before the button
  appEL.insertBefore(noteEl, btnEl);
  notes.push(noteObj);
  saveNoteToLacalStorage(notes);
}
function saveNoteToLacalStorage(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}
function getNoteFromLacalStorage() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}
