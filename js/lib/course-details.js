import HttpClient from "../utilities/http.js";
import { initHeader } from "../utilities/header.js";
import { createDynamicCard } from "./dom.js";

const detailedCourseCardConfig = [
    { elementType: 'h3', textContent: '{{title}}', className: 'course-title' },
    { elementType: 'img', attribute: 'src', dataField: 'imageUrl', prefix: '../assets/images/', className: 'course-image' },
    { elementType: 'span', className: 'course-detail', textContent: 'Reg: {{reg}}' },
    { elementType: 'span', className: 'course-detail', textContent: 'Delivery Method: {{delivery}}' },
    { elementType: 'span', className: 'course-dates', textContent: 'Start Date: {{startDate}} - End Date: {{endDate}}' },
    { elementType: 'span', className: 'course-days', textContent: 'Days: {{automatedDaysCount}}' },
    { elementType: 'span', className: 'course-price', textContent: 'Price: ${{price}}' },
    { elementType: 'p', className: 'course-description', textContent: '{{description}}' },
    { elementType: 'button', className: 'buyButton', textContent: 'Buy Course' },
    ];

let courseId = 0;

const initPage = async () => {
    initHeader();
    courseId = location.search.split('=')[1];
    getCourse(courseId);
};

const getCourse = async (id) => {
    const url = `http://localhost:3000/courses/${id}`;
    const http = new HttpClient(url);
    const course = await http.get();
    displayCourseDetails(course);
};

const displayCourseDetails = (course) => {
    const container = document.getElementById('course-detail-container');
    const detailCard = createDynamicCard(course, detailedCourseCardConfig);
    container.appendChild(detailCard);
};

document.addEventListener('DOMContentLoaded', initPage);