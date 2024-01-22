import { convertFormDataToJson } from './utilities.js';
import HttpClient from './http.js';
import { initHeader } from './header.js';

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
        const newUser = await httpClient.add(userData);
        console.log('user created succesfuly', newUser);

        //clearing the form and giving feedback to user
        event.target.reset();
        alert('User created successfully');
    } catch (error) {
        console.error('Error creating user', error);
        alert('Error creating user');
    }   
}