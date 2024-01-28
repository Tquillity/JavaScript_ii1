// =================================
// user-creation.js - form for creating new users
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
import { convertFormDataToJson } from '../utilities/utilities.js';
import HttpClient from '../utilities/http.js';
import { initHeader } from '../utilities/header.js';
import { checkAdminLogin } from '../utilities/auth.js';
initHeader();
const userAccount = new HttpClient('http://localhost:3000/users');
const adminAccount = new HttpClient('http://localhost:3000/adminUsers');
let form;
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('admin-user-creation.html')) {
        checkAdminLogin();
    }
    form = document.querySelector('#userCreationForm');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', handleFormSubmit);
});
function handleFormSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userDataObject = convertFormDataToJson(formData);
        const userData = userDataObject;
        userData.userName = userData.email;
        try {
            const existingUsers = yield userAccount.get();
            const existingAdmin = yield adminAccount.get();
            const duplicateUser = existingUsers.find(user => user.email === userData.email);
            const duplicateAdmin = existingAdmin.find(user => user.email === userData.email);
            const isAdmin = localStorage.getItem('isAdmin') === 'true';
            if (duplicateUser || duplicateAdmin) {
                alert('Email already exists');
                return;
            }
            if (isAdmin) {
                yield adminAccount.add(userData);
            }
            else {
                yield userAccount.add(userData);
            }
            if (!isAdmin) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', 'false');
                localStorage.setItem('userEmail', userData.email);
                window.location.href = 'courses.html';
            }
            form === null || form === void 0 ? void 0 : form.reset();
            alert('User created successfully');
        }
        catch (error) {
            console.error('Error creating user', error);
            alert('Error creating user');
        }
    });
}
