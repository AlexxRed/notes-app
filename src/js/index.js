import { v4 as uuidv4 } from 'uuid';
import { getRefs } from './getRefs';
import { createNotes } from './createNoteForm';
import { deleteModal } from './deleteNoteForm';
import { editNoteForm } from './editNoteForm'
import { itemTemplate } from './todoTamplate';
import { archiveItemTemplate } from './archiveItemTemplate';
import { statisticItemTemplate } from './statisticItemTemplate';
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

    allStatistic();
};

// ================== render notes ==================
function startRenderToDo() {
    const markUpItems = todos.map((note) => {
        return itemTemplate(note);
    });

    const archiveMarkUp = archive.map((note) => {
        return archiveItemTemplate(note);
    });

    refs.todoList.innerHTML = '';
    refs.todoList.insertAdjacentHTML('beforeend', markUpItems.join(''));

    refs.archiveList.innerHTML = '';
    refs.archiveList.insertAdjacentHTML('beforeend', archiveMarkUp.join(''));

    saveToDoList();
    saveArchiveList();
    allStatistic();
};

// ================== render statistic ==================
function renderStatistic(statistic) {
        const statisticMarkUp = statistic.map((item) => {
        return statisticItemTemplate(item);
    });
    refs.statisticList.innerHTML = '';
    refs.statisticList.insertAdjacentHTML('beforeend', statisticMarkUp.join(''));

    saveToDoList();
    saveArchiveList();
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

// ================== archive notes ==================
function archiveNote(id) {
        todos.find((note) => {
        if (note.id === id) {
            archive.push(note);
            todos = todos.filter(note => note.id !== id);
            startRenderToDo();
            saveArchiveList();
        }
    })
}

// ================== edit note ==================
function editNote(id) {
    currentId = id
    const note = todos.find(note => note.id === id);
    const form = editNoteForm(note);
    form.show()
    const editNotes = document.querySelector('.create-notes-form');
    const cancel = document.querySelector('.cancel-create');
    
    function handleSubm(e) {
        onSubmitEditNotes(e);
        form.close()
    }

    editNotes.addEventListener('submit',  handleSubm);
    cancel.addEventListener('click', () => form.close());
}

// ================== unarchive notes ==================
function unarchiveNote(id) {
    archive.find((note) => {
        if (note.id === id) {
            todos.push(note);
            archive = archive.filter(note => note.id !== id);
            startRenderToDo();
            saveArchiveList();
        }
    })
}

// ================== click on archive elements ==================
function handleUnarchive(e) {
    const { id } = e.target.closest('li').dataset
        if (e.target.nodeName === 'UL') {
        return
    }
    if (e.target.id === 'unarchive') {
        unarchiveNote(id);
    }
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
                break;
        }
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

// ================== edit notes ==================
function onSubmitEditNotes(e) {
    e.preventDefault();
    const createNote = document.querySelector('.create-notes-form');

        const newNotes = {
        category: e.target.category.value,
        name: e.target.name.value,
        content: e.target.content.value,
        dates: moment(e.target.dates.value).subtract(10, 'days').calendar() ,
        created: moment().format('MMMM DD, YYYY'),
        id: uuidv4(),
    };

    const note = todos.find(note => note.id === currentId);
    editNoteForm(note).close();

    todos.push(newNotes);
    createNote.reset();
    todos = todos.filter((todo) => todo.id !== currentId);
    startRenderToDo();
    toastr.info(`The note ${newNotes.name} has been changed`);
}

// ================== statistic loading ==================

function allStatistic() {
    
    const totalIdeas = todos.filter(item => item.category === "Idea").length
    const totalArciveIdeas = archive.filter(item => item.category === "Idea").length

    const totalTasks = todos.filter(item => item.category === "Task").length
    const totalArciveTasks = archive.filter(item => item.category === "Task").length

    const totalThought = todos.filter(item => item.category === "Random Thought").length
    const totalArciveThought = archive.filter(item => item.category === "Random Thought").length    
    
    const statistic = [
        {
            category: 'Idea',
            active: totalIdeas,
            archived: totalArciveIdeas
        },
        {
            category: 'Task',
            active: totalTasks,
            archived: totalArciveTasks
        },
        {
            category: 'Random Thought',
            active: totalThought,
            archived: totalArciveThought
        }
    ];

    renderStatistic(statistic);
}

// ================== start program ==================
function startRenderToDoList() {
    loadToDoList()
    refs.todoList.addEventListener('click', onToDoElement);
    refs.createButton.addEventListener('click', handleCreate);
    refs.unarchiveList.addEventListener('click', handleUnarchive);
    startRenderToDo();
}

startRenderToDoList();
toastr.info('Create your Note');





