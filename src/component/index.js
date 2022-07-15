import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, query, getDocs, doc, deleteDoc, updateDoc, Timestamp, orderBy, onSnapshot } from 'firebase/firestore';

import Header from "./Header.js";
import ToDoList from "./ToDoList.js";
import Modal from "./Modal.js";
import Button from "./Button.js";
import ToDoItem from './ToDoItem.js';

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
    const completeTaskContainer = document.getElementById('js-completeTaskContainer');
    const incompleteTaskContainer = document.getElementById('js-incompleteTaskContainer');
    const modal = document.getElementById('js-modal');

    loadAllTasks(incompleteTaskContainer, completeTaskContainer, ToDoItem)
    .then(() => {
        const addBtn = document.getElementById('js-addBtn');
        const inCompleteTaskBtn = document.getElementById('js-inCompleteTaskBtn');
        const completeTaskBtn = document.getElementById('js-completeTaskBtn');

        const acceptAddBtn = document.getElementById('js-acceptAddBtn');
        const acceptEditBtn = document.getElementById('js-acceptEditBtn');
        const cancelAddBtn = document.getElementById('js-cancelAddBtn');
        const cancelEditBtn = document.getElementById('js-cancelEditBtn');
        const cancelViewBtn = document.getElementById('js-cancelViewBtn');
        
        const newTaskTitleInputField = document.getElementById('js-newTaskTitleInput');
        const newTaskTDescriptionInputField = document.getElementById('js-newTaskDescriptionInput');
        const editTaskTitleInputField = document.getElementById('js-editTaskTitleInput');
        const editTaskDescriptionInputField = document.getElementById('js-editTaskDescriptionInput');

        const slider = document.getElementsByClassName('content__slider-container')[0];

        toggleSlider(slider, inCompleteTaskBtn, completeTaskBtn, true);

        addBtn.addEventListener('click', (e) => {
            toggleVisibleContainer(modal);
            containerEnable(addTaskContainer, editTaskContainer, viewTaskContainer);
        });

        cancelAddBtn.addEventListener('click', (e) => {
            toggleVisibleContainer(modal);
            addClassName(addTaskContainer, 'hide');
            newTaskTitleInputField.value = '';
            newTaskTDescriptionInputField.value = '';
        });

        cancelEditBtn.addEventListener('click', (e) => {
            editTaskContainer.setAttribute('data-id', '');
            editTaskContainer.setAttribute('data-todoitem-nth', '');
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
                'header-subtitle': newTaskTDescriptionInputField.value,
                'create-at': Timestamp.fromDate(new Date())
            }

            addData(data)
            .then(() => {
                toggleVisibleContainer(modal);
                addClassName(addTaskContainer, 'hide');
                
                newTaskTitleInputField.value = '';
                newTaskTDescriptionInputField.value = '';
            });
        });

        acceptEditBtn.addEventListener('click', (e) => {
            editData({'header-title': editTaskTitleInputField.value, 'header-subtitle': editTaskDescriptionInputField.value}, editTaskContainer.getAttribute('data-id'))
            .then(() => {
                const index = parseInt(editTaskContainer.getAttribute('data-todoitem-nth')) + 1;
                const todoItem = document.querySelector(`.to-do-item:nth-child(${index})`);
                const header = todoItem.getElementsByTagName('header')[0];
                const title = header.getElementsByClassName('header__title')[0];
                const subtitle = header.getElementsByClassName('header__subtitle')[0];

                editTaskContainer.setAttribute('data-id', '');
                editTaskContainer.setAttribute('data-todoitem-nth', '');

                title.textContent = editTaskTitleInputField.value;
                subtitle.textContent = editTaskDescriptionInputField.value;
                toggleVisibleContainer(modal);
                addClassName(editTaskContainer, 'hide');
                editTaskTitleInputField.value = '';
                editTaskDescriptionInputField.value = '';
            })
        });

        inCompleteTaskBtn.addEventListener('click', (e) => {
            toggleSlider(slider, inCompleteTaskBtn, completeTaskBtn, true);
        });

        completeTaskBtn.addEventListener('click', (e) => {
            toggleSlider(slider, inCompleteTaskBtn, completeTaskBtn, false);
        });
    });
}






function renderApp() {
    root.innerHTML = `
        ${Header({'header-title': 'To-do List', 'header-subtitle': 'Save you work to do later.'})}
        <hr>
        <div class="content__button-container">
            ${Button([['btn-add']], [['js-addBtn']], '', 'Click here to add a new Task')}
            ${Button([['btn-add']], [['js-inCompleteTaskBtn']], '', 'Task')}
            ${Button([['btn-add']], [['js-completeTaskBtn']], '', 'Complete task')}
        </div>
        <hr>
        ${ToDoList()}
        ${Modal()}
    `;
}

async function loadAllTasks(incompleteTaskContainer, completeTaskContainer,cb) {
    const q = query(collection(db, 'todo-items'), orderBy('create-at', 'asc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if(!doc.data().isComplete)
            addTodoItem(incompleteTaskContainer, cb, doc.id, doc.data());
        else
            addTodoItem(completeTaskContainer, cb, doc.id, doc.data());
    });
}

async function addData({'header-title': title, 'header-subtitle': subtitle, 'create-at': timeCreated}) {
    const incompleteTaskContainer = document.getElementById('js-incompleteTaskContainer');
    try {
        if(title === '' || title === 'null') throw 'Title is null.'
        await addDoc(collection(db, 'todo-items'), {
            'header-title': title,
            'header-subtitle': subtitle,
            'create-at': timeCreated,
            'isComplete': false
        })
        .then((doc) => {
            addTodoItem(incompleteTaskContainer, ToDoItem, doc.id, {'header-title': title, 'header-subtitle': subtitle, 'create-at': timeCreated});
        });
    } catch (error) {
        console.error(error);
    }
}

async function editData(data, docId) {
    const docReference = await doc(db, 'todo-items', docId);
    await updateDoc(docReference, {
        'header-title': data['header-title'],
        'header-subtitle': data['header-subtitle'],
    })
}

async function updateToDoState(state, docId) {
    const docReference = await doc(db, 'todo-items', docId);
    await updateDoc(docReference, {
        'isComplete': state
    })
}


function addTodoItem(element, cb, docId, data) {
    const div = document.createElement('div');
    div.innerHTML = cb(data);

    const toDoContainer = div.querySelector('.to-do-item:first-child');
    const buttons = toDoContainer.getElementsByTagName('button');
    const viewClick = toDoContainer.getElementsByClassName('header__title')[0];

    viewClick.addEventListener('click', (e) => {
        const modal = document.getElementById('js-modal');
        const addTaskContainer = document.getElementById('js-addTaskContainer');
        const editTaskContainer = document.getElementById('js-editTaskContainer');
        const viewTaskContainer = document.getElementById('js-viewTaskContainer');
        const header = viewTaskContainer.getElementsByTagName('header')[0];
        const title = header.getElementsByClassName('header__title')[0];
        const subtitle = header.getElementsByClassName('header__subtitle')[0];

        title.textContent = data['header-title'];
        subtitle.textContent = data['header-subtitle'];
        toggleVisibleContainer(modal);
        containerEnable(viewTaskContainer, editTaskContainer, addTaskContainer);
    });

    buttons[0].addEventListener('click', (e) => {
        const modal = document.getElementById('js-modal');
        const addTaskContainer = document.getElementById('js-addTaskContainer');
        const editTaskContainer = document.getElementById('js-editTaskContainer');
        const viewTaskContainer = document.getElementById('js-viewTaskContainer');
        const editTaskTitleInputField = document.getElementById('js-editTaskTitleInput');
        const editTaskDescriptionInputField = document.getElementById('js-editTaskDescriptionInput');
        const todolist = document.getElementsByClassName('to-do-item');

        const todoItemNth = Array.from(todolist).indexOf(e.currentTarget.parentElement.parentElement);

        if(!editTaskContainer.hasAttribute('data-id')) {
            const attrId = document.createAttribute('data-id');
            attrId.value = docId;
            editTaskContainer.setAttributeNode(attrId);
        } else editTaskContainer.setAttribute('data-id', docId);

        if(!editTaskContainer.hasAttribute('data-todoitem-nth')) {
            const attrNth = document.createAttribute('data-todoitem-nth');
            attrNth.value = todoItemNth;
            editTaskContainer.setAttributeNode(attrNth);
        } else editTaskContainer.setAttribute('data-todoitem-nth', todoItemNth);

        editTaskTitleInputField.value = data['header-title'] || '';
        editTaskDescriptionInputField.value = data['header-subtitle'] || '';
        toggleVisibleContainer(modal);
        containerEnable(editTaskContainer, addTaskContainer, viewTaskContainer);
    });

    buttons[1].addEventListener('click', (e) => {
        const taskContainer = e.currentTarget.parentElement.parentElement.parentElement;
        const completeTaskContainer = document.getElementById('js-completeTaskContainer');
        const todoItem = e.currentTarget.parentElement.parentElement;
        if(taskContainer == completeTaskContainer) return;
        updateToDoState(true, docId)
        .then(() => {
            completeTaskContainer.prepend(todoItem);
        });
    });

    buttons[2].addEventListener('click', async (e) => {
        const taskContainer = e.currentTarget.parentElement.parentElement.parentElement;
        const todoItem = e.currentTarget.parentElement.parentElement;
        const docReference = await doc(db, 'todo-items', docId);
        await deleteDoc(docReference)
        .then(() => {
            taskContainer.removeChild(todoItem);
            console.log('Delete data successfully!');
        });
    });

    element.prepend(div.childNodes[1]);
}

function toggleSlider(slider, inCompleteTaskBtn, completeTaskBtn, bool) {
    if(bool) {
        addClassName(inCompleteTaskBtn, 'active');
        removeClassName(completeTaskBtn, 'active');
        slider.style.transform = 'translateX(0)';
    } else {
        addClassName(completeTaskBtn, 'active');
        removeClassName(inCompleteTaskBtn, 'active');
        slider.style.transform = 'translateX(-50%)';
    }
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