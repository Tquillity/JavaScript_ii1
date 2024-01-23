import HttpClient from "../utilities/http.js";
import { createCourseList } from "../lib/dom.js";
import { initHeader } from "../utilities/header.js";

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

const initPage = async() => {

    // check if user is logged in as admin
    checkAdminLogin();
    // Initiating the header
    initHeader();
    
    const url = 'http://localhost:3000/courses';
    const http = new HttpClient(url);

    // fetch all courses
    const courses = await http.get();
    console.log(courses);
    createCourseList(courses, document.querySelector('#courses'));

    // fetch all elements
    const cards = document.querySelectorAll('#courses div');

    // add click event to all elements
    cards.forEach((card => {
        card.addEventListener('click', selectedCourse);
    }));
};

const selectedCourse = (event) => {
    let courseId = 0;
    if (event.target.localName === 'div') {
        courseId = event.target.getAttribute('courseId');
    } else if (event.target.localName === 'span') {
        courseId = event.target.parentElement.getAttribute('courseId');
    }

    // navigate to edit-courses.html
    location.href = `admin-edit-course.html?id=${courseId}`;
};

document.addEventListener('DOMContentLoaded', initPage);