// ================================================
// DOM manipulation functions
// ================================================

const createCard = (course) => {                                // function to create card
    const div = document.createElement('div');                  // create div element
    div.classList.add('course-image');                          // add class to div element
    div.appendChild(createImage(course.imageUrl, course.id)); // append image to div element
    div.appendChild(createCourseInfo(course));

    return div;                                                 // return div element to DOM to make visible in HTML
};

const createImage = (imageUrl, courseId, imageAlt) => {         // function to dynamically create image
    const image = document.createElement('img');                // create image element
    image.setAttribute('src', `../assets/images/${imageUrl}`);  // add the folder address to the image ${imageUrl} from json-file
    image.setAttribute('id', courseId);                         // 
    image.setAttribute('alt', imageAlt);                        // add alt text to image from json-file

    return image;
};

// ==============================================================================================
// TODO: Create a more diverse function to allow for more information and more individual styling
// ==============================================================================================
const createCourseInfo = (course) => {                          // function to create course info
    const paragraph = document.createElement('p');              // create paragraph element
    paragraph.appendChild(                                      // append text to paragraph element
        document.createTextNode(`${course.title} ${course.deliveryMethod}`)     // add text to paragraph element from json-file
    );

    return paragraph;
};

const createCourseList = (courses, element) => {
    console.log("Inside createCourseList - courses:", courses);
    console.log("Inside createCourseList - element:", element);
    courses.forEach((course) => {
        const container = createDiv();  // ! Läs på: Ska jag ha argument i createDiv() ex. class
        container.setAttribute('courseId', course.id);
        container.appendChild(createSpan(course.title));
        container.appendChild(createSpan(course.deliveryMethod));
        container.appendChild(createSpan(course.length));           // ! Läs på: antal dagar genererades inte korrekt, läs på om hur jag tar fram antal dagar dynamiskt
        container.appendChild(createSpan(course.startDate));        // ! baserat på start och slutdatum. 
        container.appendChild(createSpan(course.endDate));

        element.appendChild(container);
    });
};

const createDiv = () => {                                       // function to create div element
  return document.createElement('div');                         // create div element to DOM to make visible in HTML
}

const createSpan = (text) => {                                  // function to create span element
    const span = document.createElement('span');                // create span element
    span.innerText = text;                                      // add text to span element

    return span;                                                // return span element to DOM to make visible in HTML
}

const addImageClickHandler = (images) => {                      // function creates a click event handler for each image in the array
    images.forEach((image) => {
        //const src = image.getAttribute('src');                // not needed since the images are loaded from local folder
        const courseId = image.getAttribute('id');              // get the id from the image to be used in location.href

        image.addEventListener('click', () => {
        location.href = `course-details.html?id=${courseId}`;   // redirect to course-details.html with the id of the clicked image
        });
    });
};


// * createCard imported to: 
// * createCourseList imported to:
// * addImageClickHandler imported to:
export { createCard, addImageClickHandler, createCourseList}