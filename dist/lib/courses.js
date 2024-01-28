// =================================
// courses.js Gallery page for the courses, lists all courses in database
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
import { initHeader } from "../utilities/header.js";
import { setupClickableElements } from "../utilities/interactionHandler.js";
import { createDynamicCard } from "../lib/dom.js";
// Configuration for the course card to use the same createDynamicCard function in dom.js
const coursesCardConfig = [
    { elementType: 'h3', textContent: '{{title}}', className: 'course-title' },
    { elementType: 'img', attribute: 'src', dataField: 'imageUrl', prefix: '../assets/images/', className: 'course-image' },
    { elementType: 'p', textContent: 'Delivery Method: {{delivery}}', className: 'course-delivery' },
    { elementType: 'p', textContent: 'Start Date: {{startDate}} | End Date: {{endDate}}', className: 'course-dates' },
];
const filterPopularCourses = (courses) => {
    return courses.filter(course => course.popular === true);
};
const displayCourses = (courses) => {
    const gallery = document.querySelector('#courses-gallery');
    gallery.innerHTML = ''; // Clearing the gallery before adding new cards
    courses.forEach(course => {
        const courseDetailCard = createDynamicCard(course, coursesCardConfig);
        courseDetailCard.setAttribute('courseId', course.id.toString()); // Set courseId attribute for click handling
        gallery.appendChild(courseDetailCard);
    });
};
const initPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `http://localhost:3000/courses/`;
    const http = new HttpClient(url);
    const courses = yield http.get();
    initHeader();
    displayCourses(courses);
    const filterPopularButton = document.querySelector('#filter-popular');
    if (filterPopularButton) {
        filterPopularButton.addEventListener('click', () => {
            const popularCourses = filterPopularCourses(courses);
            displayCourses(popularCourses);
        });
    }
    // Setup click listeners after the cards are created and appended
    setupClickableElements('#courses-gallery', '[courseId]', 'courseId', 'course-details.html');
});
document.addEventListener('DOMContentLoaded', initPage);
