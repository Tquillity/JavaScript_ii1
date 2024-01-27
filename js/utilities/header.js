// =================================
// header.js - header for all pages
// ================================= 

import { handleLoginSubmit } from './log-in.js';

export function initHeader() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const headerNav = `
    <nav class="headerNav">
        <div class="hamburger">&#9776;</div>
        <div class="header-container">
            <ul class="menu">
                <li class="menu-item"><a href="index.html">Home</a></li>
                <li class="menu-item"><a href="courses.html">Courses</a></li>
                ${!isLoggedIn ?
                    `
                    <li class="menu-item"><a href="user-creation.html">Create Account</a></li>
                    <li class="menu-item"><a href="#" id="showLoginForm">Login</a></li>
                    <form id="loginForm" class="hidden loginForm">
                        <input type="email" id="loginEmail" placeholder="Email" required>
                        <input type="password" id="loginPassword" placeholder="Password" required>
                        <button type="submit">Login</button>
                    </form>
                    ` : ""
                }
                ${isAdmin ?
                    `
                    <li class="menu-item nav-admin"><a href="admin-index.html">Course Administration</a></li>
                    <li class="menu-item nav-admin"><a href="admin-list-costumers.html">Customers</a></li>
                    <li class="menu-item nav-admin"><a href="admin-user-creation.html">Add Admin Users</a></li>
                    ` : ""
                }
                ${isLoggedIn ?
                    `<li class="menu-item"><a href="#" id="logout">Logout</a></li>` : ""
                }
            </ul>
        </div>
    </nav>
    `;

    document.getElementById('header-nav-placeholder').innerHTML = headerNav;
    attachEventListeners();
    toggleHamburgerMenu();
}

function toggleHamburgerMenu() {
    
    document.querySelector('.hamburger').addEventListener('click', () => {
        console.log('Hamburger clicked');
        document.querySelector('.header-container').classList.toggle('active');
    });
}

function attachEventListeners() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit); // Original code for handling login submission
    }

    const showLoginForm = document.getElementById('showLoginForm');
    if (showLoginForm) {
        showLoginForm.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').classList.toggle('hidden');
        });
    }

    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('adminEmail');
            window.location.href = 'index.html';
        });
    }

    document.addEventListener('keydown', (e) => { 
        if (e.key === "Escape") { 
            document.getElementById('loginForm').classList.add('hidden'); 
        }
    });

    document.addEventListener('click', (e) => { 
        const loginForm = document.getElementById('loginForm');
        const showLoginFormButton = document.getElementById('showLoginForm');
        if (loginForm && showLoginFormButton) {
            if (!loginForm.contains(e.target) && !showLoginFormButton.contains(e.target) && !loginForm.classList.contains('hidden')) { 
                loginForm.classList.add('hidden'); 
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', initHeader);
