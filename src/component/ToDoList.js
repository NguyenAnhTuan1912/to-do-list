import ToDoItem from "./ToDoItem.js";

export default function ToDoList() {
    return `
        <section class="content-container">
            <div class="content__slider-container">
                <article class="slider__to-do-items-container" id="js-incompleteTaskContainer">
                    ${ToDoItem({'header-title': 'Đây là task đầu tiên', 'header-subtitle': 'Task này là task dùng trong quá trình debug, sau này sẽ không dùng tới'})}
                </article>
                <article class="slider__to-do-items-container" id="js-completeTaskContainer">
                </article>
            </div>
        </section>
    `;
}