import { convertFormDataToJson } from '../utilities/utilities.js';
import HttpClient from '../utilities/http.js';
import { initHeader } from '../utilities/header.js'; // ! hur kommer det sig att denna laddar utan att jag kallar på den?

const httpClient = new HttpClient('http://localhost:3000/users');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#userForm');
    form.addEventListener('submit', handleFormSubmit);
});

async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = convertFormDataToJson(formData);

    // setting the email as username
    userData.userName = userData.email;

    try {
        // check if user email already exists
        const existingUsers = await httpClient.get();
        const duplicateUser = existingUsers.find(user => user.email === userData.email);

        if (duplicateUser) {
            alert('Email already exists');
            return;
        }

        const newUser = await httpClient.add(userData);
        console.log('user created succesfuly', newUser);

        // Automatic login after account creation
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'false');
        localStorage.setItem('userEmail', userData.email);

        window.location.href = 'courses.html';

        //clearing the form and giving feedback to user
        event.target.reset();
        alert('User created successfully');
    } catch (error) {
        console.error('Error creating user', error);
        alert('Error creating user');
    }   
}