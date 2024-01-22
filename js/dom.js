// ================================================
// DOM manipulation functions
// ================================================

const createCard = (course, cardClassName) => {                                // function to create card
    const courseCard = document.createElement('div');                  // create div element
    
    // if function to allow me to name classes as card is created to allow for
    // more individual styling (user/admin)
    if(cardClassName) {
        courseCard.classList.add(cardClassName);
    } else {
    courseCard.classList.add('default-container');
    }   
    courseCard.appendChild(createImage(course.imageUrl, course.id)); // append image to div element
    courseCard.appendChild(createCourseInfo(course));
    courseCard.appendChild(createSpan(`Starting date: ${course.startDate}`));        // ! Läs på: antal dagar genererades inte korrekt, läs på om hur jag tar fram antal dagar dynamiskt
    courseCard.appendChild(createSpan(`Ending date: ${course.endDate}`));          // ! baserat på start och slutdatum.

    return courseCard;                                                 // return div element to DOM to make visible in HTML
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
        document.createTextNode(`${course.title} ${course.delivery}`)     // add text to paragraph element from json-file
    );

    return paragraph;
};

const createCourseList = (courses, element) => {
    courses.forEach((course) => {
        const container = createDiv();  // ! Läs på: Ska jag ha argument i createDiv() ex. class
        container.setAttribute('courseId', course.id);
        container.appendChild(createSpan(`Course: ${course.title}`));
        container.appendChild(createSpan(course.delivery));           
        container.appendChild(createSpan(`Starting date: ${course.startDate}`));        // ! Läs på: antal dagar genererades inte korrekt, läs på om hur jag tar fram antal dagar dynamiskt
        container.appendChild(createSpan(`Ending date: ${course.endDate}`));          // ! baserat på start och slutdatum. 
        container.appendChild(createSpan(`Course length:${course.automatedDaysCount}`)); // work days (including weekends)`)); // ! replace with icon for pop-up for better graphical clarity



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
        const src = image.getAttribute('src');                // not needed since the images are loaded from local folder
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