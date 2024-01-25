import HttpClient from "../utilities/http.js";
import { initHeader } from "../utilities/header.js";
import { setupClickableElements } from "../utilities/interactionHandler.js";
import { createDynamicCard } from "./dom.js";


// Configuration for the course card to use the same createDynamicCard function in dom.js
const coursesCardConfig = [
    { elementType: 'h3', textContent: '{{title}}', className: 'course-title' },
    { elementType: 'img', attribute: 'src', dataField: 'imageUrl', prefix: '../assets/images/', className: 'course-image' },
    { elementType: 'p', textContent: 'Delivery Method: {{delivery}}', className: 'course-delivery' },
    { elementType: 'p', textContent: 'Start Date: {{startDate}} | End Date: {{endDate}}', className: 'course-dates' },
    // add more or different
];



const initPage = async () => {
    initHeader();

    const url = `http://localhost:3000/courses/`;
    const http = new HttpClient(url);
    const courses = await http.get();

    courses.forEach(course => {
        const courseDetailCard = createDynamicCard(course, coursesCardConfig);
        courseDetailCard.setAttribute('courseId', course.id); // Set courseId attribute for click handling
        document.querySelector('#courses-gallery').appendChild(courseDetailCard);
    });

    // Setup click listeners after the cards are created and appended
    setupClickableElements(
        '#courses-gallery', 
        '[courseId]', 
        'courseId', 
        'course-details.html'
    );
};

document.addEventListener('DOMContentLoaded', initPage);