// =================================
// user-creation.js - form for creating new users
// ================================= 

import { convertFormDataToJson } from '../utilities/utilities.js';
import HttpClient from '../utilities/http.js';
import { initHeader } from '../utilities/header.js';
import { checkAdminLogin } from '../utilities/auth.js';
import { User } from '../models/UserModels.js';

initHeader();

const userAccount = new HttpClient('http://localhost:3000/users');
const adminAccount = new HttpClient('http://localhost:3000/adminUsers');

let form: HTMLFormElement | null;

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.endsWith('admin-user-creation.html')) {
        checkAdminLogin();
    }

    form = document.querySelector('#userCreationForm');
    form?.addEventListener('submit', handleFormSubmit);
});

async function handleFormSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData((event.target as HTMLFormElement));

    const userDataObject = convertFormDataToJson(formData);
    const userData: User = userDataObject as unknown as User;

    userData.userName = userData.email;

    try {
        const existingUsers = await userAccount.get() as User[];
        const existingAdmin = await adminAccount.get() as User[];
        const duplicateUser = existingUsers.find(user => user.email === userData.email);
        const duplicateAdmin = existingAdmin.find(user => user.email === userData.email);

        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        
        if (duplicateUser || duplicateAdmin) {
            alert('Email already exists');
            return;
        }

        if (isAdmin) {
            await adminAccount.add(userData);
        } else {
            await userAccount.add(userData);
        }

        if (!isAdmin) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('userEmail', userData.email);

            window.location.href = 'courses.html';
        }

        form?.reset();
        alert('User created successfully');
    } catch (error) {
        console.error('Error creating user', error);
        alert('Error creating user');
    }   
}
