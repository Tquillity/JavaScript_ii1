// =================================
// admin-edit-course.js is used to add, edit and delete courses from the json-server database.
// =================================

import HttpClient from "../utilities/http.js";
import { initHeader } from "../utilities/header.js";
import { convertFormDataToJson } from "../utilities/utilities.js";
import { calculateCourseDays } from "../utilities/dateFunction.js";
import { checkAdminLogin } from "../utilities/auth.js";

const form = document.querySelector('#updateCourseForm');
const deleteButton = document.querySelector('#deleteButton');

let courseId = 0;

const initpage = async () => {
    checkAdminLogin();

    courseId = location.search.split('=')[1];
    
    if (!courseId) {
        form.reset();
        return;
    }

    getCourse(courseId);
};

const getCourse = async (id) => {
    const url = `http://localhost:3000/courses/${id}`;
    const http = new HttpClient(url);
    const course = await http.get();
    loadDataToForm(course);
};

const loadDataToForm = (course) => {
    const entries = new URLSearchParams(course).entries();
    for (let [key, value] of entries) {
        if (key !== 'id') {
            const input = form.elements[key];
            input.value = value;
        }
    }

    calculateCourseDays();
};

const updateCourse = async (event) => {
    event.preventDefault();

    const course = new FormData(form);
    const obj = convertFormDataToJson(course);

    const url = `http://localhost:3000/courses/${courseId}`;
    const http = new HttpClient(url);
    await http.update(obj);
    
    location.href = './admin-index.html';
};

const createCourse = async (event) => {
    event.preventDefault();

    const course = new FormData(form);
    const obj = convertFormDataToJson(course);

    const url = `http://localhost:3000/courses`;
    const http = new HttpClient(url);
    await http.add(obj);
    
    location.href = './admin-index.html'; 
}

const deleteCourse = async () => {
    const url = `http://localhost:3000/courses/${courseId}`;
    const http = new HttpClient(url);
    await http.delete();

    location.href = './admin-index.html';
};

document.addEventListener('DOMContentLoaded', initpage);
document.getElementById('startDate').addEventListener('change', calculateCourseDays); // When either of the dates are changed, the function calculateCourseDays is called
document.getElementById('endDate').addEventListener('change', calculateCourseDays);   // to calculate the number of days between the dates and the number of working days.
                                                                                      // it also updates the form field "automatedDaysCount" with the number of days.

document.getElementById('clearFormButton').addEventListener('click', function() {     // When the clear form button is clicked, the form is reset to placeholder values.
document.getElementById('updateCourseForm').reset();
});

editButton.addEventListener('click', updateCourse);
createButton.addEventListener('click', createCourse);
deleteButton.addEventListener('click', deleteCourse);

