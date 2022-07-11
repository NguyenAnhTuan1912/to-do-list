import ToDoItem from "./ToDoItem.js";

export default function ToDoList() {
    return `
        <section class="content-container">
            <div class="content__slider-container">
                <article class="slider__to-do-items-container">
                    ${ToDoItem()}
                </article>
            </div>
        </section>
    `;
}