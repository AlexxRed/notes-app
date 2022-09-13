import { v4 as uuidv4 } from 'uuid';
import { getRefs } from './getRefs';
import { createNotes } from './createNoteForm';
import { deleteModal } from './deleteNoteForm';
import { itemTemplate } from './todoTamplate';
import { notes } from './notesTemplates';
import toastr from 'toastr';
import moment from 'moment';

// ================== style import ==================
import 'toastr/build/toastr.min.css';
const refs = getRefs();

// ================== variables ==================
let currentId; 
let currentToDoName;
let currentWarninigName;

// ================== toastr options ==================
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

// ================== cancel delete ==================
function onCancelDeleteToDo() {
    deleteModal.close();
};

// ================== cancel create==================
function onCancelCreate() {
    createNotes.close();
};

// ================== finish delete==================
function onApproveDeleteToDo() {
    todos.find((todo) => {
        if (todo.id === currentId) {
            currentToDoName = todo.name
        }
    })
    todos = todos.filter((todo) => todo.id !== currentId);
    deleteModal.close();
    startRenderToDo();
    toastr.warning(`Your task - "${currentToDoName}" delete`);
};

// ================== save data in local ==================
function saveToDoList() {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// ================== save archive in local ==================
function saveArchiveList() {
    localStorage.setItem('archive', JSON.stringify(archive));
};

// ================== data loading ==================
function loadToDoList() {
    try {
        todos = JSON.parse(localStorage.getItem('todos')) || notes;
        archive = JSON.parse(localStorage.getItem('archive')) || [];
    } catch (e) {
        toastr.error('Data not loaded');
    }
};

// ================== render notes ==================
function startRenderToDo() {
    const markUpItems = todos.map((note) => {
        return itemTemplate(note);
    });
    refs.todoList.innerHTML = '';
    refs.todoList.insertAdjacentHTML('beforeend', markUpItems.join(''));

    saveToDoList();
};

// ================== try delete ==================
function deleteToDo(id) {
    todos.find((item) => {
        if (item.id === id) {
            currentWarninigName = item.name
        }
    });
    toastr.error(`Do You want delete ${currentWarninigName}?`);

    deleteModal.show();
    currentId = id
    
    const modalText = document.querySelector('#text');
    const cancelDelete = document.querySelector('.btn-cancel');
    const approveDelete = document.querySelector('.btn-delete');

    modalText.textContent = currentWarninigName
    cancelDelete.addEventListener('click', onCancelDeleteToDo);
    approveDelete.addEventListener('click', onApproveDeleteToDo);
};

function archiveNote(id) {
    console.log(id)
        todos.find((note) => {
        if (note.id === id) {
            archive.push(note);
            todos = todos.filter(note => note.id !== id);
            startRenderToDo();
            saveArchiveList();
        }
    })
}


// ================== click on elements ==================
function onToDoElement(e) {
    if (e.target.nodeName === 'UL') {
        return
    }
    else {
        const { id } = e.target.closest('li').dataset
        switch (e.target.id) {
            case 'delete':
                deleteToDo(id);
                break;
            case 'archive':
                archiveNote(id);
                break;
            case 'edit':
                editNote(id);
                break;        }
        startRenderToDo();
    };
}

// ================== create note ==================
function handleCreate() {
    createNotes.show();
    const createNote = document.querySelector('.create-notes-form');
    const cancel = document.querySelector('.cancel-create');
    createNote.addEventListener('submit', onSubmitNotes);
    cancel.addEventListener('click', onCancelCreate);
};

// ================== form data ==================
function onSubmitNotes(e) {
    e.preventDefault();
    const createNote = document.querySelector('.create-notes-form');
    // console.log([...data.entries()]);
    const newNotes = {
        category: e.target.category.value,
        name: e.target.name.value,
        content: e.target.content.value,
        dates: moment(e.target.dates.value).subtract(10, 'days').calendar() ,
        created: moment().format('MMMM DD, YYYY'),
        id: uuidv4(),
    };

    if (!newNotes) {
        toastr.info('Write yor notes and then click - Change');
        return;
    };

    todos.push(newNotes);
    createNote.reset();
    createNotes.close();
    startRenderToDo();
    toastr.info(`Your notes created`);

}

// ================== start program ==================
function startRenderToDoList() {
    loadToDoList()
    refs.todoList.addEventListener('click', onToDoElement);
    refs.createButton.addEventListener('click', handleCreate);
    startRenderToDo();
}

startRenderToDoList();
toastr.info('Create your Note');





