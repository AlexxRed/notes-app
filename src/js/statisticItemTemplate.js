import { thinkIcon } from "../images/icons/think";
import { lightIcon } from "../images/icons/light";
import { basketIcon } from "../images/icons/bascket";

export function statisticItemTemplate({ category, active, archived }) {
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

    return `<li  class="list-group-item list-group-item-action">
    <div id="todo-icon" class="todo-icon">${icon}</div>
    <p id="category" class="todo-category">${category}</p>
    <p id="active" class="todo-dates">${active}</p>
    <p id="archived" class="todo-dates">${archived}</p>
</li>`;
}