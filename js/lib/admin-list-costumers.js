// =================================
// admin-listcostumers.js function to lists all costumers or boughtcorses with buyers appended
// =================================

import HttpClient from '../utilities/http.js';
import { createDynamicCard } from '../lib/dom.js';
import { initHeader } from '../utilities/header.js';
import { checkAdminLogin } from "../utilities/auth.js";

const initPage = async () => {
    checkAdminLogin();
};

const userSource = new HttpClient('http://localhost:3000/users');
const courseSource = new HttpClient('http://localhost:3000/courses');
const courseListContainer = document.getElementById('course-list');

document.getElementById('list-costumers').addEventListener('click', async () => {
    try {
        const users = await userSource.get();
        courseListContainer.innerHTML = '';
        users.forEach(user => {
            const { purchasedCourses, ...userInfo } = user;
            const card = createDynamicCard(userInfo, [
                { elementType: 'h2', textContent: '{{firstName}} {{lastName}}' },
                { elementType: 'p', textContent: 'Email: {{email}}' },
                { elementType: 'p', textContent: 'Phone: {{phone}}' },
                { elementType: 'p', textContent: 'Address: {{invoiceAdress}}' },
                { elementType: 'p', textContent: 'City: {{invoiceCity}}' },
                { elementType: 'p', textContent: 'Zip: {{invoiceZip}}' },
                { elementType: 'p', textContent: 'Country: {{invoiceCountry}}' },
            ]);
            card.className = 'cardListOfCostumers';
            courseListContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to list customers:', error);
    }
});

document.getElementById('list-bought-courses').addEventListener('click', async () => {
    try {
        const users = await userSource.get();
        const courses = await courseSource.get(); 
        courseListContainer.innerHTML = '';
        const coursesMap = new Map();

        courses.forEach(course => { 
        });

        users.forEach(user => { 
            user.purchasedCourses.forEach(purchase => {
                if (!coursesMap.has(purchase.title)) {
                    let courseDetails = courses.find(course => course.title === purchase.title);
                    if (courseDetails) { 
                        coursesMap.set(purchase.title, {
                            ...courseDetails,
                            purchasers: [{
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                phone: user.phone,
                                delivery: purchase.delivery
                            }]
                        });
                    }
                } else { 
                    coursesMap.get(purchase.title).purchasers.push({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                        delivery: purchase.delivery
                    });
                }
            });
        });

        coursesMap.forEach((course, title) => { // Only displays courses that were actually purchased
            const courseElement = document.createElement('div');
            courseElement.className = 'cardCoursePurchaseInfo';
            courseElement.innerHTML = `<h2 class="purchaseInfo">${title}</h2>
                                       <p class="purchaseInfo">Delivery: ${course.delivery}</p>
                                       <p class="purchaseInfo">Price: $${course.price}</p>
                                       <p class="purchaseInfo"> Course days: ${course.automatedDaysCount}</p>
                                       <p class="purchaseInfo">Course registration number: ${course.reg}</p>
                                       <h3 class="purchaseInfo">Purchased By:</h3>`;
            const purchasersList = document.createElement('ul');
            purchasersList.className = 'purchaseInfoList';
            course.purchasers.forEach((purchaser, index) => {
                const purchaserItem = document.createElement('li');
                purchaserItem.className = 'purchaseInfoListItem';
                purchaserItem.textContent = `${purchaser.firstName} ${purchaser.lastName} - ${purchaser.email}, ${purchaser.phone}, ${purchaser.delivery}`;
                purchasersList.appendChild(purchaserItem);
            });
            courseElement.appendChild(purchasersList);
            courseListContainer.appendChild(courseElement);
        });
    } catch (error) {
        console.error('Failed to list bought courses:', error);
    }
});

document.addEventListener('DOMContentLoaded', initPage);