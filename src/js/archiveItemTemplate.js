import { unarchiveIcon } from "../images/icons/unarchive";
import { thinkIcon } from "../images/icons/think";
import { lightIcon } from "../images/icons/light";
import { basketIcon } from "../images/icons/bascket";

export function archiveItemTemplate({ id, name, created, category, dates, content }) {
    let icon = thinkIcon;
    
    if (category === 'Idea') {
        icon = lightIcon
    }
    if (category === 'Task') {
        icon = basketIcon
    }
        if (category === 'Random Thought') {
        icon = thinkIcon
    }
    
    return `<li data-id=${id} class="list-group-item list-group-item-action">
    <div id="todo-icon" class="todo-icon">${icon}</div>
    <p id="name" class="todo-name">${name}</p>
    <p id="created" class="todo-created-date">${created}</p>
    <p id="category" class="todo-category">${category}</p>
    <p id="dates" class="todo-dates">${dates}</p>
    <span id="content" class="todo-content">${content}</span>
    <div class="unarchive-button">
        <button id="unarchive" type="button" class="btn icons-button">${unarchiveIcon}</button>
    </div>
</li>`;
}
