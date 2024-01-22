import { handleLoginSubmit } from './log-in.js';

export function initHeader() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const headerNav = `
    <nav class="headerNav">
        <div class="container">
            <ul class="menu">
                <li class="menu-item"><a href="index.html">Home</a></li>
                <li class="menu-item"><a href="courses.html">Courses</a></li>
                ${isLoggedIn ?
                    `<li class="menu-item"><a href="#" id="logout">Logout</a></li>` :
                    `
                    <li class="menu-item"><a href="user-creation.html">Create Account</a></li>
                    <li class="menu-item"><a href="#" id="showLoginForm">Login</a></li>
                        <form id="loginForm" class="hidden loginForm">
                            <input type="email" id="loginEmail" placeholder="Email" required>
                            <input type="password" id="loginPassword" placeholder="Password" required>
                            <button type="submit">Login</button>
                        </form>
                    `
                }
                <li class="menu-item nav-admin"><a href="admin-index.html">--==||  Admin  ||==--</a></li>
            </ul>
        </div>
    </nav>
    `;

    document.getElementById('header-nav-placeholder').innerHTML = headerNav;
    attachEventListeners();
}

function attachEventListeners() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
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
            window.location.href = 'index.html';
        });
    }
}


document.addEventListener('DOMContentLoaded', initHeader);