// =================================
// course-details.ts shows the indivudal details for a chosen course
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
import { createDynamicCard } from "../lib/dom.js";
const detailedCourseCardConfig = [
    { elementType: 'h3', textContent: '{{title}}', className: 'course-title' },
    { elementType: 'img', attribute: 'src', dataField: 'imageUrl', prefix: '../assets/images/', className: 'course-image' },
    { elementType: 'span', className: 'course-detail', textContent: 'Reg: {{reg}}' },
    { elementType: 'span', className: 'course-detail', textContent: 'Delivery Method: {{delivery}}' },
    { elementType: 'span', className: 'course-dates', textContent: 'Start Date: {{startDate}} | End Date: {{endDate}}' },
    { elementType: 'span', className: 'course-days', textContent: 'Days: {{automatedDaysCount}}' },
    { elementType: 'span', className: 'course-price', textContent: 'Price: ${{price}}' },
    { elementType: 'p', className: 'course-description', textContent: '{{description}}' },
];
let courseId = 0;
const initPage = () => __awaiter(void 0, void 0, void 0, function* () {
    courseId = parseInt(location.search.split('=')[1]);
    getCourse(courseId);
    initHeader();
});
const getCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `http://localhost:3000/courses/${id}`;
    const http = new HttpClient(url);
    const course = yield http.get();
    displayCourseDetails(course);
});
const displayCourseDetails = (course) => {
    const container = document.getElementById('course-detail-container');
    const detailCard = createDynamicCard(course, detailedCourseCardConfig);
    if (container) {
        //Dynamically add the buy button based on delivery method
        switch (course.delivery) {
            case "Classroom":
                addBuyButton(detailCard, "Buy Classroom Course", course, "Classroom");
                break;
            case "Online":
                addBuyButton(detailCard, "Buy Online Course", course, "Online");
                break;
            case "Both":
                addBuyButton(detailCard, "Buy Classroom Course", course, "Classroom");
                addBuyButton(detailCard, "Buy Online Course", course, "Online");
                break;
            default:
                console.error("Invalid delivery method");
        }
        container.appendChild(detailCard);
    }
};
function addBuyButton(card, buttonText, course, deliveryMethod) {
    const button = document.createElement('button');
    button.className = 'buyButton';
    button.textContent = buttonText;
    card.appendChild(button);
    button.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Retrieve user's email from localStorage
        const userEmail = localStorage.getItem('userEmail');
        const usersHttpClient = new HttpClient(`http://localhost:3000/users`);
        const adminEmail = localStorage.getItem('adminEmail');
        const adminUsersHttpClient = new HttpClient(`http://localhost:3000/adminUsers`);
        try {
            // Fetch all users
            const users = yield usersHttpClient.get();
            const adminUsers = yield adminUsersHttpClient.get();
            // Find the user object based on the email
            const user = users.find((u) => u.email === userEmail);
            const admin = adminUsers.find((u) => u.email === adminEmail);
            if (admin) {
                alert('You do not need to buy this course.\n Since you are an admin all courses are free.\n !! HUURRAAAYYYY !!\n (snacka med Berit på sju:an, hon fixar in dig)');
                return;
            }
            else if (!user) {
                alert('User not found. Please log in to buy a course.');
                return;
            }
            // Check if the course is already in the purchasedCourses array
            const courseAlreadyPurchased = (_a = user.purchasedCourses) === null || _a === void 0 ? void 0 : _a.some(purchasedCourse => purchasedCourse.reg === course.reg);
            if (courseAlreadyPurchased) {
                alert('You have already purchased this course.');
                return; // Prevent further execution
            }
            console.log('1', course);
            // Prepare updated user data with new course info
            const updatedUserData = Object.assign(Object.assign({}, user), { purchasedCourses: [
                    ...(user.purchasedCourses || []),
                    {
                        reg: course.reg,
                        title: course.title,
                        delivery: deliveryMethod, // Fetch the delivery method from the button so "both" does not read in "both" from json file
                        price: course.price
                    }
                ] });
            // Update the user data on the server
            yield new HttpClient(`http://localhost:3000/users/${user.id}`).update(updatedUserData);
            alert('Course purchased successfully!');
        }
        catch (error) {
            console.error('Failed to update user data:', error);
            alert('An error occurred while purchasing the course.');
        }
    }));
}
document.addEventListener('DOMContentLoaded', initPage);
