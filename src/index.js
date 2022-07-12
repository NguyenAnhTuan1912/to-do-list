import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';

import Header from "./component/Header.js";
import ToDoList from "./component/ToDoList.js";
import Modal from "./component/Modal.js";
import Button from "./component/Button.js";
import ToDoItem from './component/ToDoItem.js';

const root = document.getElementById('root');

const firebaseConfig = {
    apiKey: "AIzaSyD1SkuAgHyLUVjLy7pPtfqg7_5dOIXA2h8",
    authDomain: "first-firebase-eb368.firebaseapp.com",
    projectId: "first-firebase-eb368",
    storageBucket: "first-firebase-eb368.appspot.com",
    messagingSenderId: "1002332811694",
    appId: "1:1002332811694:web:7de3d292eeb4ff26fd583f",
    measurementId: "G-QVYDGTPLJV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.onload = function() {
    renderApp();

    const addTaskContainer = document.getElementById('js-addTaskContainer');
    const editTaskContainer = document.getElementById('js-editTaskContainer');
    const viewTaskContainer = document.getElementById('js-viewTaskContainer');
    const incompleteTaskContainer = document.getElementById('js-incompleteTaskContainer');
    const modal = document.getElementById('js-modal');

    loadAllTasks(incompleteTaskContainer, ToDoItem);

    const addBtn = document.getElementById('js-addBtn');

    const acceptAddBtn = document.getElementById('js-acceptAddBtn');
    const cancelAddBtn = document.getElementById('js-cancelAddBtn');
    const cancelEditBtn = document.getElementById('js-cancelEditBtn');
    const cancelViewBtn = document.getElementById('js-cancelViewBtn');
    
    const newTaskTitleInputField = document.getElementById('js-newTaskTitleInput');
    const newTaskTDescription = document.getElementById('js-newTaskDescriptionInput');

    addBtn.addEventListener('click', (e) => {
        toggleVisibleContainer(modal);
        containerEnable(addTaskContainer, editTaskContainer, viewTaskContainer);
    });

    cancelAddBtn.addEventListener('click', (e) => {
        toggleVisibleContainer(modal);
        addClassName(addTaskContainer, 'hide');
        newTaskTitleInputField.value = '';
        newTaskTDescription.value = '';
    });

    cancelEditBtn.addEventListener('click', (e) => {
        toggleVisibleContainer(modal);
        addClassName(editTaskContainer, 'hide');
    });

    cancelViewBtn.addEventListener('click', (e) => {
        toggleVisibleContainer(modal);
        addClassName(viewTaskContainer, 'hide');
    });

    acceptAddBtn.addEventListener('click', (e) => {
        const data = {
            'header-title': newTaskTitleInputField.value,
            'header-subtitle': newTaskTDescription.value
        }
        addData(data)
        toggleVisibleContainer(modal);
        addClassName(addTaskContainer, 'hide');
    });
}






function renderApp() {
    root.innerHTML = `
        ${Header({'header-title': 'To-do List', 'header-subtitle': 'Save you work to do later.'})}
        ${Button([['btn-add']], [['js-addBtn']], '', 'Click here to add a new to-do item')}
        ${ToDoList()}
        ${Modal()}
    `;
}

async function loadAllTasks(taskContainer, cb) {
    const q = query(collection(db, 'todo-items'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        addTodoItem(taskContainer, cb, doc.id, doc.data());
    });
}

function addData({'header-title': title, 'header-subtitle': subtitle}) {
    const incompleteTaskContainer = document.getElementById('js-incompleteTaskContainer');
    try {
        if(title === '' || title === 'null') throw 'Title is null.'
        addTodoItem(incompleteTaskContainer, ToDoItem, '', {'header-title': title, 'header-subtitle': subtitle});
        addDoc(collection(db, 'todo-items'), {
            'header-title': title,
            'header-subtitle': subtitle
        });
    } catch (error) {
        console.error(error);
    }
}

function addTodoItem(element, cb, docId, data) {
    const div = document.createElement('div');
    div.innerHTML = cb(data);

    const toDoContainer = div.querySelector('.to-do-item:last-child');
    const buttons = toDoContainer.getElementsByTagName('button');

    const modal = document.getElementById('js-modal');
    const addTaskContainer = document.getElementById('js-addTaskContainer');
    const editTaskContainer = document.getElementById('js-editTaskContainer');
    const viewTaskContainer = document.getElementById('js-viewTaskContainer');

    buttons[0].addEventListener('click', (e) => {
        const header = viewTaskContainer.getElementsByTagName('header')[0];
        const title = header.getElementsByClassName('header__title')[0];
        const subtitle = header.getElementsByClassName('header__subtitle')[0];
        title.textContent = data['header-title'];
        subtitle.textContent = data['header-subtitle'];
        toggleVisibleContainer(modal);
        containerEnable(viewTaskContainer, editTaskContainer, addTaskContainer);
    });

    buttons[2].addEventListener('click', (e) => {
        const docReference = doc(db, 'todo-items', docId);
        deleteDoc(docReference)
        .then(() => {
            element.removeChild(buttons[2].parentElement.parentElement);
            console.log('Delete data successfully!');
        });
    });

    element.appendChild(div.childNodes[1]);
}

function toggleVisibleContainer(containerName) {
    containerName.classList.toggle('hide');
}

function containerEnable(...containers) {
    removeClassName(containers[0], 'hide');
    addClassName(containers[1], 'hide');
    addClassName(containers[2], 'hide');
}

function removeClassName(element, className) {
    element.classList.remove(className);
}

function addClassName(element, className) {
    element.classList.add(className);
}