// =================================
// dom.js - Enhanced dynamic card creation and image click handling
// ================================= 
import { Config, Data } from '../models/uiModels.js';

// Function to create a single element from configuration and data
const createElementFromConfig = (config: Config, data: Data, imageClickHandler?: (data: Data) => void): HTMLElement => {
    const element = document.createElement(config.elementType);
    if (config.className) {
        element.classList.add(config.className);
    }
    if (config.attribute && config.dataField) {
        // Use setAttribute for dynamic assignment
        const attributeValue = config.prefix ? config.prefix + data[config.dataField as keyof Data] : data[config.dataField as keyof Data];
        element.setAttribute(config.attribute, attributeValue.toString());

        if (config.elementType === 'img' && imageClickHandler) {
            element.addEventListener('click', () => imageClickHandler(data));
        }
    } else if (config.textContent) {
        element.textContent = config.textContent.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key as keyof Data].toString());
    }
    return element;
};

export { createElementFromConfig };

// Function to create a dynamic card based on a data object and a configuration array
const createDynamicCard = (data: Data, elementsConfig: Config[], imageClickHandler?: (data: Data) => void): HTMLElement => {
    const card = document.createElement('div');
    card.classList.add('dynamic-card'); // A base class for all dynamic cards
    
    // Set class name for card based on pathname of page to allow for custom styling
    const pathName = window.location.pathname;
    let secondClass = '';
    if(pathName.includes('admin-index')) {
        secondClass = 'admin-card';
    } else if(pathName.includes('courses.html')) {
        secondClass = 'course-card';
    } else if(pathName.includes('course-details.html')) {
        secondClass = 'course-details-card';
    }

    if (secondClass) {
        card.classList.add(secondClass);
    }

    elementsConfig.forEach(config => {
        const element = createElementFromConfig(config, data, imageClickHandler);
        card.appendChild(element);
    });

    return card;
};

export { createDynamicCard };
