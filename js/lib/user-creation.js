// =================================
// user-creation.js - form for creating new users
// ================================= 

import { convertFormDataToJson } from '../utilities/utilities.js';
import HttpClient from '../utilities/http.js';
import { initHeader } from '../utilities/header.js'; // ! hur kommer det sig att denna laddar utan att jag kallar på den?

const userAccount = new HttpClient('http://localhost:3000/users');
const adminAccount = new HttpClient('http://localhost:3000/adminUsers');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#userCreationForm');
    form.addEventListener('submit', handleFormSubmit);
});

async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = convertFormDataToJson(formData);

    // setting the email as username
    userData.userName = userData.email;

    try {
        // check if user/admin email already exists
        const existingUsers = await userAccount.get();
        const existingAdmin = await adminAccount.get();
        const duplicateUser = existingUsers.find(user => user.email === userData.email);
        const duplicateAdmin = existingAdmin.find(user => user.email === userData.email);

        // check if admin user
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        
        if (duplicateUser || duplicateAdmin) {
            alert('Email already exists');
            return;
        }

       if (isAdmin) {
            const newAdminUser = await adminAccount.add(userData);
        } else {
            const newUser = await userAccount.add(userData);
        }

        // Automatic login after account creation
        if (!isAdmin) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('userEmail', userData.email);

            window.location.href = 'courses.html';
        }

        //clearing the form and giving feedback to user
        event.target.reset();
        alert('User created successfully');
    } catch (error) {
        console.error('Error creating user', error);
        alert('Error creating user');
    }   
}