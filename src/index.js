import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

import Header from "./component/Header.js";
import ToDoList from "./component/ToDoList.js";
import Modal from "./component/Modal.js";
import Button from "./component/Button.js";

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
    root.innerHTML = `
        ${Header({'header-title': 'To-do List', 'header-subtitle': 'Save you work to do later.'})}
        ${Button([['btn-add']], [['js-addBtn']], '', 'Click here to add a new to-do item')}
        ${ToDoList()}
        ${Modal()}
    `;

    const addTaskContainer = document.getElementById('js-addTaskContainer');
    const editTaskContainer = document.getElementById('js-editTaskContainer');
    const viewTaskContainer = document.getElementById('js-viewTaskContainer');
    const modal = document.getElementById('js-modal');

    const addBtn = document.getElementById('js-addBtn');
    const viewBtn = document.getElementById('js-viewDetailBtn');
    const editBtn = document.getElementById('js-editBtn');

    const cancelAddBtn = document.getElementById('js-cancelAddBtn');
    const cancelEditBtn = document.getElementById('js-cancelEditBtn');
    const cancelViewBtn = document.getElementById('js-cancelViewBtn');

    addBtn.addEventListener('click', (e) => {
        modal.classList.toggle('hide');
        addTaskContainer.classList.remove('hide');
        editTaskContainer.classList.add('hide');
        viewTaskContainer.classList.add('hide');
    });

    viewBtn.addEventListener('click', (e) => {
        modal.classList.toggle('hide');
        addTaskContainer.classList.add('hide');
        editTaskContainer.classList.add('hide');
        viewTaskContainer.classList.remove('hide');
    });

    editBtn.addEventListener('click', (e) => {
        addTaskContainer.classList.add('hide');
        editTaskContainer.classList.remove('hide');
        viewTaskContainer.classList.add('hide');
    });

    cancelAddBtn.addEventListener('click', (e) => {
        modal.classList.toggle('hide');
        addTaskContainer.classList.add('hide');
    });

    cancelEditBtn.addEventListener('click', (e) => {
        modal.classList.toggle('hide');
        editTaskContainer.classList.add('hide');
    });

    cancelViewBtn.addEventListener('click', (e) => {
        modal.classList.toggle('hide');
        viewTaskContainer.classList.add('hide');
    });
}