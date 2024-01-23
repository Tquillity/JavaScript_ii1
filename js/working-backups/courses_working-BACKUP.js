import { createCard, addImageClickHandler } from "../lib/dom.js";
import HttpClient from "../utilities/http.js";
import { initHeader } from "../utilities/header.js";

const coursePortfolio = document.querySelector('#courses-gallery');

async function initPage() {
    // Initiating the header
    initHeader();

    const courses = await loadCourses();

    courses.forEach((course) => 
        //const userPageCard = createCard(course, 'user-page-card');
        //coursePortfolio.appendChild(userPageCard);
        coursePortfolio.appendChild(createCard(course, 'user-page-card')) // This is the same as the two lines above
    );

    const images = document.querySelectorAll('.user-page-card img');
    addImageClickHandler(images);
}

const loadCourses = async () => {
    const url = 'http://Localhost:3000/courses';
    const http = new HttpClient(url);
    const courses = await http.get();
    return courses;
}

document.addEventListener('DOMContentLoaded', initPage);
