import Header from "./Header.js";
import Button from "./Button.js";

export default function ToDoItem(data) {
    return `
        <div class="to-do-item">
            ${Header({})}
            <div class="to-do-item__type-container">
                <p class="type-text"></p>
            </div>
            ${Button([['primary'], ['done']], [['js-viewDetail'], ['js-completeWork']])}
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