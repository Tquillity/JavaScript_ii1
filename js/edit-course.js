import HttpClient from "./http.js";
import { convertFormDataToJson } from "./utilities.js";
import { calculateCourseDays } from "./dateFunction.js";

const form = document.querySelector('#updateCourseForm');
const deleteButton = document.querySelector('#deleteButton');

let courseId = 0;

const initpage = async () => {
    courseId = location.search.split('=')[1];
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
            console.log(key, value);
            console.log(form.elements[key]);
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
form.addEventListener('submit', updateCourse);
deleteButton.addEventListener('click', deleteCourse);

