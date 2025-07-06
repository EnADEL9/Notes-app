const createBtn = document.querySelector(".create-btn");
const notesContainer = document.querySelector(".notes");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes') || '';
    collectKeyUpToNotes();
}
showNotes();

function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

function collectKeyUpToNotes() {
    const notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        note.onkeyup = function() {
            updateStorage();
        };
    });
}

createBtn.addEventListener('click', () => {
    const inputBox = document.createElement('p');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash delete-icon';
    icon.setAttribute('contenteditable', 'false');
    icon.setAttribute('draggable', 'false');
    icon.style.userSelect = 'none';

    inputBox.appendChild(icon);
    notesContainer.appendChild(inputBox);

    collectKeyUpToNotes();
    updateStorage();
});

notesContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains("delete-icon")) {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
});