// =================================
// log-in.ts - handles login and admin login
// ================================= 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import HttpClient from "../utilities/http.js";
function handleLoginSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const users = yield userClient.get();
            const admins = yield adminClient.get();
            // Explicitly defining the types for user and admin in the find method
            const user = users.find((user) => user.email === email && user.password === password);
            const admin = admins.find((admin) => admin.email === email && admin.password === password);
            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', 'false');
                localStorage.setItem('userEmail', email);
                window.location.href = 'courses.html';
            }
            else if (admin) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('adminEmail', email);
                window.location.href = 'admin-index.html';
            }
            else {
                alert('Login failed: Invalid email or password.');
            }
        }
        catch (error) {
            alert('Login error');
        }
    });
}
export { handleLoginSubmit };
