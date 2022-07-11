import EditAddItem from "./ModalItem.js";

export default function Modal() {
    return `
        <section class="modal hide" id="js-modal">
            ${EditAddItem('add')}
            ${EditAddItem('edit')}
            ${EditAddItem('view')}
        </section>
    `;
}