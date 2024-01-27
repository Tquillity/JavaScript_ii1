// =================================
// admin-index.js starting page for the admin, lists current courses in databas
// =================================

import HttpClient from "../utilities/http.js";
import { initHeader } from "../utilities/header.js";
import { setupClickableElements } from "../utilities/interactionHandler.js";
import { createDynamicCard } from "./dom.js";
import { checkAdminLogin } from "../utilities/auth.js";

// Configuration for the course card to use the same createDynamicCard function in dom.js
const courseCardConfig = [
    { elementType: 'h3', className: 'course-title', textContent: '{{title}}' },
    { elementType: 'span', className: 'course-detail', textContent: 'Delivery Method: {{delivery}}' },
    { elementType: 'span', className: 'course-dates', textContent: 'Start Date: {{startDate}}'},
    { elementType: 'span', className: 'course-dates', textContent: 'End Date: {{endDate}}' },
];

const initPage = async() => {
    checkAdminLogin();
    
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
