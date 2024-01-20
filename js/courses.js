import { createCard, addImageClickHandler } from "./dom.js";
import HttpClient from "./http.js";
import { initHeader } from "./header.js";

const coursePortfolio = document.querySelector('#courses');

async function initPage() {
    // Initiating the header
    initHeader();

    const courses = await loadCourses();

    courses.forEach((course) => 
        //const userPageCard = createCard(course, 'user-page-card');
        //coursePortfolio.appendChild(userPageCard);
        coursePortfolio.appendChild(createCard(course, 'user-page-card'))
    );

    const images = document.querySelectorAll('.course-image img');
    addImageClickHandler(images);
}

const loadCourses = async () => {
    const url = 'http://Localhost:3000/courses';
    const http = new HttpClient(url);
    const courses = await http.get();
    return courses;
}

document.addEventListener('DOMContentLoaded', initPage);