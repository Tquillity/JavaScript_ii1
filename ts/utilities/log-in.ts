// =================================
// log-in.ts - handles login and admin login
// ================================= 

import HttpClient from "../utilities/http.js";
import { User, Admin } from "../models/models.js";

async function handleLoginSubmit(event: Event): Promise<void> {
    event.preventDefault();

    // Ensuring the elements exist and are of the correct type
    const emailElement = document.querySelector('#loginEmail');
    const passwordElement = document.querySelector('#loginPassword');

    if (!(emailElement instanceof HTMLInputElement) || !(passwordElement instanceof HTMLInputElement)) {
        console.error('Email or password input not found');
        return;
    }

    const email = emailElement.value;
    const password = passwordElement.value;

    const userClient = new HttpClient('http://localhost:3000/users');
    const adminClient = new HttpClient('http://localhost:3000/adminUsers');

    try {
        const users: User[] = await userClient.get();
        const admins: Admin[] = await adminClient.get();

        // Explicitly defining the types for user and admin in the find method
        const user = users.find((user: User) => user.email === email && user.password === password);
        const admin = admins.find((admin: Admin) => admin.email === email && admin.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('userEmail', email);
            window.location.href = 'courses.html';
        } else if (admin) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('adminEmail', email);
            window.location.href = 'admin-index.html';
        } else {
            alert('Login failed: Invalid email or password.');
        }
    } catch (error: any) {
        alert('Login error');
    }
}

export { handleLoginSubmit };
