import Button from "./Button.js";
import Header from "./Header.js";

export default function EditAddItem() {
    return `
        <div class="modal__item" id="js-modalItemContainer">
            ${Header({'header-title': 'Create a new to-do!', 'header-subtitle': 'Enter two text fields below and save you activity!'})}
            <form id="to-do-form">
                <article>
                    <label>
                        <input type="text" name="to-do-item" class="form__text-input" id="js-titleInput" placeholder="Write your work here...">
                    </label>
                    <label>
                        <textarea class="form__text-input" placeholder="Describe you work here..."></textarea>
                    </label>
                </article>
            </form>
            <div class="button-container">
                ${Button([['btn-done']], [['js-acceptBtn']], 'fa-solid fa-check')}
                ${Button([['btn-delete']], [['js-cancelBtn']], 'fa-solid fa-xmark')}
            </div>
        </div>
    `;
}