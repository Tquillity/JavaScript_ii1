// =================================
// course-details.ts shows the indivudal details for a chosen course
// =================================

import HttpClient from "../utilities/http.js";
import { initHeader } from "../utilities/header.js";
import { createDynamicCard } from "../lib/dom.js";
import { DetailedCourse, User } from "../models/models.js";

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

    let courseId: number = 0;

const initPage = async (): Promise<void> => {
    courseId = parseInt(location.search.split('=')[1]);
    getCourse(courseId);
    initHeader();
};

const getCourse = async (id: number): Promise<void> => {
    const url = `http://localhost:3000/courses/${id}`;
    const http = new HttpClient(url);
    const course = await http.get();
    displayCourseDetails(course);
};

const displayCourseDetails = (course: DetailedCourse): void => {
    const container = document.getElementById('course-detail-container')!;
    const detailCard = createDynamicCard(course, detailedCourseCardConfig);

    if (container) {
        //Dynamically add the buy button based on delivery method
        switch (course.delivery) {
            case "Classroom":
                addBuyButton(detailCard, "Buy Classroom Course", course, "Classroom");
                break;
            case "Online":
                addBuyButton(detailCard, "Buy Online Course", course,"Online");
                break;
            case "Both":
                addBuyButton(detailCard, "Buy Classroom Course",course, "Classroom");
                addBuyButton(detailCard, "Buy Online Course", course, "Online");
                break;
            default:
                console.error("Invalid delivery method");
        }

        container.appendChild(detailCard);
    }
};

function addBuyButton(card: HTMLElement, buttonText: string, course: DetailedCourse, deliveryMethod: string): void {
    const button = document.createElement('button');
    button.className = 'buyButton';
    button.textContent = buttonText;
    card.appendChild(button);

    button.addEventListener('click', async () => {
        // Retrieve user's email from localStorage
        const userEmail = localStorage.getItem('userEmail');
        const usersHttpClient = new HttpClient(`http://localhost:3000/users`);
        const adminEmail = localStorage.getItem('adminEmail');
        const adminUsersHttpClient = new HttpClient(`http://localhost:3000/adminUsers`);

        try {
            // Fetch all users
            const users = await usersHttpClient.get() as User[];
            const adminUsers = await adminUsersHttpClient.get() as User[];
            // Find the user object based on the email
            const user = users.find((u: User) => u.email === userEmail);
            const admin = adminUsers.find((u: User) => u.email === adminEmail);

            if(admin) {
                alert('You do not need to buy this course.\n Since you are an admin all courses are free.\n !! HUURRAAAYYYY !!\n (snacka med Berit på sju:an, hon fixar in dig)');
                return;
            } else if (!user) {
                alert('User not found. Please log in to buy a course.');
                return;
            }


            // Check if the course is already in the purchasedCourses array
            const courseAlreadyPurchased = user.purchasedCourses?.some(purchasedCourse => purchasedCourse.reg === course.reg);

            if (courseAlreadyPurchased) {
                alert('You have already purchased this course.');
                return; // Prevent further execution
            }
            console.log('1', course)
            // Prepare updated user data with new course info
            const updatedUserData = {
                ...user,
                purchasedCourses: [
                    ...(user.purchasedCourses || []),
                    {
                        reg: course.reg,
                        title: course.title,
                        delivery: deliveryMethod,   // Fetch the delivery method from the button so "both" does not read in "both" from json file
                        price: course.price
                    }
                ]
            };

            // Update the user data on the server
            await new HttpClient(`http://localhost:3000/users/${user.id}`).update(updatedUserData);
            alert('Course purchased successfully!');
        } catch (error) {
            console.error('Failed to update user data:', error);
            alert('An error occurred while purchasing the course.');
        }
    });
}



document.addEventListener('DOMContentLoaded', initPage);

export {}; // To prevent leaking of variables to global scope