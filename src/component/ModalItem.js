import Button from "./Button.js";
import Header from "./Header.js";

export default function EditAddItem(type) {
    return (type === 'add') ? `
        <div class="modal__item add hide" id="js-addTaskContainer">
            ${Header({'header-title': 'Create a new task.', 'header-subtitle': 'Enter two text fields below and save you activity.'})}
            <form id="add-to-do-form" class="to-do-form">
                <article>
                    <label>
                        <input type="text" name="to-do-item" class="form__text-input" id="js-newTaskTitleInput" placeholder="Write your task's title...." autocomplete="off" spellcheck="false">
                    </label>
                    <label>
                        <textarea class="form__text-input" id="js-newTaskDescriptionInput" placeholder="Describe you task's description..." spellcheck="false"></textarea>
                    </label>
                </article>
            </form>
            <div class="button-container">
                ${Button([['btn-done', 'btn--round']], [['js-acceptAddBtn']], 'done')}
                ${Button([['btn-delete', 'btn--round']], [['js-cancelAddBtn']], 'close')}
            </div>
        </div>
    ` : (type === 'edit') ? `
        <div class="modal__item edit hide" id="js-editTaskContainer">
            ${Header({'header-title': 'Edit your task.', 'header-subtitle': 'Edit and update your task.'})}
            <form id="edit-to-do-form" class="to-do-form">
                <article>
                    <label>
                        <input type="text" name="to-do-item" class="form__text-input" id="js-editTaskTitleInput" placeholder="Update your new task's title..." autocomplete="off" spellcheck="false">
                    </label>
                    <label>
                        <textarea class="form__text-input" id="js-editTaskDescriptionInput" placeholder="Describe you new task's description..." spellcheck="false"></textarea>
                    </label>
                </article>
            </form>
            <div class="button-container">
                ${Button([['btn-done', 'btn--round']], [['js-acceptEditBtn']], 'done')}
                ${Button([['btn-delete', 'btn--round']], [['js-cancelEditBtn']], 'close')}
            </div>
        </div>
    ` : (type === 'view') ? `
        <div class="modal__item view hide" id="js-viewTaskContainer">
            ${Header({})}
            <div class="button-container">
                ${Button([['btn-delete', 'btn--round']], [['js-cancelViewBtn']], 'close')}
            </div>
        </div>
    ` : `Type of modal isn't exist :( !`
}