import Header from "./component/Header.js";
import ToDoList from "./component/ToDoList.js";
import Modal from "./component/Modal.js";

const root = document.getElementById('root');

window.onload = function() {
    root.innerHTML = `
        ${Header({'header-title': 'To-do List', 'header-subtitle': 'Save you work to do later.'})}
        ${ToDoList()}
        ${Modal()}
    `;
}