// =================================
//  interactionHandler.js - Handles interactions like clicks on course cards
// ================================= 

// TODO kanske värt att lära sig och nyttja?
/** --> JSDoc (https://jsdoc.app/) 
 * Attaches a click event listener to elements matching a selector within a container,
 * redirecting to a specified URL, appending the element's data attribute as a query parameter.
 * @param {string} containerSelector - The selector for the container of clickable elements.
 * @param {string} clickableSelector - The selector for the clickable elements.
 * @param {string} dataAttribute - The data attribute name to use in the redirect URL.
 * @param {string} baseUrl - The base URL to redirect to.
 */
// TODO kanske värt att lära sig och nyttja?

const setupClickableElements = (containerSelector: string, clickableSelector: string, dataAttribute: string, baseUrl: string): void => {
    const container = document.querySelector(containerSelector);
    if (!container) return; // Exit if container is not found

    container.addEventListener('click', event => {
        const target = (event.target as HTMLElement).closest(clickableSelector);
        if (!target) return; // Exit if the click is not on a target element

        const idValue = target.getAttribute(dataAttribute);
        if (idValue) {
            window.location.href = `${baseUrl}?id=${idValue}`;
        }
    });
};

export { setupClickableElements };
