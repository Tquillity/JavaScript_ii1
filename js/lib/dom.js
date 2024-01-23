// dom.js - Enhanced dynamic card creation and image click handling

// Function to create a single element from configuration and data
const createElementFromConfig = (config, data, imageClickHandler) => {
    const element = document.createElement(config.elementType);
    if (config.className) {
        element.classList.add(config.className);
    }
    if (config.attribute) {
        element[config.attribute] = config.prefix ? config.prefix + data[config.dataField] : data[config.dataField];
        if (config.elementType === 'img' && imageClickHandler) {
            element.addEventListener('click', () => imageClickHandler(data));
        }
    } else if (config.textContent) {
        element.textContent = config.textContent.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key]);
    }
    return element;
};

// Function to create a dynamic card based on a data object and a configuration array
const createDynamicCard = (data, elementsConfig, imageClickHandler) => {
    const card = document.createElement('div');
    card.classList.add('dynamic-card'); // A base class for all dynamic cards

    elementsConfig.forEach(config => {
        const element = createElementFromConfig(config, data, imageClickHandler);
        card.appendChild(element);
    });

    return card;
};


export { createDynamicCard };
