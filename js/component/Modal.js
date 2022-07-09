import EditAddItem from "./ModalItem.js";

export default function Modal() {
    return `
        <section class="modal" id="js-modal">
            ${EditAddItem()}
        </section>
    `;
}