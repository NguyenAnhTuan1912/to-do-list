import Header from "./Header.js";
import Button from "./Button.js";

export default function ToDoItem(data) {
    return `
        <div class="to-do-item">
            ${Header({})}
            <div class="button-container">
                ${Button([['btn-view']], [['js-viewDetailBtn']], 'fa-solid fa-eye')}
                ${Button([['btn-done']], [['js-completeWorkBtn']], 'fa-solid fa-check')}
                ${Button([['btn-delete']], [['js-deleteBtn']], 'fa-solid fa-xmark')}
            </div>
        </div>
    `;
}


/*
<label>
                    <input type="checkbox" name="to-do-type">
                    <span class="checkbox--custom"></span>
                    Study
                </label>
                <label>
                    <input type="checkbox" name="to-do-type">
                    <span class="checkbox--custom"></span>
                    Work
                </label>
                <label>
                    <input type="checkbox" name="to-do-type">
                    <span class="checkbox--custom"></span>
                    Exercise
                </label>
*/