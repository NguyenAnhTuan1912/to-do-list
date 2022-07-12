import Header from "./Header.js";
import Button from "./Button.js";

export default function ToDoItem(data) {
    return `
        <div class="to-do-item">
            ${Header(data)}
            <div class="button-container">
                ${Button([['btn-edit', 'btn--round']], [['']], 'edit')}
                ${Button([['btn-done', 'btn--round']], [['']], 'done')}
                ${Button([['btn-delete', 'btn--round']], [['']], 'close')}
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