import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, query, getDocs } from 'firebase/firestore';

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

    loadTask(incompleteTaskContainer, ToDoItem);

    const addBtn = document.getElementById('js-addBtn');
    const viewBtn = document.getElementById('js-viewDetailBtn');
    const editBtn = document.getElementById('js-editBtn');

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

    viewBtn.addEventListener('click', (e) => {
        toggleVisibleContainer(modal);
        containerEnable(viewTaskContainer, editTaskContainer, addTaskContainer);
    });

    editBtn.addEventListener('click', (e) => {
        containerEnable(editTaskContainer, addTaskContainer, viewTaskContainer);
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
        try {
            let title = newTaskTitleInputField.value;
            let description = newTaskTDescription.value;
            if(title === '' || title === 'null') throw 'Title is null.'
            addElement(incompleteTaskContainer, ToDoItem, {'header-title': title, 'header-subtitle': description});
            addDoc(collection(db, 'todo-items'), {
                'header-title': title,
                'header-subtitle': description
            });
        } catch (error) {
            console.error(error);
        }
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

async function loadTask(taskContainer, cb) {
    const q = query(collection(db, 'todo-items'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        addElement(taskContainer, cb, doc.data());
    });
}

function addElement(element, cb, data) {
    element.innerHTML += cb(data);
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