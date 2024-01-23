import HttpClient from "../utilities/http.js";
import { initHeader } from "../utilities/header.js";
import { setupClickableElements } from "../utilities/interactionHandler.js";
import { createDynamicCard } from "./dom.js";

// I no logger show the admin buttons for people who are not logged in as admin
// But i keep this in case someone has the link to the page :)
function checkAdminLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isAdmin = localStorage.getItem('isAdmin');
    if (isLoggedIn !== 'true' || isAdmin !== 'true') {
        window.location.href = 'index.html';
        alert('Please log in as admin to access this page.');
    }
}

// Configuration for the course card to use the same createDynamicCard function in dom.js
const courseCardConfig = [
    { elementType: 'h3', className: 'course-title', textContent: '{{title}}' },
    { elementType: 'span', className: 'course-detail', textContent: 'Delivery Method: {{delivery}}' },
    { elementType: 'span', className: 'course-dates', textContent: 'Start Date: {{startDate}} - End Date: {{endDate}}' },
];

const initPage = async() => {
    checkAdminLogin();
    initHeader();
    
    const url = 'http://localhost:3000/courses';
    const http = new HttpClient(url);
    const courses = await http.get();

    //Create and append course cards with the createDynamicCard function
    courses.forEach(course => {
        const card = createDynamicCard(course,courseCardConfig);
        card.setAttribute('courseId', course.id); // Set courseId attribute for click handling
        document.querySelector('#courses').appendChild(card);
    });

    // Setup click listeners after the cards are created and appended
    setupClickableElements('#courses', 'div[courseId]', 'courseId', 'admin-edit-course.html');

};

document.addEventListener('DOMContentLoaded', initPage);
