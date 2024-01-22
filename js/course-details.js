import HttpClient from "./http.js";
import { initHeader } from "./header.js";

function initPage () {
    initHeader();
    const courseId = location.search.split('=')[1];
    displayCourseDetails(courseId);
}

async function displayCourseDetails(id) {
    const url = 'http://localhost:3000/courses/' + id;
    const http = new HttpClient(url);
    const course = await http.get();
    console.log(course);
}

document.addEventListener('DOMContentLoaded', initPage);