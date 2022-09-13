import { removeIcon } from "../images/icons/remove";
import { archiveIcon } from "../images/icons/archive";
import { editIcon } from "../images/icons/edit";
import { thinkIcon } from "../images/icons/think";
import { lightIcon } from "../images/icons/light";
import { basketIcon } from "../images/icons/bascket";

export function itemTemplate({ id, name, created, category, dates, content }) {
    return `<li data-id=${id} class="list-group-item list-group-item-action">
    <div id="todo-icon" class="todo-icon">${thinkIcon}</div>
    <p id="name" class="todo-name">${name}</p>
    <p id="created" class="todo-created-date">${created}</p>
    <p id="category" class="todo-category">${category}</p>
    <p id="dates" class="todo-dates">${dates}</p>
    <span id="content" class="todo-content">${content}</span>
    <div>
        <button id="edit" type="button" class="btn icons-button">${editIcon}</button>
        <button id="archive" type="button" class="btn icons-button">${archiveIcon}</button>
        <button id="delete" type="button" class="btn icons-button">${removeIcon}</button>
    </div>
</li>`;
}


