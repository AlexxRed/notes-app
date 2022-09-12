export function itemTemplate ({ id, name, created, category, dates, content }) {
    return `<li data-id=${id} class="list-group-item list-group-item-action">
    <div id="todo-icon" class="todo-icon">O</div>
    <p id="name" class="todo-name">${name}</p>
    <p id="created" class="todo-created-date">${created}</p>
    <p id="category" class="todo-category">${category}</p>
    <p id="dates" class="todo-dates">${dates}</p>
    <span id="content" class="todo-content">${content}</span>
    <button id="edit" type="button" class="btn btn-danger"><b>Edit</b></button>
    <button id="archive" type="button" class="btn btn-danger"><b>Archive</b></button>
    <button id="delete" type="button" class="btn btn-danger"><b>X</b></button>
</li>`;
}
