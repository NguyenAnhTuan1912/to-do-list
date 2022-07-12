import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, query, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

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
    const acceptEditBtn = document.getElementById('js-acceptEditBtn');
    const cancelAddBtn = document.getElementById('js-cancelAddBtn');
    const cancelEditBtn = document.getElementById('js-cancelEditBtn');
    const cancelViewBtn = document.getElementById('js-cancelViewBtn');
    
    const newTaskTitleInputField = document.getElementById('js-newTaskTitleInput');
    const newTaskTDescriptionInputField = document.getElementById('js-newTaskDescriptionInput');
    const editTaskTitleInputField = document.getElementById('js-editTaskTitleInput');
    const editTaskDescriptionInputField = document.getElementById('js-editTaskDescriptionInput');

    addBtn.addEventListener('click', (e) => {
        toggleVisibleContainer(modal);
        containerEnable(addTaskContainer, editTaskContainer, viewTaskContainer);
    });

    // editBtn.addEventListener('click', (e) => {
    //     const header = viewTaskContainer.getElementsByTagName('header')[0];
    //     const title = header.getElementsByClassName('header__title')[0];
    //     const subtitle = header.getElementsByClassName('header__subtitle')[0];

    //     editTaskTitleInputField.value = title.textContent || '';
    //     editTaskDescriptionInputField.value = subtitle.textContent || '';
    //     containerEnable(editTaskContainer, addTaskContainer, viewTaskContainer);
    // });

    cancelAddBtn.addEventListener('click', (e) => {
        toggleVisibleContainer(modal);
        addClassName(addTaskContainer, 'hide');
        newTaskTitleInputField.value = '';
        newTaskTDescriptionInputField.value = '';
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
            'header-subtitle': newTaskTDescriptionInputField.value
        }
        addData(data);
        toggleVisibleContainer(modal);
        addClassName(addTaskContainer, 'hide');
        newTaskTitleInputField.value = '';
        newTaskTDescriptionInputField.value = '';
    });

    // acceptEditBtn.addEventListener('click', (e) => {
    //     editData();
    //     toggleVisibleContainer(modal);
    //     addClassName(editTaskContainer, 'hide');
    //     editTaskTitleInputField.value = '';
    //     editTaskDescriptionInputField.value = '';
    // });
}






function renderApp() {
    root.innerHTML = `
        ${Header({'header-title': 'To-do List', 'header-subtitle': 'Save you work to do later.'})}
        <hr>
        ${Button([['btn-add']], [['js-addBtn']], '', 'Click here to add a new to-do item')}
        <hr>
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

async function addData({'header-title': title, 'header-subtitle': subtitle}) {
    const incompleteTaskContainer = document.getElementById('js-incompleteTaskContainer');
    try {
        if(title === '' || title === 'null') throw 'Title is null.'
        await addDoc(collection(db, 'todo-items'), {
            'header-title': title,
            'header-subtitle': subtitle
        })
        .then((doc) => {
            addTodoItem(incompleteTaskContainer, ToDoItem, doc.id, {'header-title': title, 'header-subtitle': subtitle});
        });
    } catch (error) {
        console.error(error);
    }
}

async function editData(element, data, docId) {
    const docReference = await doc(db, 'todo-items', docId);
        await updateDoc(docReference, {
            'header-title': data['header-title'],
            'header-subtitle': data['header-subtitle']
        })
        .then(() => {
            const header = element.getElementsByTagName('header')[0];
            const title = header.getElementsByClassName('header__title')[0];
            const subtitle = header.getElementsByClassName('header__subtitle')[0];

            title.textContent = data['header-title'],
            subtitle.textContent = data['header-subtitle']
            console.log('Update data successfully!');
        });
}

function addTodoItem(element, cb, docId, data) {
    const div = document.createElement('div');
    div.innerHTML = cb(data);

    const toDoContainer = div.querySelector('.to-do-item:last-child');
    const buttons = toDoContainer.getElementsByTagName('button');

    // const modal = document.getElementById('js-modal');
    // const addTaskContainer = document.getElementById('js-addTaskContainer');
    // const editTaskContainer = document.getElementById('js-editTaskContainer');
    // const viewTaskContainer = document.getElementById('js-viewTaskContainer');

    buttons[0].addEventListener('click', async (e) => {
        // const header = viewTaskContainer.getElementsByTagName('header')[0];
        // const title = header.getElementsByClassName('header__title')[0];
        // const subtitle = header.getElementsByClassName('header__subtitle')[0];

        // title.textContent = data['header-title'];
        // subtitle.textContent = data['header-subtitle'];
        // toggleVisibleContainer(modal);
        // containerEnable(viewTaskContainer, editTaskContainer, addTaskContainer);
        const modal = document.getElementById('js-modal');
        const addTaskContainer = document.getElementById('js-addTaskContainer');
        const editTaskContainer = document.getElementById('js-editTaskContainer');
        const viewTaskContainer = document.getElementById('js-viewTaskContainer');
        const editTaskTitleInputField = document.getElementById('js-editTaskTitleInput');
        const editTaskDescriptionInputField = document.getElementById('js-editTaskDescriptionInput');
        const acceptEditBtn = document.getElementById('js-acceptEditBtn');


        editTaskTitleInputField.value = data['header-title'] || '';
        editTaskDescriptionInputField.value = data['header-subtitle'] || '';
        toggleVisibleContainer(modal);
        containerEnable(editTaskContainer, addTaskContainer, viewTaskContainer);
    });

    buttons[2].addEventListener('click', async (e) => {
        const docReference = await doc(db, 'todo-items', docId);
        await deleteDoc(docReference)
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