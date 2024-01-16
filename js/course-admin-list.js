import HttpClient from "./http.js";
import { createCourseList } from "./dom.js";

const initPage = async() => {
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
    location.href = `edit-courses.html?id=${courseId}`;
};

document.addEventListener('DOMContentLoaded', initPage);